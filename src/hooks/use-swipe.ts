/**
 * @fileoverview Pointer-based swipe detection. Reports a direction once the
 * gesture passes the configured threshold.
 */

import type { PointerEventHandler } from 'react';
import { useRef } from 'react';

import { APP_CONFIG } from '../config/app-config';

export type SwipeDir = 'left' | 'right' | 'up' | 'down';

export function useSwipe(opts: {
  onSwipe: (dir: SwipeDir) => void;
  thresholdPx?: number;
}): {
  onPointerDown: PointerEventHandler;
  onPointerUp: PointerEventHandler;
} {
  const threshold = opts.thresholdPx ?? APP_CONFIG.gestures.swipeThresholdPx;
  const start = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown: PointerEventHandler = (e) => {
    start.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp: PointerEventHandler = (e) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;
    if (Math.abs(dx) >= Math.abs(dy)) {
      opts.onSwipe(dx < 0 ? 'left' : 'right');
    } else {
      opts.onSwipe(dy < 0 ? 'up' : 'down');
    }
  };

  return { onPointerDown, onPointerUp };
}
