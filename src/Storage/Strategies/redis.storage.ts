import { StorageStrategy } from '../storage.interface';
import { Redis } from 'ioredis';
import { RedisOptions } from '../types/storage-options.types';

export class RedisStorageStrategy implements StorageStrategy {
  private storage: Redis;
  private expireTime: number;

  constructor(redisOptions?: RedisOptions, expireTime?: number) {
    this.expireTime = expireTime || 0;
    this.storage = new Redis({
      host: redisOptions?.host || '127.0.0.1',
      port: redisOptions?.port || 6379
    });
  }

  async get(ip: string): Promise<string | number | null | undefined> {
    return this.storage.get(ip);
  }

  async set(ip: string, capacity: number): Promise<void> {
    const ipExists = await this.has(ip);
    if (ipExists) {
      await this.storage.set(ip, capacity, 'KEEPTTL');
    } else {
      await this.storage.set(ip, capacity, 'PX', this.expireTime);
    }
  }

  async has(ip: string): Promise<boolean> {
    const result = await this.storage.exists(ip);
    if (result === 1) {
      return true;
    } else {
      return false;
    }
  }
}
