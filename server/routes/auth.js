const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // Already using bcryptjs instead of bcrypt
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { verifyAdmin } = require("../middleware/auth");

router.post("/signup", async (req, res) => {
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

router.post("/signin", async (req, res) => {
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

module.exports = router;