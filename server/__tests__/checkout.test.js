import request from 'supertest';
import express from 'express';
import checkoutRoutes from '../routes/checkout.js';

const app = express();
app.use(express.json());
app.use('/api/checkout', checkoutRoutes);

describe('Checkout API', () => {
  it('should create a Vipps checkout session', async () => {
    const response = await request(app)
      .post('/api/checkout/create-session')
      .send({
        items: [
          { id: 1, name: 'Test Product', price: 100, quantity: 1 }
        ],
        paymentMethod: 'vipps'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('sessionId');
    expect(response.body).toHaveProperty('url');
  });

  it('should create a Klarna checkout session', async () => {
    const response = await request(app)
      .post('/api/checkout/create-session')
      .send({
        items: [
          { id: 1, name: 'Test Product', price: 100, quantity: 1 }
        ],
        paymentMethod: 'klarna'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('sessionId');
    expect(response.body).toHaveProperty('clientToken');
  });

  it('should handle invalid items array', async () => {
    const response = await request(app)
      .post('/api/checkout/create-session')
      .send({
        items: 'invalid',
        paymentMethod: 'vipps'
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error creating checkout session');
  });
});