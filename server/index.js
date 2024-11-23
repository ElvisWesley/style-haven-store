const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM products");
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get products by category
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

// Get single product
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

// Get all categories
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