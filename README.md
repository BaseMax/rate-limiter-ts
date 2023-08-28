# RateLimit-ts - Rate Limiting Library for TypeScript and JavaScript

RateLimit-ts is a versatile TypeScript and JavaScript library designed to provide rate limiting capabilities for various web frameworks, including Nest, Express, and other frameworks within the JavaScript ecosystem. This library is built to offer flexibility in rate limiting strategies, supporting token bucket and IP-based methods, making it suitable for a wide range of use cases.

## Features

- **Flexible Integration:** RateLimit-ts can be seamlessly integrated into different web frameworks, including Nest, Express, and other JavaScript frameworks, allowing you to implement rate limiting in various projects.
- **Multiple Rate Limiting Strategies:** This library supports both token bucket and IP-based rate limiting strategies, enabling you to choose the approach that best fits your requirements.
- **Built with TypeScript: RateLimit-ts is developed using TypeScript, providing strong typing and enhancing code readability.

## Installation

You can install the RateLimit-ts library using npm or yarn:

```bash
npm install ratelimit-ts
```

or

```bash
yarn add ratelimit-ts
```

## Getting Started

To get started with RateLimit-ts, follow these steps:

### Import the Library:

Import the RateLimit class from the library into your project:

```typescript
import { RateLimit } from 'ratelimit-ts';
```

### Configure Rate Limiting:

Create a new instance of the RateLimit class and configure it according to your needs. You can set the rate limit strategy (token bucket or IP-based), specify the limits, and provide any optional configuration options:

```typescript
// Create a RateLimit instance
const rateLimiter = new RateLimit({
    strategy: 'tokenBucket', // or 'ipBased'
    // Other configuration options...
});
```

### Apply Rate Limiting Middleware:

Integrate the rate limiting middleware into your web framework. Here's an example of how to use it with Express:

```typescript
import express from 'express';

const app = express();

// Apply rate limiting middleware
app.use(rateLimiter.middleware());

// Your routes and other middleware...

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
```

### Configuration Options

When creating a RateLimit instance, you can provide various configuration options to customize the rate limiting behavior. Some of the available options include:

- `strategy`: The rate limiting strategy to use, either 'tokenBucket' or 'ipBased'.
- `limits`: An object specifying the rate limits for different routes or endpoints.
- `keyGenerator`: A function to generate custom keys for IP-based rate limiting.
- `onLimitReached`: A callback function triggered when a limit is reached.
- `store`: The storage mechanism for rate limiting data.

Refer to the documentation for a comprehensive list of configuration options and their descriptions.

## Examples

For more detailed usage examples and integration with different web frameworks like Nest and Express, check out the examples directory in the repository.

## Contributing

Contributions to RateLimit-ts are welcome! If you find any issues or want to enhance the library, please create an issue or submit a pull request on the GitHub repository.

## License

RateLimit-TS is released under the GPL-3.0 License.

Copyright 2023, Max Base
