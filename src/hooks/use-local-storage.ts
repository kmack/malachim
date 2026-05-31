/**
 * @fileoverview Generic typed localStorage state with lazy init and defensive
 * parsing. Persists on every change.
 */

import { useCallback, useEffect, useState } from 'react';

import { loadJson, saveJson } from '../utils/storage';

export function useLocalStorage<T>(
  key: string,
  initial: T | (() => T)
): readonly [T, (next: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const fallback =
      typeof initial === 'function' ? (initial as () => T)() : initial;
    return loadJson<T>(key, fallback);
  });

  useEffect(() => {
    saveJson(key, value);
  }, [key, value]);

  const set = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) =>
      typeof next === 'function' ? (next as (p: T) => T)(prev) : next
    );
  }, []);

  return [value, set] as const;
}
