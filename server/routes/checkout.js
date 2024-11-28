const express = require("express");
const router = express.Router();
const { Client } = require("@vippsmobilepay/sdk");

// Initialize Vipps client
const client = new Client({
  clientId: process.env.VIPPS_CLIENT_ID,
  clientSecret: process.env.VIPPS_CLIENT_SECRET,
  merchantSerialNumber: process.env.VIPPS_MSN,
  subscriptionKey: process.env.VIPPS_SUBSCRIPTION_KEY,
  systemName: "Interior Haven",
  systemVersion: "1.0.0",
  pluginName: "vipps-ecom",
  pluginVersion: "1.0.0",
});

router.post("/create-session", async (req, res) => {
  try {
    const { items } = req.body;
    
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity * 100, // Convert to lowest monetary unit (øre)
      0
    );

    const session = await client.checkout.initiateSession({
      merchantInfo: {
        callbackPrefix: process.env.SERVER_URL || "http://localhost:5000",
        returnUrl: `${process.env.CLIENT_URL || "http://localhost:5173"}/success`,
        merchantSerialNumber: process.env.VIPPS_MSN,
      },
      transaction: {
        amount: {
          currency: "NOK",
          value: totalAmount,
        },
        paymentDescription: "Interior Haven Purchase",
        reference: Date.now().toString(),
      },
      scope: "address name email",
    });

    res.json({ 
      sessionId: session.sessionId,
      url: session.checkoutFrontendUrl 
    });
  } catch (error) {
    console.error('Error creating Vipps checkout session:', error);
    res.status(500).json({ message: "Error creating checkout session" });
  }
});

module.exports = router;