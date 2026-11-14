# Formulalar laboratoriyasi

Route: `/fan/kimyo/laboratoriya`, linked from Chemistry. Signed-in users and isolated demo accounts can play.

Two trays each hold one selected element and 1–4 atoms. Selecting the same element in both trays sums the atoms. The server compares the resulting composition with a curated catalogue. Tray order is irrelevant; molecular counts are exact. Ionic entries use their simplest formula-unit ratios. Unknown compositions are labelled “not in this catalogue”, never “chemically impossible”.

Modes: free discovery, or a named target with an optional hint. Discovering a different compound still saves it, but does not complete the chosen target. Each of the 13 compounds can be opened once per account; `LabDiscovery(userId, recipeId)` is unique. No XP or coins are awarded by this game. Submitted counts are validated server-side. Failed requests retain the selected elements and counts.

Content lives in `src/lib/chemistry/content.ts`; evaluation and persistence are separate modules. The UI receives challenge names/hints and already discovered formula cards. The app does not claim that arbitrary elemental substances react spontaneously when mixed, and supplies no practical synthesis instructions.

References used for the formula model:

- [OpenStax, Chemical Formulas](https://openstax.org/books/chemistry-2e/pages/2-4-chemical-formulas): molecular and empirical formulas, diatomic elements, H₂O versus H₂O₂.
- [Royal Society of Chemistry, Periodic Table](https://periodic-table.rsc.org/): element symbols and properties.
- [RSC, Sodium](https://periodic-table.rsc.org/element/11/sodium): sodium chloride (NaCl).

Tests: `tests/chemistry.test.ts` checks every recipe in either tray order, molecular count distinctions, same-element aggregation, invalid input, unsupported pairs, and database idempotence/isolation. `scripts/lab-browser-check.cjs` checks the actual discovery flow and refresh at mobile size.

Prisma client generates into `node_modules/@memoryx/prisma-client`. Imports use that package name and `next.config.ts` lists it in `serverExternalPackages`, so both development and production load the native runtime through Node rather than bundling its CommonJS globals with Turbopack. Run `npm run db:generate` after migrations; `postinstall` generates it for a fresh installation. No existing records are reset.
