import { Storage } from './Storage/Storage';
import { StorageStrategy } from './Storage/storage.interface';
import { StorageOptions } from './Storage/types/storage-options.types';

export class TokenBucketStrategy {
  private storage: StorageStrategy;
  private capacity: number;
  private refillRate: number;
  private lastRefillTime: number;

  constructor(capacity: number, refillRate: number, storage: StorageOptions) {
    this.storage = new Storage(storage, refillRate);
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.lastRefillTime = Date.now();
  }

  async refillToken(ip: string): Promise<void> {
    const now = Date.now();

    const elapsedTime = now - this.lastRefillTime;

    const tokensToAdd = (elapsedTime / this.refillRate) * 10;

    const ipExists = await this.storage.has(ip);

    let newTokens: number;

    if (ipExists) {
      const currentTokens = (await this.storage.get(ip)) || 0;

      newTokens = Math.min(
        +currentTokens + Math.floor(tokensToAdd),
        this.capacity
      );
    } else {
      newTokens = +this.capacity;
    }

    if (newTokens == this.capacity) {
      this.storage.set(ip, newTokens);
      this.lastRefillTime = now;
    }
  }

  async consumeToken(ip: string): Promise<boolean> {
    const ipExists = await this.storage.has(ip);

    let currentTokens: number;

    if (ipExists) {
      currentTokens = (await this.storage.get(ip)) as number;
    } else {
      currentTokens = this.capacity;
    }

    currentTokens = +currentTokens;

    if (currentTokens > 0) {
      this.storage.set(ip, currentTokens - 1);
      return true;
    } else {
      return false;
    }
  }
}
