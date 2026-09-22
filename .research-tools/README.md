# Local research utilities

These tools support the research documents only. They are not website implementation.

**21 September update:** `inspect-sites.mjs` now explicitly launches installed Google Chrome and stores its results in `docs/research-evidence/chrome/`. It preserves existing successful captures, accepts optional numeric ID selection, and records partial-render limits. `inspect-detail-pages.mjs` captures representative missing catalog/support/request pages; `--mobile` verifies previously unresolved mobile entry layouts. `review-captures.mjs` assembles saved evidence for local visual comparison. No form is submitted. The historical Edge-run description below is retained for context; it is superseded by the Chrome supplement in section 23 of the research document.

- `extract-pdf.mjs` reads all 18 strategy pages and extracts text and annotated URLs into `docs/research-evidence/`.
- `inspect-sites.mjs` attempts read-only desktop/mobile inspection of the first 24 main referenced sites. The recorded run failed due to browser network-access/DNS restrictions, including after an approved retry. No successful screenshots or performance measurements were obtained. Website content research used the separately available web research tool instead.
- `package-lock.json` pins locally installed PDF.js and Playwright packages. Installation used `--ignore-scripts`; no browser binaries were downloaded because Edge was already installed.

Do not treat a failed browser attempt as evidence that a public site is universally offline. Do not commit `node_modules/` or npm caches if a repository is initialized later. No form submissions or external messages are part of these tools.
