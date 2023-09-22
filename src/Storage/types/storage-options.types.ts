export type Storages = 'redis' | 'local';

export type StorageOptions = {
  strategy: Storages;
  redisOptions?: RedisOptions;
};

export type RedisOptions = {
  host?: string;
  port?: number;
  expireTime?: number;
};
