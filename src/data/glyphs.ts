/**
 * @fileoverview Hand-traced Malachim glyph geometry on a normalized 0..100 grid.
 *
 * Each glyph is built from straight `segments`, curved `paths` (SVG `d`), and
 * open-circle `dots`. Coordinates are a faithful first-pass tracing of the
 * source manuscript and are tuned by eye against the rendered preview.
 */

import type { GlyphShape } from '../types/glyph';

export const GLYPHS: Record<string, GlyphShape> = {
  // Aleph — cross-topped vertical with two ringed bars and ringed feet.
  aleph: {
    id: 'aleph',
    viewBox: 100,
    segments: [
      { from: { x: 50, y: 20 }, to: { x: 50, y: 70 } },
      { from: { x: 41, y: 27 }, to: { x: 59, y: 27 } },
      { from: { x: 32, y: 40 }, to: { x: 68, y: 40 } },
      { from: { x: 32, y: 53 }, to: { x: 68, y: 53 } },
      { from: { x: 50, y: 70 }, to: { x: 43, y: 79 } },
      { from: { x: 50, y: 70 }, to: { x: 57, y: 79 } },
    ],
    dots: [
      { at: { x: 41, y: 27 } },
      { at: { x: 59, y: 27 } },
      { at: { x: 32, y: 40 } },
      { at: { x: 68, y: 40 } },
      { at: { x: 32, y: 53 } },
      { at: { x: 68, y: 53 } },
      { at: { x: 43, y: 80 } },
      { at: { x: 57, y: 80 } },
    ],
  },

  // Beth - upward cup with three top nodes and an inner tongue.
  beth: {
    id: 'beth',
    viewBox: 100,
    paths: ['M30 22 L30 50 Q30 78 50 78 Q70 78 70 50 L70 22'],
    segments: [{ from: { x: 50, y: 22 }, to: { x: 50, y: 62 } }],
    dots: [
      { at: { x: 30, y: 22 } },
      { at: { x: 50, y: 22 } },
      { at: { x: 70, y: 22 } },
      { at: { x: 50, y: 62 } },
    ],
  },

  // Gimel - twin descenders sweeping into a leftward tail.
  gimel: {
    id: 'gimel',
    viewBox: 100,
    paths: [
      'M40 22 C38 44 42 64 50 76 C42 80 24 82 12 78',
      'M68 22 C64 46 58 64 50 76',
    ],
    dots: [{ at: { x: 40, y: 22 } }, { at: { x: 68, y: 22 } }],
  },

  // Daleth - top rail, left leg, and central leg.
  daleth: {
    id: 'daleth',
    viewBox: 100,
    segments: [
      { from: { x: 28, y: 28 }, to: { x: 72, y: 28 } },
      { from: { x: 28, y: 28 }, to: { x: 28, y: 72 } },
      { from: { x: 56, y: 28 }, to: { x: 56, y: 72 } },
    ],
    dots: [
      { at: { x: 28, y: 28 } },
      { at: { x: 72, y: 28 } },
      { at: { x: 28, y: 72 } },
      { at: { x: 56, y: 72 } },
    ],
  },

  // Heh — N-stroke with nodes at the two diagonal ends.
  heh: {
    id: 'heh',
    viewBox: 100,
    segments: [
      { from: { x: 36, y: 26 }, to: { x: 36, y: 74 } },
      { from: { x: 36, y: 26 }, to: { x: 64, y: 74 } },
      { from: { x: 64, y: 26 }, to: { x: 64, y: 74 } },
    ],
    dots: [{ at: { x: 36, y: 26 } }, { at: { x: 64, y: 74 } }],
  },

  // Vav - fan descending from one top node to three base nodes.
  vav: {
    id: 'vav',
    viewBox: 100,
    segments: [
      { from: { x: 50, y: 22 }, to: { x: 28, y: 76 } },
      { from: { x: 50, y: 22 }, to: { x: 50, y: 76 } },
      { from: { x: 50, y: 22 }, to: { x: 72, y: 76 } },
    ],
    dots: [
      { at: { x: 50, y: 22 } },
      { at: { x: 28, y: 76 } },
      { at: { x: 50, y: 76 } },
      { at: { x: 72, y: 76 } },
    ],
  },

  // Zayin - three top nodes converging to a lower node.
  zayin: {
    id: 'zayin',
    viewBox: 100,
    segments: [
      { from: { x: 30, y: 26 }, to: { x: 50, y: 76 } },
      { from: { x: 50, y: 26 }, to: { x: 50, y: 76 } },
      { from: { x: 70, y: 26 }, to: { x: 50, y: 76 } },
    ],
    dots: [
      { at: { x: 30, y: 26 } },
      { at: { x: 50, y: 26 } },
      { at: { x: 70, y: 26 } },
      { at: { x: 50, y: 76 } },
    ],
  },

  // Cheth - a 2x1 box with a central divider.
  cheth: {
    id: 'cheth',
    viewBox: 100,
    segments: [
      { from: { x: 22, y: 30 }, to: { x: 78, y: 30 } },
      { from: { x: 78, y: 30 }, to: { x: 78, y: 70 } },
      { from: { x: 78, y: 70 }, to: { x: 22, y: 70 } },
      { from: { x: 22, y: 70 }, to: { x: 22, y: 30 } },
      { from: { x: 50, y: 30 }, to: { x: 50, y: 70 } },
    ],
  },

  // Teth - paired crossings with three top nodes and three base nodes.
  teth: {
    id: 'teth',
    viewBox: 100,
    segments: [
      { from: { x: 28, y: 28 }, to: { x: 50, y: 72 } },
      { from: { x: 50, y: 28 }, to: { x: 28, y: 72 } },
      { from: { x: 50, y: 28 }, to: { x: 72, y: 72 } },
      { from: { x: 72, y: 28 }, to: { x: 50, y: 72 } },
    ],
    dots: [
      { at: { x: 28, y: 28 } },
      { at: { x: 50, y: 28 } },
      { at: { x: 72, y: 28 } },
      { at: { x: 28, y: 72 } },
      { at: { x: 50, y: 72 } },
      { at: { x: 72, y: 72 } },
    ],
  },

  // Yod - tall hook from an upper node to a lower-left node.
  yod: {
    id: 'yod',
    viewBox: 100,
    paths: ['M58 22 C72 46 76 76 30 78'],
    dots: [{ at: { x: 58, y: 22 } }, { at: { x: 30, y: 78 } }],
  },

  // Kaph - curved bow open on the left, with upper and lower left nodes.
  kaph: {
    id: 'kaph',
    viewBox: 100,
    paths: ['M28 28 C48 26 72 30 74 50 C76 72 50 76 28 74'],
    dots: [{ at: { x: 28, y: 28 } }, { at: { x: 28, y: 74 } }],
  },

  // Lamed - cup rising to a tall right stem.
  lamed: {
    id: 'lamed',
    viewBox: 100,
    paths: ['M30 42 L30 54 Q30 78 50 78 Q70 78 70 50 L70 22'],
    dots: [{ at: { x: 30, y: 42 } }, { at: { x: 70, y: 22 } }],
  },

  // Mem - H-form with four ringed ends.
  mem: {
    id: 'mem',
    viewBox: 100,
    segments: [
      { from: { x: 34, y: 24 }, to: { x: 34, y: 76 } },
      { from: { x: 66, y: 24 }, to: { x: 66, y: 76 } },
      { from: { x: 34, y: 50 }, to: { x: 66, y: 50 } },
    ],
    dots: [
      { at: { x: 34, y: 24 } },
      { at: { x: 66, y: 24 } },
      { at: { x: 34, y: 76 } },
      { at: { x: 66, y: 76 } },
    ],
  },

  // Nun - right stem with a left branch node.
  nun: {
    id: 'nun',
    viewBox: 100,
    segments: [
      { from: { x: 68, y: 24 }, to: { x: 68, y: 76 } },
      { from: { x: 30, y: 40 }, to: { x: 68, y: 58 } },
    ],
    dots: [
      { at: { x: 68, y: 24 } },
      { at: { x: 68, y: 76 } },
      { at: { x: 30, y: 40 } },
    ],
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

  // Samekh (variant) - fanned candelabrum with a lower stem node.
  'samekh-var': {
    id: 'samekh-var',
    viewBox: 100,
    paths: ['M24 56 Q50 72 76 56'],
    segments: [
      { from: { x: 30, y: 58 }, to: { x: 24, y: 34 } },
      { from: { x: 40, y: 64 }, to: { x: 37, y: 30 } },
      { from: { x: 50, y: 80 }, to: { x: 50, y: 26 } },
      { from: { x: 60, y: 64 }, to: { x: 63, y: 30 } },
      { from: { x: 70, y: 58 }, to: { x: 76, y: 34 } },
    ],
    dots: [
      { at: { x: 24, y: 34 } },
      { at: { x: 37, y: 30 } },
      { at: { x: 50, y: 26 } },
      { at: { x: 63, y: 30 } },
      { at: { x: 76, y: 34 } },
      { at: { x: 50, y: 80 } },
    ],
  },

  // Ayin - square with four ringed corners.
  ayin: {
    id: 'ayin',
    viewBox: 100,
    segments: [
      { from: { x: 28, y: 28 }, to: { x: 72, y: 28 } },
      { from: { x: 72, y: 28 }, to: { x: 72, y: 72 } },
      { from: { x: 72, y: 72 }, to: { x: 28, y: 72 } },
      { from: { x: 28, y: 72 }, to: { x: 28, y: 28 } },
    ],
    dots: [
      { at: { x: 28, y: 28 } },
      { at: { x: 72, y: 28 } },
      { at: { x: 28, y: 72 } },
      { at: { x: 72, y: 72 } },
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

  // Qoph — deep upward cup with two top nodes.
  qoph: {
    id: 'qoph',
    viewBox: 100,
    paths: ['M28 24 L28 50 Q28 78 50 78 Q72 78 72 50 L72 24'],
    dots: [{ at: { x: 28, y: 24 } }, { at: { x: 72, y: 24 } }],
  },

  // Resh - open V with two upper nodes.
  resh: {
    id: 'resh',
    viewBox: 100,
    segments: [
      { from: { x: 36, y: 28 }, to: { x: 50, y: 72 } },
      { from: { x: 64, y: 28 }, to: { x: 50, y: 72 } },
    ],
    dots: [{ at: { x: 36, y: 28 } }, { at: { x: 64, y: 28 } }],
  },

  // Shin - angular four-node form.
  shin: {
    id: 'shin',
    viewBox: 100,
    segments: [
      { from: { x: 24, y: 76 }, to: { x: 44, y: 24 } },
      { from: { x: 44, y: 24 }, to: { x: 64, y: 76 } },
      { from: { x: 56, y: 56 }, to: { x: 76, y: 24 } },
    ],
    dots: [
      { at: { x: 24, y: 76 } },
      { at: { x: 44, y: 24 } },
      { at: { x: 76, y: 24 } },
      { at: { x: 64, y: 76 } },
    ],
  },

  // Tav - comb / ladder with side nodes on the crossbar.
  tav: {
    id: 'tav',
    viewBox: 100,
    segments: [
      { from: { x: 18, y: 50 }, to: { x: 82, y: 50 } },
      { from: { x: 34, y: 24 }, to: { x: 34, y: 76 } },
      { from: { x: 50, y: 24 }, to: { x: 50, y: 76 } },
      { from: { x: 66, y: 24 }, to: { x: 66, y: 76 } },
    ],
    dots: [
      { at: { x: 18, y: 50 } },
      { at: { x: 82, y: 50 } },
      { at: { x: 34, y: 24 } },
      { at: { x: 50, y: 24 } },
      { at: { x: 66, y: 24 } },
      { at: { x: 34, y: 76 } },
      { at: { x: 50, y: 76 } },
      { at: { x: 66, y: 76 } },
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
