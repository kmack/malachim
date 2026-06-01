/**
 * @fileoverview Position indicator: a fill bar reflecting how far through the
 * deck the current card is, plus a "Card n / total" label. The deck cycles, so
 * this tracks position, not completion.
 */

import './progress-bar.css';

import type { JSX } from 'react';

export interface ProgressBarProps {
  position: number;
  total: number;
}

export function ProgressBar({
  position,
  total,
}: ProgressBarProps): JSX.Element {
  const pct = total > 0 ? Math.min((position / total) * 100, 100) : 0;

  return (
    <div className="progress-bar">
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-bar__label">
        <span>
          Card {Math.min(position, total)} / {total}
        </span>
      </div>
    </div>
  );
}
