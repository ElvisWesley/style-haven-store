const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(cors());
app.use(express.json());

// Middleware to verify JWT and admin status
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.id]);

    if (!user.rows[0] || !user.rows[0].is_admin) {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    req.user = user.rows[0];
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Authentication Routes
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (email, password, name, is_admin) VALUES ($1, $2, $3, false) RETURNING id, email, name, is_admin",
      [email, hashedPassword, name]
    );

    const token = jwt.sign(
      { id: newUser.rows[0].id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({ user: newUser.rows[0], token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.rows[0].id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    const { password: _, ...userWithoutPassword } = user.rows[0];
    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Stripe Checkout Route
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cart`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: "Error creating checkout session" });
  }
});

// Admin Routes
app.post("/api/products", verifyAdmin, async (req, res) => {
  try {
    const { name, price, description, category, images, video_url, specifications } = req.body;
    const newProduct = await pool.query(
      "INSERT INTO products (name, price, description, category, images, video_url, specifications) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, price, description, category, images, video_url, specifications]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

app.put("/api/products/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, images, video_url, specifications } = req.body;
    const updatedProduct = await pool.query(
      "UPDATE products SET name = $1, price = $2, description = $3, category = $4, images = $5, video_url = $6, specifications = $7 WHERE id = $8 RETURNING *",
      [name, price, description, category, images, video_url, specifications, id]
    );
    res.json(updatedProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/api/products/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Regular Routes
app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM products");
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

app.get("/api/products/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const products = await pool.query(
      "SELECT * FROM products WHERE category = $1",
      [category]
    );
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    res.json(product.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM categories");
    res.json(allCategories.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
