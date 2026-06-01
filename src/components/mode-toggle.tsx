/**
 * @fileoverview Segmented control for the deck's order. Makes the
 * ordered-vs-randomized state unmistakable: "Reference / In order" vs.
 * "Flash cards / Shuffled", with the active segment clearly highlighted.
 */

import './mode-toggle.css';

import type { JSX } from 'react';

import type { DeckMode } from '../types/card';

export interface ModeToggleProps {
  mode: DeckMode;
  onSelect: (mode: DeckMode) => void;
}

const OPTIONS: ReadonlyArray<{
  mode: DeckMode;
  label: string;
  hint: string;
  aria: string;
}> = [
  {
    mode: 'reference',
    label: 'Reference',
    hint: 'In order',
    aria: 'Reference — cards in order',
  },
  {
    mode: 'flashcards',
    label: 'Flash cards',
    hint: 'Shuffled',
    aria: 'Flash cards — shuffled order',
  },
];

export function ModeToggle({ mode, onSelect }: ModeToggleProps): JSX.Element {
  return (
    <div className="mode-toggle" role="group" aria-label="Card order">
      {OPTIONS.map((opt) => {
        const active = mode === opt.mode;
        return (
          <button
            key={opt.mode}
            type="button"
            className="mode-toggle__btn"
            data-active={active}
            aria-pressed={active}
            aria-label={opt.aria}
            onClick={() => onSelect(opt.mode)}
          >
            <span className="mode-toggle__label">{opt.label}</span>
            <span className="mode-toggle__hint">{opt.hint}</span>
          </button>
        );
      })}
    </div>
  );
}
