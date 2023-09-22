import { TokenBucket } from 'rate-limiter-ts';
import express from 'express';

const app = express();

const limiter = new TokenBucket({
  capacity: 10,
  refillRate: 'minute',
  storage: {
    strategy: 'local'
  }
});

app.use((req, res, next) => {
  limiter.middleware(req, res, next);
});

app.get('/', (req, res) => {
  res.send('hello ');
});

app.listen(3000, () => {
  console.log('Server Running on port: 3000');
});
