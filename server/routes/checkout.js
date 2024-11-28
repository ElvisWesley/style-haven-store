const express = require("express");
const router = express.Router();
const { Client } = require("@vippsmobilepay/sdk");

// Initialize Vipps client
const client = new Client({
  merchantSerialNumber: process.env.VIPPS_MSN,
  subscriptionKey: process.env.VIPPS_SUBSCRIPTION_KEY,
  useTestMode: true, // Set to false in production
  retryRequests: true,
});

router.post("/create-session", async (req, res) => {
  try {
    const { items } = req.body;
    
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity * 100, // Convert to lowest monetary unit (øre)
      0
    );

    // Get access token first
    const accessToken = await client.auth.getToken(
      process.env.VIPPS_CLIENT_ID,
      process.env.VIPPS_CLIENT_SECRET
    );

    // Create checkout session
    const checkout = await client.checkout.create(
      process.env.VIPPS_CLIENT_ID,
      process.env.VIPPS_CLIENT_SECRET,
      {
        merchantInfo: {
          callbackUrl: `${process.env.SERVER_URL || "http://localhost:5000"}/api/checkout/callback`,
          returnUrl: `${process.env.CLIENT_URL || "http://localhost:5173"}/success`,
        },
        transaction: {
          amount: {
            currency: "NOK",
            value: totalAmount,
          },
          paymentDescription: "Interior Haven Purchase",
        },
      }
    );

    res.json({ 
      sessionId: checkout.sessionId,
      url: checkout.url 
    });
  } catch (error) {
    console.error('Error creating Vipps checkout session:', error);
    res.status(500).json({ message: "Error creating checkout session" });
  }
});

module.exports = router;