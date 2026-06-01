/**
 * @fileoverview Previous / shuffle / direction-toggle / next controls.
 */

import './nav-controls.css';

import type { JSX } from 'react';

import type { StudyDirection } from '../types/card';

export interface NavControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onToggleDirection: () => void;
  direction: StudyDirection;
  /** Show the reshuffle button (flashcards mode only — reference order is fixed). */
  showShuffle: boolean;
}

export function NavControls(props: NavControlsProps): JSX.Element {
  const directionLabel =
    props.direction === 'glyph-to-name' ? 'Glyph → Name' : 'Name → Glyph';

  return (
    <div className="nav-controls">
      <button
        type="button"
        className="nav-controls__btn"
        onClick={props.onPrev}
        aria-label="Previous card"
      >
        ‹
      </button>
      {props.showShuffle && (
        <button
          type="button"
          className="nav-controls__btn"
          onClick={props.onShuffle}
          aria-label="Reshuffle deck"
        >
          ⤮
        </button>
      )}
      <button
        type="button"
        className="nav-controls__btn nav-controls__btn--direction"
        onClick={props.onToggleDirection}
        aria-label={`Study direction ${directionLabel}. Activate to switch.`}
      >
        {directionLabel}
      </button>
      <button
        type="button"
        className="nav-controls__btn"
        onClick={props.onNext}
        aria-label="Next card"
      >
        ›
      </button>
    </div>
  );
}
