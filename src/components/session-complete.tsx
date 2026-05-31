/**
 * @fileoverview Shown when the due queue is empty: a summary, the next-due time,
 * and options to cram all 22 or reset progress.
 */

import './session-complete.css';

import type { JSX } from 'react';

export interface SessionCompleteProps {
  reviewedCount: number;
  nextDue: number | null;
  onCram: () => void;
  onReset: () => void;
}

function formatNextDue(nextDue: number | null): string {
  if (nextDue === null) return '';
  const ms = nextDue - Date.now();
  if (ms <= 0) return 'now';
  const minutes = Math.round(ms / 60000);
  if (minutes < 60) return `in ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `in ${hours} h`;
  const days = Math.round(hours / 24);
  return `in ${days} day${days === 1 ? '' : 's'}`;
}

export function SessionComplete({
  reviewedCount,
  nextDue,
  onCram,
  onReset,
}: SessionCompleteProps): JSX.Element {
  const due = formatNextDue(nextDue);

  return (
    <div className="session-complete">
      <p className="session-complete__icon" aria-hidden="true">
        ✓
      </p>
      <h2 className="session-complete__title">All caught up</h2>
      <p className="session-complete__text">
        You reviewed {reviewedCount} card{reviewedCount === 1 ? '' : 's'} this
        session.
        {due && ` Next review ${due}.`}
      </p>
      <div className="session-complete__actions">
        <button
          type="button"
          className="session-complete__btn"
          onClick={onCram}
        >
          Cram all 22
        </button>
        <button
          type="button"
          className="session-complete__btn session-complete__btn--ghost"
          onClick={onReset}
        >
          Reset progress
        </button>
      </div>
    </div>
  );
}
