# rate-limiter-ts | Rate Limiting Library for TypeScript and JavaScript

This npm package provides a rate limiter middleware for Express applications. It helps prevent abuse of your API by limiting the number of requests that can be made from a specific IP address within a given time frame.

## Features

- **Flexible Integration:** rate-limiter-ts can be seamlessly integrated into different web frameworks, including Nest, Express, and other JavaScript frameworks, allowing you to implement rate limiting in various projects.
- **Storage Strategies:**

  - Local Storage: The default storage strategy that uses in-memory storage. It's suitable for single-server setups.

  - Redis Storage: Use Redis as a distributed storage solution for multi-server environments. Configure Redis options to enable this strategy.

- **Built with TypeScript:** rate-limit-ts is developed using TypeScript, providing strong typing and enhancing code readability.

## Installation

You can install the npm i rate-limiter-ts library using npm:

```bash
npm i rate-limiter-ts
```

### Use Rate Limiting:

Create a new instance of the RateLimit class and configure it according to your needs. specify the limits, and provide any optional configuration options:

```typescript
import express from 'express';
import { TokenBucket } from 'rate-limiter-ts';

const app = express();

// Create a TokenBucket rate limiter with a specific configuration
const rateLimiter = new TokenBucket({
  capacity: 100, // Maximum number of requests allowed
  refillRate: 'minute', // Refill rate, can be 'sec', 'min', 'hr', or 'day'
  message: 'Custom Message', // Optional message to send when rate limit is exceeded
  storage: {
    strategy: 'redis',
    redisOptions: {
      host: 'custom-host', // Redis host
      port: 12345 // Redis port
    }
  }
});

// Apply the rate limiter middleware to all routes
app.use((req, res, next) => {
  rateLimiter.middleware(req, res, next);
});

const specificLimiter = new TokenBucket({
  capacity: 100,
  refillRate: 'minute',
  storage: {
    strategy: 'local'
  }
});

const specificLimiterMiddleware = (req, res, next) => {
  specificLimiter.middleware(req, res, next);
};

// Apply the rate limiter middleware to specific routes
app.use('/api/some-route', limiterMiddleware);

// Your Express route handlers here
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Configuration Options

When creating a RateLimit instance, you can provide various configuration options to customize the rate limiting behavior. Some of the available options include:

- `capacity`: The maximum number of requests allowed within the specified time frame.
- `refillRate`: The rate at which the tokens (requests) are refilled, specified in milliseconds by default. You can also use one of 'sec', 'min', 'hr', or 'day'.
- `message`: Optional. The message to be sent in the response when the rate limit is exceeded. The default message is 'Too Many Requests'.
- `storage`: Configuration for the storage strategy. You can choose between 'redis' or 'local' storage. If using 'redis', you can provide redisOptions for custom Redis configuration.

note: The default Redis host is "localhost" and port is 6379.

Refer to the documentation for a comprehensive list of configuration options and their descriptions.

## Examples

For more detailed usage examples and integration with different web frameworks like Nest and Express, check out the examples directory in the repository.

## Contributing

Contributions to RateLimit-ts are welcome! If you find any issues or want to enhance the library, please create an issue or submit a pull request on the GitHub repository.

## License

RateLimit-TS is released under the GPL-3.0 License.

Copyright 2023, Max Base
