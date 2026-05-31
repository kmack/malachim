/**
 * @fileoverview Light/dark theme state. The value is stored as a raw string
 * (not JSON) so the pre-paint script in index.html can read it directly and
 * avoid a flash of the wrong theme. Applies [data-theme] to <html>.
 */

import { useCallback, useEffect, useState } from 'react';

import { STORAGE_KEYS } from '../config/app-config';

export type Theme = 'light' | 'dark';

function readInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.theme);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // ignore
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
}

export function useTheme(): {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
} {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggle = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    []
  );

  return { theme, toggle, setTheme };
}
