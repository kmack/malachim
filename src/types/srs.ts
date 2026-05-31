/**
 * @fileoverview Spaced-repetition (Leitner) types and persisted state shape.
 */

import type { StudyDirection } from './card';

export type Grade = 'again' | 'hard' | 'good' | 'easy';

export interface CardProgress {
  /** Leitner box 1..5. */
  box: number;
  /** Epoch ms when the card is next due. */
  due: number;
  /** Epoch ms of the last review (0 if never). */
  lastReviewed: number;
  /** Total reviews. */
  reps: number;
  /** Number of times the card dropped back to box 1. */
  lapses: number;
}

export interface SrsState {
  version: 1;
  direction: StudyDirection;
  /** Keyed by LetterCard.id. Cards never seen are absent and default at runtime. */
  progress: Record<string, CardProgress>;
}

/** Ephemeral session mode held only in the deck hook (never persisted). */
export type SessionMode = 'review' | 'cram';
