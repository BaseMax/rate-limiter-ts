import { RateLimiter } from './RateLimiter';
import { TokenBucketStrategy } from './TokenBucketStrategy';
import { RateLimiterConfigOptions } from './type';

export class TokenBucket extends RateLimiter {
  constructor({
    capacity,
    refillRate,
    message,
    storage
  }: RateLimiterConfigOptions) {
    super();

    this.message = message ? message : 'Too Many Requests';
    if (typeof refillRate === 'string') {
      switch (refillRate) {
        case 'sec':
        case 'second':
          refillRate = 1000;
          break;
        case 'min':
        case 'minute':
          refillRate = 60 * 1000;
          break;
        case 'hr':
        case 'hour':
          refillRate = 60 * 60 * 1000;
          break;
        case 'day':
          refillRate = 24 * 60 * 60 * 1000;
          break;
        default:
          throw new Error('Invalid refillRate: ' + refillRate);
      }

      this.strategy = new TokenBucketStrategy(capacity, +refillRate, storage);
    }
  }
}
