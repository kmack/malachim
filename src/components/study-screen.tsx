/**
 * @fileoverview The main study shell. Owns the deck and theme hooks, wires up
 * keyboard + swipe input, and renders the active card with its mode toggle and
 * navigation.
 */

import './study-screen.css';

import type { JSX } from 'react';
import { useEffect, useRef } from 'react';

import { LETTERS } from '../data/letters';
import { useDeck } from '../hooks/use-deck';
import { useSwipe } from '../hooks/use-swipe';
import { useTheme } from '../hooks/use-theme';
import { FlashCard } from './flash-card';
import { ModeToggle } from './mode-toggle';
import { NavControls } from './nav-controls';
import { ProgressBar } from './progress-bar';
import { TopBar } from './top-bar';

export function StudyScreen(): JSX.Element {
  const deck = useDeck(LETTERS);
  const { theme, toggle } = useTheme();

  // Keep a ref to the latest deck so the one-time key/swipe listeners stay
  // current without re-binding. Updated in an effect (not during render).
  const deckRef = useRef(deck);
  useEffect(() => {
    deckRef.current = deck;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      // Let the modal own the keyboard while it's open.
      if (document.querySelector('.about-modal')) return;
      const d = deckRef.current;

      switch (e.key) {
        case ' ':
        case 'Enter': {
          const target = e.target as HTMLElement | null;
          // If a button is focused, let it handle activation (avoids double flip).
          if (target?.closest('button')) return;
          e.preventDefault();
          d.flip();
          break;
        }
        case 'ArrowLeft':
          d.prev();
          break;
        case 'ArrowRight':
          d.next();
          break;
        case 's':
        case 'S':
          // Shuffle: enter flashcards mode, or re-randomize if already there.
          if (d.mode === 'flashcards') d.reshuffle();
          else d.setMode('flashcards');
          break;
        case 't':
        case 'T':
          d.toggleDirection();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const swipe = useSwipe({
    onSwipe: (dir) => {
      if (dir === 'left') deckRef.current.next();
      else if (dir === 'right') deckRef.current.prev();
    },
  });

  return (
    <div className="study-screen">
      <TopBar theme={theme} onToggleTheme={toggle} />

      <main className="study-screen__main">
        {deck.current ? (
          <>
            <ProgressBar position={deck.position} total={deck.total} />

            <div
              className="study-screen__card-area"
              onPointerDown={swipe.onPointerDown}
              onPointerUp={swipe.onPointerUp}
            >
              <FlashCard
                card={deck.current}
                direction={deck.direction}
                isFlipped={deck.isFlipped}
                onFlip={deck.flip}
              />
            </div>

            <ModeToggle mode={deck.mode} onSelect={deck.setMode} />

            <NavControls
              onPrev={deck.prev}
              onNext={deck.next}
              onShuffle={deck.reshuffle}
              onToggleDirection={deck.toggleDirection}
              direction={deck.direction}
              showShuffle={deck.mode === 'flashcards'}
            />
          </>
        ) : (
          <p className="study-screen__empty">No cards to study.</p>
        )}
      </main>

      <div className="sr-only" aria-live="polite">
        {deck.current
          ? `Card ${deck.position} of ${deck.total}. ${
              deck.isFlipped ? 'Answer shown.' : 'Prompt shown.'
            }`
          : 'No cards to study.'}
      </div>
    </div>
  );
}
