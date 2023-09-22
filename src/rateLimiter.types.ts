import { StorageOptions } from './Storage/types/storage-options.types';

export type RateLimiterConfigOptions = {
  capacity: number;
  refillRate: Interval;
  message?: string;
  storage: StorageOptions;
};

export type Interval =
  | number
  | 'second'
  | 'sec'
  | 'minute'
  | 'min'
  | 'hour'
  | 'hr'
  | 'day';

export type Strategy = 'tokenBucket' | 'leakBucket';
