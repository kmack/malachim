/**
 * @fileoverview Domain types for a flash-card letter and study direction.
 */

export type StudyDirection = 'glyph-to-name' | 'name-to-glyph';
export type CardFace = 'prompt' | 'answer';

/**
 * How the deck is ordered. `reference` keeps the 22 letters in canonical
 * Aleph→Tav order; `flashcards` shuffles them for recall practice.
 */
export type DeckMode = 'reference' | 'flashcards';

export interface LetterCard {
  /** Stable id for the letter. */
  id: string;
  /** Canonical sequence 1..22 (Aleph..Tav). */
  order: number;
  /** Transliterated letter name, e.g. 'Aleph'. */
  name: string;
  /** The Hebrew letter character, e.g. 'א'. */
  hebrewChar: string;
  /** Reference into the glyph table. */
  glyphId: string;
  /** Optional alternate glyph (Samekh's second form); shown on the answer face. */
  variantGlyphId?: string;
  /** Optional study note. */
  note?: string;
}
