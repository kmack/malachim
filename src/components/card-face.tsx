/**
 * @fileoverview One face of a flash card. Shows the glyph or the letter/name
 * depending on the study direction and which face (prompt/answer) this is.
 * The Samekh answer face shows both Malachim forms (primary first, then variant).
 *
 * Elements are spans so a CardFace nests validly inside the <button> card.
 */

import './card-face.css';

import type { JSX } from 'react';

import { getGlyph } from '../data/glyphs';
import type {
  CardFace as Face,
  LetterCard,
  StudyDirection,
} from '../types/card';
import { Glyph } from './glyph';

export interface CardFaceProps {
  card: LetterCard;
  direction: StudyDirection;
  face: Face;
}

export function CardFace({
  card,
  direction,
  face,
}: CardFaceProps): JSX.Element {
  const showGlyph =
    (face === 'prompt' && direction === 'glyph-to-name') ||
    (face === 'answer' && direction === 'name-to-glyph');

  if (showGlyph) {
    const primary = getGlyph(card.glyphId);
    const variant =
      face === 'answer' && card.variantGlyphId
        ? getGlyph(card.variantGlyphId)
        : null;

    return (
      <span className="card-face card-face--glyph">
        <span className="card-face__glyphs">
          <Glyph
            shape={primary}
            label={
              variant
                ? `Malachim glyph for ${card.name}, primary form`
                : `Malachim glyph for ${card.name}`
            }
          />
          {variant && (
            <Glyph
              shape={variant}
              label={`Malachim glyph for ${card.name}, variant form`}
            />
          )}
        </span>
        {variant && <span className="card-face__note">two attested forms</span>}
      </span>
    );
  }

  return (
    <span className="card-face card-face--name">
      <span className="card-face__hebrew" lang="he">
        {card.hebrewChar}
      </span>
      <span className="card-face__name">{card.name}</span>
    </span>
  );
}
