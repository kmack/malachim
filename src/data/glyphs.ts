/**
 * @fileoverview Hand-traced Malachim glyph geometry on a normalized 0..100 grid.
 *
 * Each glyph is built from straight `segments`, curved `paths` (SVG `d`), and
 * open-circle `dots`. Coordinates are a faithful first-pass tracing of the
 * source manuscript and are tuned by eye against the rendered preview.
 */

import type { GlyphShape } from '../types/glyph';

export const GLYPHS: Record<string, GlyphShape> = {
  // Aleph — double-barred vertical with ringed bar ends.
  aleph: {
    id: 'aleph',
    viewBox: 100,
    segments: [
      { from: { x: 50, y: 18 }, to: { x: 50, y: 70 } },
      { from: { x: 36, y: 36 }, to: { x: 64, y: 36 } },
      { from: { x: 28, y: 58 }, to: { x: 72, y: 58 } },
    ],
    dots: [
      { at: { x: 50, y: 16 } },
      { at: { x: 36, y: 36 } },
      { at: { x: 64, y: 36 } },
      { at: { x: 28, y: 58 } },
      { at: { x: 72, y: 58 } },
    ],
  },

  // Beth — upward cup with three top nodes and an inner tongue.
  beth: {
    id: 'beth',
    viewBox: 100,
    paths: ['M32 32 L32 56 Q32 74 50 74 Q68 74 68 56 L68 32'],
    segments: [{ from: { x: 50, y: 74 }, to: { x: 50, y: 50 } }],
    dots: [
      { at: { x: 32, y: 32 } },
      { at: { x: 68, y: 32 } },
      { at: { x: 50, y: 50 } },
    ],
  },

  // Gimel — two upper nodes meeting and descending to a hooked tail.
  gimel: {
    id: 'gimel',
    viewBox: 100,
    segments: [
      { from: { x: 40, y: 32 }, to: { x: 54, y: 54 } },
      { from: { x: 66, y: 30 }, to: { x: 54, y: 54 } },
    ],
    paths: ['M54 54 L50 68 Q47 78 38 74'],
    dots: [{ at: { x: 40, y: 32 } }, { at: { x: 66, y: 30 } }],
  },

  // Daleth — table (Π) with ringed feet and a node at the top-right.
  daleth: {
    id: 'daleth',
    viewBox: 100,
    segments: [
      { from: { x: 32, y: 36 }, to: { x: 72, y: 36 } },
      { from: { x: 34, y: 36 }, to: { x: 34, y: 64 } },
      { from: { x: 66, y: 36 }, to: { x: 66, y: 64 } },
    ],
    dots: [
      { at: { x: 72, y: 36 } },
      { at: { x: 34, y: 66 } },
      { at: { x: 66, y: 66 } },
    ],
  },

  // Heh — N-stroke with diagonal nodes.
  heh: {
    id: 'heh',
    viewBox: 100,
    segments: [
      { from: { x: 36, y: 30 }, to: { x: 36, y: 70 } },
      { from: { x: 36, y: 30 }, to: { x: 64, y: 70 } },
      { from: { x: 64, y: 30 }, to: { x: 64, y: 70 } },
    ],
    dots: [{ at: { x: 36, y: 28 } }, { at: { x: 64, y: 72 } }],
  },

  // Vav — tent with a central pole and three base nodes.
  vav: {
    id: 'vav',
    viewBox: 100,
    segments: [
      { from: { x: 32, y: 70 }, to: { x: 50, y: 30 } },
      { from: { x: 68, y: 70 }, to: { x: 50, y: 30 } },
      { from: { x: 50, y: 70 }, to: { x: 50, y: 42 } },
    ],
    dots: [
      { at: { x: 32, y: 72 } },
      { at: { x: 50, y: 72 } },
      { at: { x: 68, y: 72 } },
    ],
  },

  // Zayin — downward trident: three top nodes converging to a point.
  zayin: {
    id: 'zayin',
    viewBox: 100,
    segments: [
      { from: { x: 34, y: 32 }, to: { x: 50, y: 68 } },
      { from: { x: 50, y: 30 }, to: { x: 50, y: 68 } },
      { from: { x: 66, y: 32 }, to: { x: 50, y: 68 } },
    ],
    dots: [
      { at: { x: 34, y: 32 } },
      { at: { x: 50, y: 28 } },
      { at: { x: 66, y: 32 } },
      { at: { x: 50, y: 70 } },
    ],
  },

  // Cheth — a 2x1 box (rectangle with a central divider).
  cheth: {
    id: 'cheth',
    viewBox: 100,
    segments: [
      { from: { x: 32, y: 40 }, to: { x: 68, y: 40 } },
      { from: { x: 68, y: 40 }, to: { x: 68, y: 64 } },
      { from: { x: 68, y: 64 }, to: { x: 32, y: 64 } },
      { from: { x: 32, y: 64 }, to: { x: 32, y: 40 } },
      { from: { x: 50, y: 40 }, to: { x: 50, y: 64 } },
    ],
  },

  // Teth — crossed strokes with three base nodes (a crown).
  teth: {
    id: 'teth',
    viewBox: 100,
    segments: [
      { from: { x: 34, y: 40 }, to: { x: 62, y: 66 } },
      { from: { x: 66, y: 40 }, to: { x: 38, y: 66 } },
      { from: { x: 50, y: 40 }, to: { x: 50, y: 66 } },
    ],
    dots: [
      { at: { x: 34, y: 40 } },
      { at: { x: 66, y: 40 } },
      { at: { x: 34, y: 68 } },
      { at: { x: 50, y: 68 } },
      { at: { x: 66, y: 68 } },
    ],
  },

  // Yod — small hook with a single node.
  yod: {
    id: 'yod',
    viewBox: 100,
    paths: ['M54 38 Q44 50 56 64'],
    dots: [{ at: { x: 54, y: 36 } }],
  },

  // Kaph — open cup with two top nodes.
  kaph: {
    id: 'kaph',
    viewBox: 100,
    paths: ['M36 36 L36 56 Q36 70 52 70 Q68 70 68 56 L68 36'],
    dots: [{ at: { x: 36, y: 36 } }, { at: { x: 68, y: 36 } }],
  },

  // Lamed — tall hook (candy-cane) with a top node.
  lamed: {
    id: 'lamed',
    viewBox: 100,
    paths: ['M54 34 L54 58 Q54 72 40 72'],
    dots: [{ at: { x: 54, y: 32 } }],
  },

  // Mem — H-form with four ringed ends.
  mem: {
    id: 'mem',
    viewBox: 100,
    segments: [
      { from: { x: 36, y: 32 }, to: { x: 36, y: 68 } },
      { from: { x: 64, y: 32 }, to: { x: 64, y: 68 } },
      { from: { x: 36, y: 50 }, to: { x: 64, y: 50 } },
    ],
    dots: [
      { at: { x: 36, y: 32 } },
      { at: { x: 64, y: 32 } },
      { at: { x: 36, y: 68 } },
      { at: { x: 64, y: 68 } },
    ],
  },

  // Nun — flag (7) with two nodes.
  nun: {
    id: 'nun',
    viewBox: 100,
    segments: [
      { from: { x: 36, y: 34 }, to: { x: 66, y: 34 } },
      { from: { x: 62, y: 34 }, to: { x: 46, y: 68 } },
    ],
    dots: [{ at: { x: 36, y: 34 } }, { at: { x: 46, y: 70 } }],
  },

  // Samekh (primary) — six-rayed asterisk with ringed tips.
  samekh: {
    id: 'samekh',
    viewBox: 100,
    segments: [
      { from: { x: 50, y: 24 }, to: { x: 50, y: 76 } },
      { from: { x: 28, y: 37 }, to: { x: 72, y: 63 } },
      { from: { x: 72, y: 37 }, to: { x: 28, y: 63 } },
    ],
    dots: [
      { at: { x: 50, y: 24 } },
      { at: { x: 50, y: 76 } },
      { at: { x: 28, y: 37 } },
      { at: { x: 72, y: 63 } },
      { at: { x: 72, y: 37 } },
      { at: { x: 28, y: 63 } },
    ],
  },

  // Samekh (variant) — fanned candelabrum with nodes atop each prong.
  'samekh-var': {
    id: 'samekh-var',
    viewBox: 100,
    paths: ['M30 62 Q50 72 70 62'],
    segments: [
      { from: { x: 34, y: 62 }, to: { x: 32, y: 42 } },
      { from: { x: 42, y: 64 }, to: { x: 41, y: 38 } },
      { from: { x: 50, y: 66 }, to: { x: 50, y: 34 } },
      { from: { x: 58, y: 64 }, to: { x: 59, y: 38 } },
      { from: { x: 66, y: 62 }, to: { x: 68, y: 42 } },
    ],
    dots: [
      { at: { x: 32, y: 40 } },
      { at: { x: 41, y: 36 } },
      { at: { x: 50, y: 32 } },
      { at: { x: 59, y: 36 } },
      { at: { x: 68, y: 40 } },
    ],
  },

  // Ayin — plain square.
  ayin: {
    id: 'ayin',
    viewBox: 100,
    segments: [
      { from: { x: 34, y: 34 }, to: { x: 66, y: 34 } },
      { from: { x: 66, y: 34 }, to: { x: 66, y: 66 } },
      { from: { x: 66, y: 66 }, to: { x: 34, y: 66 } },
      { from: { x: 34, y: 66 }, to: { x: 34, y: 34 } },
    ],
  },

  // Peh — saltire (X) with four ringed ends.
  peh: {
    id: 'peh',
    viewBox: 100,
    segments: [
      { from: { x: 32, y: 32 }, to: { x: 68, y: 68 } },
      { from: { x: 68, y: 32 }, to: { x: 32, y: 68 } },
    ],
    dots: [
      { at: { x: 32, y: 32 } },
      { at: { x: 68, y: 32 } },
      { at: { x: 32, y: 68 } },
      { at: { x: 68, y: 68 } },
    ],
  },

  // Tzaddi — vertical through a small central box, nodes top and bottom.
  tzaddi: {
    id: 'tzaddi',
    viewBox: 100,
    segments: [
      { from: { x: 50, y: 30 }, to: { x: 50, y: 70 } },
      { from: { x: 44, y: 45 }, to: { x: 56, y: 45 } },
      { from: { x: 56, y: 45 }, to: { x: 56, y: 55 } },
      { from: { x: 56, y: 55 }, to: { x: 44, y: 55 } },
      { from: { x: 44, y: 55 }, to: { x: 44, y: 45 } },
    ],
    dots: [{ at: { x: 50, y: 28 } }, { at: { x: 50, y: 72 } }],
  },

  // Qoph — deep cup with two top nodes.
  qoph: {
    id: 'qoph',
    viewBox: 100,
    paths: ['M38 34 L38 60 Q38 74 50 74 Q62 74 62 60 L62 34'],
    dots: [{ at: { x: 38, y: 34 } }, { at: { x: 62, y: 34 } }],
  },

  // Resh — open V with a single node.
  resh: {
    id: 'resh',
    viewBox: 100,
    segments: [
      { from: { x: 36, y: 36 }, to: { x: 50, y: 66 } },
      { from: { x: 64, y: 36 }, to: { x: 50, y: 66 } },
    ],
    dots: [{ at: { x: 64, y: 34 } }],
  },

  // Shin — angle bracket with three nodes.
  shin: {
    id: 'shin',
    viewBox: 100,
    segments: [
      { from: { x: 40, y: 32 }, to: { x: 62, y: 50 } },
      { from: { x: 62, y: 50 }, to: { x: 40, y: 68 } },
    ],
    dots: [
      { at: { x: 40, y: 32 } },
      { at: { x: 64, y: 50 } },
      { at: { x: 40, y: 68 } },
    ],
  },

  // Tav — comb / ladder: a crossbar over ringed verticals.
  tav: {
    id: 'tav',
    viewBox: 100,
    segments: [
      { from: { x: 24, y: 50 }, to: { x: 76, y: 50 } },
      { from: { x: 36, y: 40 }, to: { x: 36, y: 62 } },
      { from: { x: 50, y: 40 }, to: { x: 50, y: 62 } },
      { from: { x: 64, y: 40 }, to: { x: 64, y: 62 } },
    ],
    dots: [
      { at: { x: 36, y: 38 } },
      { at: { x: 50, y: 38 } },
      { at: { x: 64, y: 38 } },
      { at: { x: 36, y: 64 } },
      { at: { x: 50, y: 64 } },
      { at: { x: 64, y: 64 } },
    ],
  },
};

const GLYPH_MAP = new Map<string, GlyphShape>(Object.entries(GLYPHS));

/** Look up a glyph by id; throws if the id is unknown (a data invariant). */
export function getGlyph(id: string): GlyphShape {
  const shape = GLYPH_MAP.get(id);
  if (!shape) throw new Error(`Unknown glyph id: ${id}`);
  return shape;
}
