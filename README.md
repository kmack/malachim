# Malachim — Alphabet of the Angels

A mobile-first flash-card web app for learning the **Malachim** alphabet (the celestial "writing of the angels"): the 22 Hebrew letters paired with their Malachim glyphs, with spaced-repetition study.

The glyphs are drawn as inline SVG (lines + open circles), so they stay crisp at any size and adapt to the theme.

## Features

- **Flip cards** — tap, click, or press <kbd>Space</kbd>/<kbd>Enter</kbd> to reveal the answer.
- **Spaced repetition** — a Leitner 5-box scheduler with Again / Hard / Good / Easy self-grading. Weaker letters return sooner; progress is saved in the browser (`localStorage`).
- **Two study directions** — glyph → name or name → glyph, toggled at any time.
- **Cram mode** — review all 22 letters with no effect on the schedule.
- **Light / dark theme** — a parchment light theme and a dark theme; the choice persists and glyphs invert automatically.
- **Keyboard + touch** — swipe left/right to navigate, with full keyboard parity.
- **Offline-friendly assets, installable** — a web manifest with SVG icons (add-to-home-screen). Not a full offline PWA — there is no service worker.

### Keyboard shortcuts

| Key                                 | Action                                         |
| ----------------------------------- | ---------------------------------------------- |
| <kbd>Space</kbd> / <kbd>Enter</kbd> | Flip the card                                  |
| <kbd>←</kbd> / <kbd>→</kbd>         | Previous / next card                           |
| <kbd>1</kbd>–<kbd>4</kbd>           | Grade (after flip): Again / Hard / Good / Easy |
| <kbd>S</kbd>                        | Shuffle the remaining cards                    |
| <kbd>T</kbd>                        | Toggle study direction                         |

## Tech stack

Vite 8 · React 19 (with the React Compiler) · TypeScript 6 · ESLint 9 (flat config) · Prettier · Vercel. No runtime dependencies beyond React; styling is plain co-located CSS with custom properties — no CSS-in-JS, no UI framework.

## Getting started

Requires Node `>=20 <23`.

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
```

### Scripts

| Script                            | Description                                       |
| --------------------------------- | ------------------------------------------------- |
| `npm run dev`                     | Start the Vite dev server                         |
| `npm run build`                   | Type-check (`tsc --noEmit`) then build to `dist/` |
| `npm run preview`                 | Serve the production build locally                |
| `npm run typecheck`               | Type-check only                                   |
| `npm run lint` / `lint:fix`       | Lint (and auto-fix)                               |
| `npm run format` / `format:check` | Format with Prettier                              |
| `npm run deploy`                  | Deploy to Vercel (`vercel --prod`)                |

## Project structure

```
src/
  main.tsx               App entry; mounts <App>
  app.tsx                Root component
  index.css              Global reset + light/dark theme tokens
  config/app-config.ts   Leitner intervals, swipe threshold, storage keys
  types/                 LetterCard, GlyphShape, SRS types
  data/
    letters.ts           The 22 letters (id, name, Hebrew char, glyph id)
    glyphs.ts            Hand-traced glyph geometry, keyed by glyph id
  hooks/
    use-srs-deck.ts      Deck/session state: queue, grading, persistence
    use-theme.ts         Light/dark theme state
    use-swipe.ts         Pointer-based swipe detection
    use-local-storage.ts / use-media-query.ts
  components/            FlashCard, CardFace, Glyph, GradeButtons, NavControls,
                         ProgressBar, ThemeToggle, TopBar, AboutModal,
                         SessionComplete, StudyScreen (one .css file each)
  utils/                 srs-scheduler (pure Leitner logic), shuffle, storage, cn
```

### How the glyphs work

Each glyph is geometry on a normalized 0–100 grid:

```ts
interface GlyphShape {
  id: string;
  viewBox: 100;
  segments?: { from: Point; to: Point }[]; // straight runs
  paths?: string[]; // SVG `d` strings for curves
  dots?: { at: Point; r?: number }[]; // open circles
}
```

A single [`<Glyph>`](src/components/glyph.tsx) component renders them as inline SVG. Strokes use `currentColor`, so glyphs follow the text color (and therefore the theme); dots are filled with the card background to read as open circles.

> **Note on accuracy:** the glyph coordinates in [`src/data/glyphs.ts`](src/data/glyphs.ts) are a careful **first-pass tracing** from a source manuscript, not an authoritative reproduction. They are easy to adjust — edit the segment/path/dot coordinates and check the result in the browser.

### Spaced repetition

Scheduling lives in [`src/utils/srs-scheduler.ts`](src/utils/srs-scheduler.ts) as pure functions (a `now` timestamp is always passed in, so they're deterministic). Each card has a Leitner box (1–5); a grade moves it between boxes, and the next due time comes from the per-box intervals in [`app-config.ts`](src/config/app-config.ts):

| Box | Next due                       |
| --- | ------------------------------ |
| 1   | ~10 min (relearn this session) |
| 2   | 1 day                          |
| 3   | 3 days                         |
| 4   | 7 days                         |
| 5   | 16 days                        |

State persists under `localStorage` key `malachim.srs.v1`; the theme under `malachim.theme.v1`. Use **Reset progress** in the header to clear scheduling.

## Theming

Themes are CSS custom properties on `:root` / `[data-theme='light']` in [`index.css`](src/index.css). `useTheme` sets `data-theme` on `<html>`; a tiny inline script in [`index.html`](index.html) applies the saved theme before first paint to avoid a flash.

## Deployment

Built as a static site (`npm run build` → `dist/`) and deployed to Vercel (`npm run deploy`). [`vercel.json`](vercel.json) sets a long cache header for hashed `/assets/`.

## License

MIT © Kevin Mack
