// storage.ts
import { LocalStorageStrategy } from './Strategies/local-storage.strategy';
import { RedisStorageStrategy } from './Strategies/redis.storage';
import { StorageStrategy } from './storage.interface';
import { StorageOptions } from './types/storage-options.types';

export class Storage {
  private storageStrategy: StorageStrategy;

  constructor({ strategy, redisOptions }: StorageOptions, expireTime: number) {
    if (strategy === 'redis') {
      this.storageStrategy = new RedisStorageStrategy(redisOptions, expireTime);
    } else {
      this.storageStrategy = new LocalStorageStrategy();
    }
  }

  get(ip: string): Promise<string | number | null | undefined> {
    return this.storageStrategy.get(ip);
  }

  set(ip: string, capacity: number): void {
    this.storageStrategy.set(ip, capacity);
  }

  has(ip: string): Promise<boolean> {
    return this.storageStrategy.has(ip);
  }
}
