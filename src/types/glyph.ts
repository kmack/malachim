/**
 * @fileoverview Geometry model for a Malachim glyph, drawn on a normalized
 * 0..100 square. A glyph is composed of straight segments, curved SVG paths,
 * and the small open circles ("dots") characteristic of the celestial script.
 */

export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  from: Point;
  to: Point;
}

export interface Dot {
  at: Point;
  /** Radius in 0..100 units. Defaults are applied by the renderer. */
  r?: number;
}

export interface GlyphShape {
  id: string;
  /** Square normalized canvas size; always 100. */
  viewBox: 100;
  /** Straight line runs. */
  segments?: Segment[];
  /** SVG path `d` strings on the 0..100 grid (M/L/Q/C/A); stroked, no fill. */
  paths?: string[];
  /** Open-circle nodes. */
  dots?: Dot[];
}
