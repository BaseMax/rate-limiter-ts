import { StorageStrategy } from '../storage.interface';

export class LocalStorageStrategy implements StorageStrategy {
  private storage: Map<string, number>;

  constructor() {
    this.storage = new Map<string, number>();
  }

  async get(ip: string): Promise<string | number | null | undefined> {
    return this.storage.get(ip);
  }

  set(ip: string, capacity: number): void {
    this.storage.set(ip, capacity);
  }

  async has(ip: string): Promise<boolean> {
    return this.storage.has(ip);
  }
}
