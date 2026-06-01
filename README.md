# Malachim — Alphabet of the Angels

A mobile-first flash-card web app for learning the **Malachim** alphabet (the celestial "writing of the angels"): the 22 Hebrew letters paired with their Malachim glyphs.

The glyphs are drawn as inline SVG (lines + open circles), so they stay crisp at any size and adapt to the theme.

## Features

- **Flip cards** — tap, click, or press <kbd>Space</kbd>/<kbd>Enter</kbd> to reveal the answer.
- **Two modes, clearly labelled** — **Reference** keeps the 22 letters in canonical Aleph → Tav order for lookup; **Flash cards** shuffles them for recall practice. A toggle below the card shows which is active and switches between them.
- **Two study directions** — glyph → name or name → glyph, toggled at any time.
- **Light / dark theme** — a parchment light theme and a dark theme; the choice persists and glyphs invert automatically.
- **Keyboard + touch** — swipe left/right to navigate, with full keyboard parity.
- **Offline-friendly assets, installable** — a web manifest with SVG icons (add-to-home-screen). Not a full offline PWA — there is no service worker.

### Keyboard shortcuts

| Key                                 | Action                                         |
| ----------------------------------- | ---------------------------------------------- |
| <kbd>Space</kbd> / <kbd>Enter</kbd> | Flip the card                                  |
| <kbd>←</kbd> / <kbd>→</kbd>         | Previous / next card                           |
| <kbd>S</kbd>                        | Shuffle into flash-card mode (re-shuffle if already there) |
| <kbd>T</kbd>                        | Toggle study direction                         |

## Tech stack

Vite 8 · React 19 (with the React Compiler) · TypeScript 6 · ESLint 9 (flat config) · Prettier · Vercel. No runtime dependencies beyond React; styling is plain co-located CSS with custom properties — no CSS-in-JS, no UI framework.

## Getting started

Requires Node `>=20 <25`.

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
  config/app-config.ts   Deck size, swipe threshold, storage keys
  types/                 LetterCard, DeckMode, GlyphShape
  data/
    letters.ts           The 22 letters (id, name, Hebrew char, glyph id)
    glyphs.ts            Hand-traced glyph geometry, keyed by glyph id
  hooks/
    use-deck.ts          Deck state: queue, mode (reference/flashcards), persistence
    use-theme.ts         Light/dark theme state
    use-swipe.ts         Pointer-based swipe detection
    use-local-storage.ts / use-media-query.ts
  components/            FlashCard, CardFace, Glyph, ModeToggle, NavControls,
                         ProgressBar, ThemeToggle, TopBar, AboutModal,
                         StudyScreen (one .css file each)
  utils/                 shuffle, storage, cn
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

### Study modes

The deck lives in [`src/hooks/use-deck.ts`](src/hooks/use-deck.ts) and runs in one of two modes:

- **Reference** — the 22 cards in canonical Aleph → Tav order (`order` field), for looking letters up.
- **Flash cards** — the cards shuffled (a fresh [`shuffle`](src/utils/shuffle.ts) on entry and on re-shuffle), for testing recall.

Both modes hold all 22 cards and cycle forever (next/prev wrap around). The active mode and the study direction persist under `localStorage` key `malachim.prefs.v1`; the theme under `malachim.theme.v1`.

## Theming

Themes are CSS custom properties on `:root` / `[data-theme='light']` in [`index.css`](src/index.css). `useTheme` sets `data-theme` on `<html>`; a tiny inline script in [`index.html`](index.html) applies the saved theme before first paint to avoid a flash.

## Deployment

Built as a static site (`npm run build` → `dist/`) and deployed to Vercel (`npm run deploy`). [`vercel.json`](vercel.json) sets a long cache header for hashed `/assets/`.

## License

MIT © Kevin Mack
