/**
 * @fileoverview Domain types for a flash-card letter and study direction.
 */

export type StudyDirection = 'glyph-to-name' | 'name-to-glyph';
export type CardFace = 'prompt' | 'answer';

export interface LetterCard {
  /** Stable id, also used as the spaced-repetition key. */
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
