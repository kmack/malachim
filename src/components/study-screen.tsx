/**
 * @fileoverview The main study shell. Owns the deck and theme hooks, wires up
 * keyboard + swipe input, and renders either the active card or the
 * session-complete state.
 */

import './study-screen.css';

import type { JSX } from 'react';
import { useEffect, useRef } from 'react';

import { LETTERS } from '../data/letters';
import { useSrsDeck } from '../hooks/use-srs-deck';
import { useSwipe } from '../hooks/use-swipe';
import { useTheme } from '../hooks/use-theme';
import { FlashCard } from './flash-card';
import { GradeButtons } from './grade-buttons';
import { NavControls } from './nav-controls';
import { ProgressBar } from './progress-bar';
import { SessionComplete } from './session-complete';
import { TopBar } from './top-bar';

export function StudyScreen(): JSX.Element {
  const deck = useSrsDeck(LETTERS);
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

      const gradeIfReady = (g: 'again' | 'hard' | 'good' | 'easy'): void => {
        if (d.isFlipped && d.mode === 'review' && d.current) d.grade(g);
      };

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
          d.shuffleDeck();
          break;
        case 't':
        case 'T':
          d.toggleDirection();
          break;
        case '1':
          gradeIfReady('again');
          break;
        case '2':
          gradeIfReady('hard');
          break;
        case '3':
          gradeIfReady('good');
          break;
        case '4':
          gradeIfReady('easy');
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

  const showGrades = deck.isFlipped && deck.mode === 'review' && !!deck.current;

  return (
    <div className="study-screen">
      <TopBar theme={theme} onToggleTheme={toggle} onReset={deck.reset} />

      <main className="study-screen__main">
        {deck.current ? (
          <>
            <ProgressBar
              position={deck.position}
              total={deck.total}
              reviewed={deck.reviewedCount}
            />

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

            {deck.mode === 'review' ? (
              <GradeButtons onGrade={deck.grade} visible={showGrades} />
            ) : (
              <div className="study-screen__cram-bar">
                <span>Cram mode · {deck.total} cards</span>
                <button
                  type="button"
                  className="study-screen__exit-cram"
                  onClick={deck.exitCram}
                >
                  Exit cram
                </button>
              </div>
            )}

            <NavControls
              onPrev={deck.prev}
              onNext={deck.next}
              onShuffle={deck.shuffleDeck}
              onToggleDirection={deck.toggleDirection}
              direction={deck.direction}
            />
          </>
        ) : (
          <SessionComplete
            reviewedCount={deck.reviewedCount}
            nextDue={deck.nextDue}
            onCram={deck.startCram}
            onReset={deck.reset}
          />
        )}
      </main>

      <div className="sr-only" aria-live="polite">
        {deck.current
          ? `Card ${deck.position} of ${deck.total}. ${
              deck.isFlipped ? 'Answer shown.' : 'Prompt shown.'
            }`
          : 'Session complete.'}
      </div>
    </div>
  );
}
