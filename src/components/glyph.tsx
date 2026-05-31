/**
 * @fileoverview Renders a GlyphShape as inline SVG. Lines and curves stroke with
 * currentColor (so glyphs adapt to the theme); dots are open circles filled with
 * the card background.
 */

import './glyph.css';

import type { JSX } from 'react';

import type { GlyphShape } from '../types/glyph';

const STROKE_WIDTH = 4;
const DOT_RADIUS = 4.5;

export interface GlyphProps {
  shape: GlyphShape;
  /** Accessible name; ignored when `decorative`. */
  label: string;
  size?: number;
  /** When true, the glyph is hidden from assistive tech. */
  decorative?: boolean;
}

export function Glyph({
  shape,
  label,
  size = 160,
  decorative = false,
}: GlyphProps): JSX.Element {
  const a11y = decorative
    ? ({ 'aria-hidden': true } as const)
    : ({ role: 'img', 'aria-label': label } as const);

  return (
    <svg
      className="glyph"
      width={size}
      height={size}
      viewBox={`0 0 ${shape.viewBox} ${shape.viewBox}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {!decorative && <title>{label}</title>}
      {shape.segments?.map((s, i) => (
        <line
          key={`s${i}`}
          x1={s.from.x}
          y1={s.from.y}
          x2={s.to.x}
          y2={s.to.y}
        />
      ))}
      {shape.paths?.map((d, i) => (
        <path key={`p${i}`} d={d} />
      ))}
      {shape.dots?.map((dot, i) => (
        <circle
          key={`d${i}`}
          className="glyph__dot"
          cx={dot.at.x}
          cy={dot.at.y}
          r={dot.r ?? DOT_RADIUS}
        />
      ))}
    </svg>
  );
}
