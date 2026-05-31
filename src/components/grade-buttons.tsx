/**
 * @fileoverview Self-grading row shown after the card is flipped. Maps to the
 * Leitner grades and to keyboard keys 1-4.
 */

import './grade-buttons.css';

import type { JSX } from 'react';

import type { Grade } from '../types/srs';

const GRADES: ReadonlyArray<{ grade: Grade; label: string; key: string }> = [
  { grade: 'again', label: 'Again', key: '1' },
  { grade: 'hard', label: 'Hard', key: '2' },
  { grade: 'good', label: 'Good', key: '3' },
  { grade: 'easy', label: 'Easy', key: '4' },
];

export interface GradeButtonsProps {
  onGrade: (grade: Grade) => void;
  visible: boolean;
}

export function GradeButtons({
  onGrade,
  visible,
}: GradeButtonsProps): JSX.Element {
  return (
    <div
      className="grade-buttons"
      data-visible={visible}
      aria-hidden={!visible}
    >
      {GRADES.map((g) => (
        <button
          key={g.grade}
          type="button"
          className={`grade-buttons__btn grade-buttons__btn--${g.grade}`}
          onClick={() => onGrade(g.grade)}
          tabIndex={visible ? 0 : -1}
        >
          <span className="grade-buttons__label">{g.label}</span>
          <span className="grade-buttons__key">{g.key}</span>
        </button>
      ))}
    </div>
  );
}
