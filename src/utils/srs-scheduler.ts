/**
 * @fileoverview Pure Leitner spaced-repetition logic. `now` is always injected
 * so these functions are deterministic and easy to verify by hand.
 */

import { APP_CONFIG } from '../config/app-config';
import type { LetterCard } from '../types/card';
import type { CardProgress, Grade, SrsState } from '../types/srs';

export function defaultProgress(): CardProgress {
  return { box: 1, due: 0, lastReviewed: 0, reps: 0, lapses: 0 };
}

function intervalForBox(box: number): number {
  const { boxIntervalsMs } = APP_CONFIG.srs;
  const idx = Math.min(Math.max(box, 1), boxIntervalsMs.length) - 1;
  return boxIntervalsMs[idx];
}

export function gradeCard(
  progress: CardProgress,
  grade: Grade,
  now: number
): CardProgress {
  const { maxBox, hardIntervalMs } = APP_CONFIG.srs;
  const prev = progress.box;
  let box = prev;
  let lapses = progress.lapses;
  let due = now;

  switch (grade) {
    case 'again':
      box = 1;
      if (prev > 1) lapses += 1;
      due = now + intervalForBox(1);
      break;
    case 'hard':
      box = prev;
      due = now + hardIntervalMs;
      break;
    case 'good':
      box = Math.min(prev + 1, maxBox);
      due = now + intervalForBox(box);
      break;
    case 'easy':
      box = Math.min(prev + 2, maxBox);
      due = now + intervalForBox(box);
      break;
  }

  return {
    box,
    due,
    lastReviewed: now,
    reps: progress.reps + 1,
    lapses,
  };
}

export function isDue(progress: CardProgress, now: number): boolean {
  return progress.due <= now;
}

export function getProgress(state: SrsState, cardId: string): CardProgress {
  return state.progress[cardId] ?? defaultProgress();
}

export function buildQueue(
  cards: readonly LetterCard[],
  state: SrsState,
  now: number
): LetterCard[] {
  return cards
    .filter((card) => isDue(getProgress(state, card.id), now))
    .slice()
    .sort((a, b) => {
      const da = getProgress(state, a.id).due;
      const db = getProgress(state, b.id).due;
      if (da !== db) return da - db;
      return a.order - b.order;
    });
}

export function nextDueAt(
  cards: readonly LetterCard[],
  state: SrsState
): number | null {
  let min: number | null = null;
  for (const card of cards) {
    const { due } = getProgress(state, card.id);
    if (min === null || due < min) min = due;
  }
  return min;
}
