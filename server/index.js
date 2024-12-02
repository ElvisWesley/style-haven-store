import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import checkoutRoutes from './routes/checkout.js';

const app = express();
config();

// middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/checkout", checkoutRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Client URL: ${process.env.CLIENT_URL}`);
  console.log(`Server URL: ${process.env.SERVER_URL}`);
});