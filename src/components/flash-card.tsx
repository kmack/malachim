/**
 * @fileoverview The flip card. A native <button> (so tap / Enter / Space all
 * flip) wrapping a 3D-rotated inner with a front (prompt) and back (answer).
 */

import './flash-card.css';

import type { JSX } from 'react';

import type { LetterCard, StudyDirection } from '../types/card';
import { cn } from '../utils/cn';
import { CardFace } from './card-face';

export interface FlashCardProps {
  card: LetterCard;
  direction: StudyDirection;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlashCard({
  card,
  direction,
  isFlipped,
  onFlip,
}: FlashCardProps): JSX.Element {
  return (
    <button
      type="button"
      className={cn('flash-card', isFlipped && 'flash-card--flipped')}
      onClick={onFlip}
      aria-label={
        isFlipped
          ? 'Answer shown. Activate to flip back.'
          : 'Prompt shown. Activate to reveal the answer.'
      }
    >
      {/*
        Keyed by card + direction so changing card (navigation) or direction
        remounts the inner and resets the flip *instantly*. Without the key,
        React reuses this node and animates the 180°→0° un-flip, briefly
        revealing the next card's answer face mid-rotation. Flipping the same
        card keeps the key stable, so that flip animation is preserved.
      */}
      <span className="flash-card__inner" key={`${card.id}:${direction}`}>
        <span className="flash-card__face flash-card__face--front">
          <CardFace card={card} direction={direction} face="prompt" />
        </span>
        <span className="flash-card__face flash-card__face--back">
          <CardFace card={card} direction={direction} face="answer" />
        </span>
      </span>
    </button>
  );
}
