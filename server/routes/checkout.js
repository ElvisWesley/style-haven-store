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

    // Create checkout session
    const session = await client.checkout.initiate({
      merchantInfo: {
        callbackPrefix: `${process.env.SERVER_URL || "http://localhost:5000"}/api/checkout/callback`,
        returnUrl: `${process.env.CLIENT_URL || "http://localhost:5173"}/success`,
        merchantSerialNumber: process.env.VIPPS_MSN,
      },
      transaction: {
        amount: {
          currency: "NOK",
          value: totalAmount,
        },
        paymentDescription: "Interior Haven Purchase",
      },
    });

    if (!session.redirectUrl) {
      throw new Error("No checkout URL received from Vipps");
    }

    res.json({ 
      sessionId: session.reference,
      url: session.redirectUrl 
    });
  } catch (error) {
    console.error('Error creating Vipps checkout session:', error);
    res.status(500).json({ 
      message: "Error creating checkout session",
      error: error.message 
    });
  }
});

module.exports = router;