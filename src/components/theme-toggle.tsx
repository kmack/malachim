/**
 * @fileoverview Light/dark theme toggle button.
 */

import './theme-toggle.css';

import type { JSX } from 'react';

import type { Theme } from '../hooks/use-theme';

export interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({
  theme,
  onToggle,
}: ThemeToggleProps): JSX.Element {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? '☾' : '☀'}
    </button>
  );
}
