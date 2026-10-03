import { useEffect, useState } from 'react';
export function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      if (saved === null) return fallback;
      if (Array.isArray(fallback) && !Array.isArray(saved)) return fallback;
      if (
        typeof fallback === 'object' &&
        !Array.isArray(fallback) &&
        (typeof saved !== 'object' || Array.isArray(saved))
      )
        return fallback;
      return saved;
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Storage can be unavailable in private browsing. */
    }
  }, [key, value]);
  return [value, setValue];
}
