const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const checkoutRoutes = require("./routes/checkout");

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/checkout", checkoutRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});