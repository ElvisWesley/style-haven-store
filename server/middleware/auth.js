const jwt = require("jsonwebtoken");
const pool = require("../db");

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

module.exports = { verifyAdmin };