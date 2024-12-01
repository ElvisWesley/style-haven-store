import express from 'express';
import { Client } from "@vippsmobilepay/sdk";
import fetch from 'node-fetch';
const router = express.Router();

console.log('Initializing Vipps client with:', {
  msn: process.env.VIPPS_MSN,
  subKey: process.env.VIPPS_SUBSCRIPTION_KEY?.substring(0, 5) + '...',
  serverUrl: process.env.SERVER_URL,
  clientUrl: process.env.CLIENT_URL
});

// Initialize Vipps client
const client = new Client({
  merchantSerialNumber: process.env.VIPPS_MSN,
  subscriptionKey: process.env.VIPPS_SUBSCRIPTION_KEY,
  systemName: "Interior Haven",
  systemVersion: "1.0.0",
  useTestMode: true,
  retryRequests: true,
});

const createKlarnaSession = async (items, totalAmount) => {
  const response = await fetch('https://api.playground.klarna.com/payments/v1/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.KLARNA_USERNAME + ':' + process.env.KLARNA_PASSWORD).toString('base64')}`,
    },
    body: JSON.stringify({
      purchase_country: "NO",
      purchase_currency: "NOK",
      locale: "nb-NO",
      order_amount: totalAmount,
      order_lines: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unit_price: item.price * 100, // Convert to minor units (øre)
        total_amount: item.price * item.quantity * 100,
      })),
      merchant_urls: {
        terms: `${process.env.CLIENT_URL}/terms`,
        checkout: `${process.env.CLIENT_URL}/checkout`,
        confirmation: `${process.env.CLIENT_URL}/confirmation`,
        push: `${process.env.SERVER_URL}/api/checkout/klarna-push`,
      }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create Klarna session');
  }

  return response.json();
};

router.post("/create-session", async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;
    
    if (!items || !Array.isArray(items)) {
      throw new Error("Invalid items array");
    }

    console.log('Creating checkout session with items:', items, 'payment method:', paymentMethod);
    
    // Calculate total in lowest monetary unit (øre)
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity * 100,
      0
    );

    if (paymentMethod === 'klarna') {
      const klarnaSession = await createKlarnaSession(items, totalAmount);
      res.json({
        sessionId: klarnaSession.session_id,
        clientToken: klarnaSession.client_token
      });
    } else {
      // Default to Vipps
      const checkoutConfig = {
        type: "PAYMENT",
        merchantInfo: {
          callbackUrl: `${process.env.SERVER_URL}/api/checkout/callback`,
          returnUrl: `${process.env.CLIENT_URL}/success`,
          callbackAuthorizationToken: process.env.VIPPS_CALLBACK_TOKEN,
        },
        transaction: {
          amount: {
            currency: "NOK",
            value: totalAmount,
          },
          paymentDescription: "Interior Haven Purchase",
        },
      };

      console.log('Checkout configuration:', checkoutConfig);

      const checkoutSession = await client.checkout.create(
        process.env.VIPPS_CLIENT_ID,
        process.env.VIPPS_CLIENT_SECRET,
        checkoutConfig
      );

      console.log('Checkout session response:', {
        ok: checkoutSession.ok,
        reference: checkoutSession.data?.reference,
        hasRedirectUrl: !!checkoutSession.data?.redirectUrl
      });

      if (!checkoutSession.ok) {
        throw new Error("Failed to create Vipps checkout session");
      }

      res.json({ 
        sessionId: checkoutSession.data.reference,
        url: checkoutSession.data.redirectUrl 
      });
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      message: "Error creating checkout session",
      error: error.message 
    });
  }
});

router.post("/callback", async (req, res) => {
  try {
    console.log('Received callback:', req.body);
    const { reference, status } = req.body;
    console.log(`Payment ${reference} status updated to: ${status}`);
    res.status(200).send();
  } catch (error) {
    console.error('Error processing callback:', error);
    res.status(500).send();
  }
});

router.post("/klarna-push", async (req, res) => {
  try {
    console.log('Received Klarna push notification:', req.body);
    res.status(200).send();
  } catch (error) {
    console.error('Error processing Klarna push:', error);
    res.status(500).send();
  }
});

export default router;