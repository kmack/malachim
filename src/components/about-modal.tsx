/**
 * @fileoverview Accessible about/help dialog: role="dialog" + aria-modal, with
 * a focus trap, focus restore on close, Escape to close, and backdrop dismiss.
 */

import './about-modal.css';

import type { JSX } from 'react';
import { useEffect, useRef } from 'react';

const FOCUSABLE = 'button, [href], input, [tabindex]:not([tabindex="-1"])';

export interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export function AboutModal({
  open,
  onClose,
}: AboutModalProps): JSX.Element | null {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialog) {
        const nodes = Array.from(
          dialog.querySelectorAll<HTMLElement>(FOCUSABLE)
        ).filter((el) => !el.hasAttribute('disabled'));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="about-modal__backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="about-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="about-modal-title" className="about-modal__title">
          About Malachim
        </h2>
        <p>
          Flash cards for learning the <strong>Malachim</strong> alphabet — the
          “writing of the angels.” Each card pairs one of the 22 Hebrew letters
          with its celestial-script glyph.
        </p>

        <h3 className="about-modal__subtitle">How to study</h3>
        <ul className="about-modal__list">
          <li>Tap the card (or press Space / Enter) to flip it.</li>
          <li>After flipping, grade yourself: Again, Hard, Good, or Easy.</li>
          <li>
            Grades schedule each letter with a Leitner spaced-repetition system,
            so weaker letters come back sooner.
          </li>
          <li>Swipe left / right or use ‹ › to move between cards.</li>
          <li>Switch the prompt direction (glyph ⇄ name) at any time.</li>
        </ul>

        <h3 className="about-modal__subtitle">Keyboard</h3>
        <ul className="about-modal__list">
          <li>
            <kbd>Space</kbd> / <kbd>Enter</kbd> — flip
          </li>
          <li>
            <kbd>←</kbd> <kbd>→</kbd> — previous / next
          </li>
          <li>
            <kbd>1</kbd>–<kbd>4</kbd> — grade (after flip)
          </li>
          <li>
            <kbd>S</kbd> — shuffle · <kbd>T</kbd> — toggle direction
          </li>
        </ul>

        <button type="button" className="about-modal__close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
