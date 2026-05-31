/**
 * @fileoverview The single source of truth for the study session: the due/cram
 * queue, the current card, grading, navigation, and persistence. Spaced
 * repetition (Leitner) lives in utils/srs-scheduler; this hook orchestrates it.
 */

import { useCallback, useMemo, useState } from 'react';

import { STORAGE_KEYS } from '../config/app-config';
import type { LetterCard, StudyDirection } from '../types/card';
import type { Grade, SessionMode, SrsState } from '../types/srs';
import { shuffle } from '../utils/shuffle';
import {
  buildQueue,
  getProgress,
  gradeCard,
  nextDueAt,
} from '../utils/srs-scheduler';
import { useLocalStorage } from './use-local-storage';

const INITIAL_STATE: SrsState = {
  version: 1,
  direction: 'glyph-to-name',
  progress: {},
};

export interface DeckApi {
  current: LetterCard | null;
  direction: StudyDirection;
  mode: SessionMode;
  isFlipped: boolean;
  /** 1-based position of the current card within the session. */
  position: number;
  /** Number of cards in the session queue. */
  total: number;
  /** Cards graded so far this session. */
  reviewedCount: number;
  /** Cards left to study in the session (including the current one). */
  remaining: number;
  /** Epoch ms of the soonest due card across the whole deck. */
  nextDue: number | null;
  flip: () => void;
  grade: (grade: Grade) => void;
  next: () => void;
  prev: () => void;
  shuffleDeck: () => void;
  toggleDirection: () => void;
  startCram: () => void;
  exitCram: () => void;
  reset: () => void;
}

export function useSrsDeck(cards: readonly LetterCard[]): DeckApi {
  const [state, setState] = useLocalStorage<SrsState>(
    STORAGE_KEYS.srs,
    INITIAL_STATE
  );
  const [mode, setMode] = useState<SessionMode>('review');
  const [queue, setQueue] = useState<LetterCard[]>(() =>
    buildQueue(cards, state, Date.now())
  );
  const [pos, setPos] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const current = pos >= 0 && pos < queue.length ? queue[pos] : null;

  const flip = useCallback(() => setIsFlipped((f) => !f), []);

  const grade = useCallback(
    (g: Grade) => {
      if (mode !== 'review') return;
      const card = queue[pos];
      if (!card) return;
      const now = Date.now();
      setState((prev) => ({
        ...prev,
        progress: {
          ...prev.progress,
          [card.id]: gradeCard(getProgress(prev, card.id), g, now),
        },
      }));
      setReviewedCount((c) => c + 1);
      setIsFlipped(false);
      if (g === 'again') {
        // Re-show this card later in the same session.
        setQueue((q) => {
          const next = q.slice();
          const moved = next.splice(pos, 1)[0];
          next.push(moved);
          return next;
        });
        // pos stays: the next card slides into this index.
      } else {
        setPos((p) => p + 1);
      }
    },
    [mode, pos, queue, setState]
  );

  const next = useCallback(() => {
    setIsFlipped(false);
    setPos((p) => {
      if (mode === 'cram') return queue.length ? (p + 1) % queue.length : 0;
      return Math.min(p + 1, queue.length);
    });
  }, [mode, queue.length]);

  const prev = useCallback(() => {
    setIsFlipped(false);
    setPos((p) => {
      if (mode === 'cram') {
        return queue.length ? (p - 1 + queue.length) % queue.length : 0;
      }
      return Math.max(p - 1, 0);
    });
  }, [mode, queue.length]);

  const shuffleDeck = useCallback(() => {
    setIsFlipped(false);
    setQueue((q) => [...q.slice(0, pos), ...shuffle(q.slice(pos))]);
  }, [pos]);

  const toggleDirection = useCallback(() => {
    setIsFlipped(false);
    setState((prev) => ({
      ...prev,
      direction:
        prev.direction === 'glyph-to-name' ? 'name-to-glyph' : 'glyph-to-name',
    }));
  }, [setState]);

  const startCram = useCallback(() => {
    setMode('cram');
    setQueue(shuffle(cards));
    setPos(0);
    setIsFlipped(false);
  }, [cards]);

  const exitCram = useCallback(() => {
    setMode('review');
    setQueue(buildQueue(cards, state, Date.now()));
    setPos(0);
    setIsFlipped(false);
  }, [cards, state]);

  const reset = useCallback(() => {
    setState({ version: 1, direction: state.direction, progress: {} });
    setMode('review');
    setQueue(shuffle(cards));
    setPos(0);
    setReviewedCount(0);
    setIsFlipped(false);
  }, [cards, state.direction, setState]);

  const nextDue = useMemo(() => nextDueAt(cards, state), [cards, state]);
  const remaining = Math.max(queue.length - pos, 0);

  return {
    current,
    direction: state.direction,
    mode,
    isFlipped,
    position: Math.min(pos + 1, queue.length),
    total: queue.length,
    reviewedCount,
    remaining,
    nextDue,
    flip,
    grade,
    next,
    prev,
    shuffleDeck,
    toggleDirection,
    startCram,
    exitCram,
    reset,
  };
}
