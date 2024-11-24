const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyAdmin } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM products");
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/category/:category", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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

router.post("/", verifyAdmin, async (req, res) => {
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

router.put("/:id", verifyAdmin, async (req, res) => {
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

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;