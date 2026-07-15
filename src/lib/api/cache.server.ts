/**
 * Server-side in-memory caching system
 * Useful for caching database queries that don't change very often,
 * but that might be requested simultaneously by many users.
 */

type CacheEntry<T> = {
  data: T;
  expires: number;
};

const _global = globalThis as any;
if (!_global.__server_cache) {
  _global.__server_cache = new Map<string, CacheEntry<any>>();
}
const cache = _global.__server_cache;

export function getCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  // Check if expired
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

export function setCache<T>(key: string, data: T, ttlSeconds: number = 60) {
  cache.set(key, {
    data,
    expires: Date.now() + ttlSeconds * 1000
  });
}

export function clearCache(key: string) {
  cache.delete(key);
}

export function clearCacheByPrefix(prefix: string) {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
}
