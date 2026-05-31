/**
 * @fileoverview Central, immutable application configuration.
 */

export const STORAGE_KEYS = {
  /** JSON-encoded SrsState. */
  srs: 'malachim.srs.v1',
  /** Raw 'light' | 'dark' string (read by the pre-paint script in index.html). */
  theme: 'malachim.theme.v1',
} as const;

export const APP_CONFIG = {
  /** Number of letters in the deck. */
  deckSize: 22,
  srs: {
    maxBox: 5,
    /**
     * Milliseconds until next due, indexed by (box - 1). Box 1 = relearn within
     * the current session (~10 min); later boxes space out.
     */
    boxIntervalsMs: [
      10 * 60 * 1000, // box 1: ~10 minutes
      24 * 60 * 60 * 1000, // box 2: 1 day
      3 * 24 * 60 * 60 * 1000, // box 3: 3 days
      7 * 24 * 60 * 60 * 1000, // box 4: 7 days
      16 * 24 * 60 * 60 * 1000, // box 5: 16 days
    ],
    /** Re-show interval when graded "hard" (stays in the same box). */
    hardIntervalMs: 5 * 60 * 1000,
  },
  gestures: {
    swipeThresholdPx: 50,
  },
  animation: {
    flipDurationMs: 500,
  },
} as const;
