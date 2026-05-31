/**
 * @fileoverview App header: title, help, reset-progress, and theme toggle.
 */

import './top-bar.css';

import type { JSX } from 'react';
import { useState } from 'react';

import type { Theme } from '../hooks/use-theme';
import { AboutModal } from './about-modal';
import { ThemeToggle } from './theme-toggle';

export interface TopBarProps {
  theme: Theme;
  onToggleTheme: () => void;
  onReset: () => void;
}

export function TopBar({
  theme,
  onToggleTheme,
  onReset,
}: TopBarProps): JSX.Element {
  const [aboutOpen, setAboutOpen] = useState(false);

  const handleReset = (): void => {
    if (
      window.confirm(
        'Reset all study progress? Every card returns to the start.'
      )
    ) {
      onReset();
    }
  };

  return (
    <header className="top-bar">
      <h1 className="top-bar__title">Malachim</h1>
      <div className="top-bar__actions">
        <button
          type="button"
          className="top-bar__btn"
          onClick={() => setAboutOpen(true)}
          aria-label="About and help"
        >
          ?
        </button>
        <button
          type="button"
          className="top-bar__btn"
          onClick={handleReset}
          aria-label="Reset progress"
          title="Reset progress"
        >
          ⟳
        </button>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </header>
  );
}
