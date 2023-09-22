import express from 'express';
import request from 'supertest';
import { TokenBucket } from '../../src';

const app = express();
const rateLimiter = new TokenBucket({
  capacity: 10,
  refillRate: 'second',
  storage: {
    strategy: 'local'
  },
  message: 'Too Many Requests'
});

app.use((req, res, next) => {
  rateLimiter.middleware(req, res, next);
});

app.get('/protected', (req, res) => {
  res.status(200).json({ message: 'Access granted' });
});

describe('Rate Limiter E2E Tests', () => {
  it('should allow access to the endpoint within the rate limit', async () => {
    const response = await request(app).get('/protected');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Access granted');
  });

  it('should return 429 status when rate limit is exceeded', async () => {
    for (let i = 0; i < 15; i++) {
      await request(app).get('/protected');
    }

    const response = await request(app).get('/protected');

    expect(response.status).toBe(429);
    expect(response.body.message).toBe('Too Many Requests');
  });
});
