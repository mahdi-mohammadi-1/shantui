# SHANTUI Afghanistan website prototype

Bilingual React homepage implementing the approved **Industrial confidence, local support** direction. Dari (`/fa-af/`) is the default; English is available at `/en-af/`. The header language switch remembers the choice locally.

The visual direction has been revised according to `promt2.txt`: a flagship machine hero, interactive showroom, search, comparison, layered photography and controlled motion. See [showroom direction and motion system](docs/showroom-direction.md).

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173/. For a production preview:

```sh
npm run build
npm run preview
```

The site is a frontend prototype. Quote, parts and service forms validate input and display a local preview; they do not send or persist contact information. Product models are sample fixtures, availability is unconfirmed, and specifications are omitted until verified. The site is marked `noindex`.

## Implemented

- Responsive English LTR and Afghanistan Dari RTL layouts with local fonts.
- Six equipment categories, category filtering, featured/all model selection and model dialogs.
- Manually selectable hero machines, model/application search, a three-machine comparison tray and product image enlargement.
- Sticky catalog navigation, active navigation indicators, section reveals and reduced-motion support.
- Separate quote, parts and service flows, with selected machine context and localized validation.
- Mobile navigation and sticky request actions; keyboard-accessible native dialogs.
- Optimized WebP assets, responsive machine images, lazy loading and category-image fallbacks.
- Parts/service, applications, company, documentation and contact sections.

## Content and research

- `src/data/catalog.js`: replaceable catalog provider, sample records and source URLs.
- `src/data/translations.js`: English and draft Dari copy.
- `src/main.jsx` / `src/styles.css`: interactions, layout and responsive styling.
- `src/showroom.css` / `src/data/showroom.js`: the revised showroom composition, motion language and localized presentation copy.
- `docs/design-research.md` / `docs/design-system-proposal.md`: preserved research and design decisions; their approval-stage statements describe the earlier stage.
- `docs/prototype-assets/sources.json`: manufacturer image origins and usage status.
- `docs/prototype-review/`: Chrome screenshots, automated results and completion notes.
- `docs/showroom-review/`: current revision screenshots and automated results. The previous review and source snapshot remain in `docs/prototype-review/`.

Before a public launch, supply approved local company/contact information, the actual product range and stock, matching model photographs/specifications/brochures, image publication permission, and native Dari editorial review. Live inquiry delivery requires a later integration. No site has been deployed.

## Verify

```sh
npm install --prefix .research-tools --ignore-scripts
npm run build
npm run test:ui
```

The UI script starts and stops a production preview on port 4175 and uses installed Google Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`. Set `CHROME_PATH` for another Chrome installation. Checks cover both languages at 320, 390, 768, 1024 and 1440px; assets and reflow; mobile menus; filtering; model/request context; validation including Dari numerals; focus and Escape; language persistence; and failed-image behavior. It records screenshots and `results.json` without submitting any external request.

The revised suite also covers live search, empty results, hero selection, comparison limits and quote context, mobile Dari comparison scrolling, model zoom, scroll reveals and changes to the reduced-motion preference. It currently contains 15 checks.
