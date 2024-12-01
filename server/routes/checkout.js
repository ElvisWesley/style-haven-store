import express from 'express';
import { Client } from "@vippsmobilepay/sdk";
const router = express.Router();

// Initialize Vipps client
const client = new Client({
  merchantSerialNumber: process.env.VIPPS_MSN,
  subscriptionKey: process.env.VIPPS_SUBSCRIPTION_KEY,
  systemName: "Interior Haven",
  systemVersion: "1.0.0",
  useTestMode: true, // Set to false in production
  retryRequests: true,
});

router.post("/create-session", async (req, res) => {
  try {
    const { items } = req.body;
    
    // Calculate total in lowest monetary unit (øre)
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity * 100,
      0
    );

    // Get access token
    const accessToken = await client.auth.getToken(
      process.env.VIPPS_CLIENT_ID,
      process.env.VIPPS_CLIENT_SECRET
    );

    if (!accessToken.ok) {
      throw new Error("Failed to get Vipps access token");
    }

    // Create checkout session
    const checkoutSession = await client.checkout.create(
      process.env.VIPPS_CLIENT_ID,
      process.env.VIPPS_CLIENT_SECRET,
      {
        type: "PAYMENT",
        merchantInfo: {
          callbackUrl: `${process.env.SERVER_URL || "http://localhost:5000"}/api/checkout/callback`,
          returnUrl: `${process.env.CLIENT_URL || "http://localhost:5173"}/success`,
          callbackAuthorizationToken: process.env.VIPPS_CALLBACK_TOKEN,
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

    if (!checkoutSession.ok) {
      throw new Error("Failed to create Vipps checkout session");
    }

    res.json({ 
      sessionId: checkoutSession.data.reference,
      url: checkoutSession.data.redirectUrl 
    });
  } catch (error) {
    console.error('Error creating Vipps checkout session:', error);
    res.status(500).json({ 
      message: "Error creating checkout session",
      error: error.message 
    });
  }
});

// Callback endpoint for Vipps to notify about payment status
router.post("/callback", async (req, res) => {
  try {
    const { reference, status } = req.body;
    
    // Here you would typically:
    // 1. Verify the callback authorization token
    // 2. Update order status in your database
    // 3. Send confirmation email to customer
    
    console.log(`Payment ${reference} status updated to: ${status}`);
    
    res.status(200).send();
  } catch (error) {
    console.error('Error processing Vipps callback:', error);
    res.status(500).send();
  }
});

export default router;