export interface RateLimiterStrategy {
  refillToken(ip: string): Promise<void>;
  consumeToken(ip: string): Promise<boolean>;
}
