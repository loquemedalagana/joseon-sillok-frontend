// utils/cache.js
import { LRUCache } from 'lru-cache';

// Initialize the cache with a max size and time-to-live (TTL)
const cache = new LRUCache({
  max: 100, // Maximum number of items in the cache
  ttl: 1000 * 60 * 60, // Time to live: 1 hour (in milliseconds)
});

// Function to get a cached kingTitle
export function getCachedKingTitle(kingId: string) {
  return cache.get(kingId);
}

// Function to set a kingTitle in the cache
export function setCachedKingTitle(kingId: string, kingTitle: string | null) {
  cache.set(kingId, kingTitle ?? undefined);
}

// TODO: get year

// TODO: get month