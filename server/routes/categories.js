import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM categories");
    res.json(allCategories.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

export default router;