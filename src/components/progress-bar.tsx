/**
 * @fileoverview Session progress: a fill bar plus a "Card n / total" and
 * reviewed-count label.
 */

import './progress-bar.css';

import type { JSX } from 'react';

export interface ProgressBarProps {
  position: number;
  total: number;
  reviewed: number;
}

export function ProgressBar({
  position,
  total,
  reviewed,
}: ProgressBarProps): JSX.Element {
  const pct = total > 0 ? Math.min((reviewed / total) * 100, 100) : 0;

  return (
    <div className="progress-bar">
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-bar__label">
        <span>
          Card {Math.min(position, total)} / {total}
        </span>
        <span>{reviewed} reviewed</span>
      </div>
    </div>
  );
}
