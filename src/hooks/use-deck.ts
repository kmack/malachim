/**
 * @fileoverview The single source of truth for the study session: the card
 * queue, the current card, navigation, and persistence. The deck runs in one of
 * two modes — `reference` (canonical Aleph→Tav order) or `flashcards` (shuffled)
 * — and cycles forever; there is no scheduler or grading.
 */

import { useCallback, useState } from 'react';

import { STORAGE_KEYS } from '../config/app-config';
import type { DeckMode, LetterCard, StudyDirection } from '../types/card';
import { shuffle } from '../utils/shuffle';
import { useLocalStorage } from './use-local-storage';

interface DeckPrefs {
  version: 1;
  direction: StudyDirection;
  mode: DeckMode;
}

const INITIAL_PREFS: DeckPrefs = {
  version: 1,
  direction: 'glyph-to-name',
  mode: 'reference',
};

/** Order the cards for the given mode (canonical order vs. a fresh shuffle). */
function buildQueue(
  cards: readonly LetterCard[],
  mode: DeckMode
): LetterCard[] {
  if (mode === 'flashcards') return shuffle(cards);
  return [...cards].sort((a, b) => a.order - b.order);
}

export interface DeckApi {
  /** null only if the deck is empty (never with the 22 LETTERS). */
  current: LetterCard | null;
  direction: StudyDirection;
  mode: DeckMode;
  isFlipped: boolean;
  /** 1-based position of the current card within the deck. */
  position: number;
  /** Number of cards in the deck. */
  total: number;
  flip: () => void;
  next: () => void;
  prev: () => void;
  /** Switch ordering. No-op when already in the requested mode. */
  setMode: (mode: DeckMode) => void;
  /** Re-randomize the whole deck (flashcards mode). */
  reshuffle: () => void;
  toggleDirection: () => void;
}

export function useDeck(cards: readonly LetterCard[]): DeckApi {
  const [prefs, setPrefs] = useLocalStorage<DeckPrefs>(
    STORAGE_KEYS.prefs,
    INITIAL_PREFS
  );
  const [queue, setQueue] = useState<LetterCard[]>(() =>
    buildQueue(cards, prefs.mode)
  );
  const [pos, setPos] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const current = pos >= 0 && pos < queue.length ? queue[pos] : null;

  const flip = useCallback(() => setIsFlipped((f) => !f), []);

  const next = useCallback(() => {
    setIsFlipped(false);
    setPos((p) => (queue.length ? (p + 1) % queue.length : 0));
  }, [queue.length]);

  const prev = useCallback(() => {
    setIsFlipped(false);
    setPos((p) => (queue.length ? (p - 1 + queue.length) % queue.length : 0));
  }, [queue.length]);

  const setMode = useCallback(
    (mode: DeckMode) => {
      // Re-selecting the active mode must not reshuffle or jump position.
      if (mode === prefs.mode) return;
      setPrefs((prev) => ({ ...prev, mode }));
      setQueue(buildQueue(cards, mode));
      setPos(0);
      setIsFlipped(false);
    },
    [cards, prefs.mode, setPrefs]
  );

  const reshuffle = useCallback(() => {
    setQueue(shuffle(cards));
    setPos(0);
    setIsFlipped(false);
  }, [cards]);

  const toggleDirection = useCallback(() => {
    setIsFlipped(false);
    setPrefs((prev) => ({
      ...prev,
      direction:
        prev.direction === 'glyph-to-name' ? 'name-to-glyph' : 'glyph-to-name',
    }));
  }, [setPrefs]);

  return {
    current,
    direction: prefs.direction,
    mode: prefs.mode,
    isFlipped,
    position: Math.min(pos + 1, queue.length),
    total: queue.length,
    flip,
    next,
    prev,
    setMode,
    reshuffle,
    toggleDirection,
  };
}
