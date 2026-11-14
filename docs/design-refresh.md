# MEMORYX design refresh

The current interface uses a charcoal frame and icon rail around an off-white workspace, both sitting on the same pale sky-blue page background (`--outer`) in either theme — only the frame and workspace change between light and dark, so the outer colour stays the constant that frames the app. Chemistry and biology use separate pastel course cards, while a compact lesson list and a dark next-lesson panel support everyday navigation. The style takes inspiration from rounded educational dashboards without copying their layout or sample content. The shared stylesheet uses semantic colours for both themes, responsive profile fields, and Lucide React icons. User preferences persist in `memoryx-locale` and `memoryx-theme` cookies and are applied during server rendering. Light is the default theme; users can switch to dark.

Translations are in `src/lib/i18n/messages.json` (interface) and `src/lib/i18n/curriculum.json` (the four existing lessons, flashcards, questions, explanations, and exercises). Each key is the original Uzbek text; each value contains Russian and English translations. Add translations here when introducing new content. User-written nicknames are preserved. Exercise answers accept the authored Uzbek, Russian, and English equivalents; quiz grading remains on the server.

Outfit is self-hosted at `public/fonts/outfit.woff2`. Noto Sans provides Cyrillic fallback at `public/fonts/noto-sans-cyrillic.woff2`. Their OFL licences are stored alongside the fonts.

## Language picker

The language control is a bordered pill that matches the header nav pill and the theme toggle: 37px tall, 10px radius, surface background, and the shared yellow hover. Its chevron is a CSS mask filled with `currentColor`, so it follows the text colour in both themes instead of carrying a baked-in stroke colour. Where `appearance: base-select` is available the dropdown reuses the project card styling — bordered rounded panel, yellow selected row, coral `::checkmark` — and elsewhere it falls back to a native list with surface colours. On mobile the icon is dropped and the pill shrinks to 34px.

## Scrollbars

Scrollbars follow the same design language: a 12px track with no arrow buttons and a pill-shaped thumb in the charcoal frame colour (`--rail`), lightened on hover (`--rail-hover`). Both tokens are redefined for the dark theme. `scrollbar-gutter: stable` on `html` keeps the layout from shifting between short and long pages. Firefox and other engines without `::-webkit-scrollbar` fall back to `scrollbar-width`/`scrollbar-color` through an `@supports not selector(::-webkit-scrollbar)` block. The `base-select` dropdown uses the lighter `--thumb` pair; it cannot use `::-webkit-scrollbar` because `::picker(select)` may not be combined with it.

## Illustration

Generated with the built-in imagegen tool. The original is `public/images/science-3d.png`; the site uses the optimised, transparent `public/images/science-3d.webp` (158 KB). No external stock images or Pinterest assets are embedded.

Final generation prompt:

> Create a premium 3D science illustration for the background of MEMORYX chemistry and biology learning website. Transparent background. Single cohesive floating composition: a glossy translucent cyan blue Erlenmeyer flask with blue liquid, a lavender and violet ball-and-stick molecule, a small orbital atom, and a few tiny floating spheres. Soft rounded friendly educational 3D clay/glass style, polished highlights, soft ambient shadows. Cool periwinkle, blue, lilac palette with tiny warm amber accent. Objects clustered diagonally with generous transparent gaps; no text, no labels, no watermark, no rectangular backdrop. High quality website decorative asset that works on both midnight navy and pale lavender backgrounds. Save generated asset for use in local website.

## Verification

- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run test:e2e`
- `node scripts/design-qa.cjs` (requires the development server on port 3000)
- `npm run build`

The design check covers all three languages and both themes, preference persistence, mobile overflow, profile saving, translated lessons and flashcards, quiz submission, and English/Russian exercise answers. Screenshots are saved under `.artifacts/`.
