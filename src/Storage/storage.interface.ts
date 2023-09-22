export interface StorageStrategy {
  get(ip: string): Promise<string | number | null | undefined>;
  set(ip: string, capacity: number): void;
  has(ip: string): Promise<boolean>;
}
