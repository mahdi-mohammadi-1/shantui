# Homepage showroom revision — promt2

This implements the visual revision requested in `promt2.txt`. It builds on the completed strategy, reference and live-site research without repeating them. Original research files remain unchanged. The original homepage source is retained in `docs/prototype-review/source-v1/`.

## Creative direction

**A machinery showroom with industrial presence.** Large manufacturer machine cutouts, condensed display typography, charcoal stages, restrained orange actions and quieter pale catalog surfaces give the homepage a stronger product focus. The hero's machine overlaps its stage graphics; support panels overlap the component photograph; application imagery uses staggered heights; the company section uses a subdued working-machine photograph; a large final invitation and footer complete the page.

The main hierarchy remains equipment discovery → sample models → parts/service → applications → global/local company context → quote. No invented project gallery, delivery record, market statistic, specification, stock claim or local service promise was added.

## Showroom interactions

- Three manually selected hero machine categories, with an explicit active indicator and next-category control. Category actions lead to the corresponding model selection. There is no automatic rotation.
- Six category tiles, a category filter bar that stays below the header while browsing models, and live search across model names, English/Dari category names and the current language's applications.
- Larger product stages, visible availability text, separate model and quote actions, and a comparison selector on each card.
- A two-to-three-machine comparison tray. Selections remain when searching, filtering or changing language. The comparison table includes only known identity/category/application data and honest availability/specification placeholders. Each machine retains its identity when requesting a quote.
- Product previews include a user-controlled image enlargement, manufacturer source link, specification-sheet request and parts request.
- Existing request validation, preview/edit behavior and no-delivery boundary remain intact. Missing brochures remain request actions; there are no fake download links.

## Motion language

| Interaction | Behavior | Duration |
|---|---|---|
| Hero copy entrance | Short upward movement and opacity; a small sequence across eyebrow, heading and supporting actions | 650–800 ms, delay at most 200 ms |
| Hero machine/category change | Opacity and a controlled 28px entrance with a slight scale change | 850 ms |
| Hero machine hover | At most 7px lift and 2.5% enlargement | 650 ms |
| Scroll reveal | Selected major section containers reveal once, translating 24px; content is visible without motion setup | 650 ms |
| Category/card hover | Small lift/scale, edge color and arrow emphasis; no layout reflow | 250–650 ms |
| Filter transition | New cards enter with a 13px translation and opacity, 45ms stagger | 450 ms per card |
| Navigation | Active section underline and selected hero category indicator | 160–400 ms |
| Model image zoom | Explicit button toggles 1.45× magnification within the image stage | 400 ms |
| Comparison tray | One brief entrance when selections begin | 300 ms |
| Reduced motion | No entrance/reveal/hover movement or smooth scrolling; content stays visible and controls remain functional. Explicit image enlargement still works instantly. | Immediate |

No animation library, perpetual animation loop, autoplay video, scroll hijacking or animated business counters were introduced. Transforms and opacity handle the principal motion. The motion preference is observed for changes during the session.

## Typography, imagery and integrity

Dari has independent font sizing and line-height, with RTL controls and isolated Latin model names. Images are never mirrored. Large hero assets are WebP encodings of the existing 940×500 manufacturer category images, not generated model photographs. They load responsively; only the selected hero category's large image is requested. Source provenance remains in `docs/prototype-assets/sources.json`; derived dimensions/bytes are in `showroom-optimized.json`.

These remain category illustrations for a clearly labeled sample catalog. Exact model imagery, specifications, stock and brochures still need approved local content. English and Dari presentation copy lives in `src/data/showroom.js`, with the shared translations and catalog kept separate.

## Review evidence

`npm run test:ui` now saves its report and screenshots in `docs/showroom-review/`. It checks both languages at 320, 390, 768, 1024 and 1440px; images and runtime errors; all existing request flows; category and model search; empty results; comparison limits and quote handoffs; mobile RTL table scrolling; image zoom; normal motion; live reduced-motion changes; and missing-image resilience.

Desktop and mobile hero, full-page compositions, model dialogs, comparison tables and the mobile shortlist were reviewed visually. A caption collision in the desktop Dari hero was corrected by giving the image and category caption separate layout rows. The enlarged hero imagery was re-encoded from its native source to improve sharpness. The implementation remains a local frontend prototype, with no external request delivery or deployment.
