/**
 * @fileoverview Central, immutable application configuration.
 */

export const STORAGE_KEYS = {
  /** JSON-encoded DeckPrefs (direction + mode). */
  prefs: 'malachim.prefs.v1',
  /** Raw 'light' | 'dark' string (read by the pre-paint script in index.html). */
  theme: 'malachim.theme.v1',
} as const;

export const APP_CONFIG = {
  /** Number of letters in the deck. */
  deckSize: 22,
  gestures: {
    swipeThresholdPx: 50,
  },
  animation: {
    flipDurationMs: 500,
  },
} as const;
