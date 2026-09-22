# Master direction — 22 September 2026

The master protocol supersedes earlier visual directions. Existing global research and source-tagged sample catalog are retained.

## Alternatives evaluated

1. Cinematic industrial: full-bleed environmental photograph, large headline over quiet gradient. Strong scale, but available imagery has fixed text space and crops poorly in RTL.
2. Automotive editorial: pale expansive stage, oversized category lettering behind an isolated machine, compact editorial introduction above. Strong product clarity and flexible RTL; selected for the homepage showroom.
3. Global manufacturer flagship: compact technical navigation, structured dark product stages and application photography. Strong discovery and credibility; selected for navigation and interior pages.

Combine the editorial machine stage with disciplined manufacturer navigation. Avoid excessive outlined boxes, decorative ribbons and catalog duplication on Home. Each preview leads to its own dedicated route. Existing cutouts are category reference imagery, never exact-model claims.

## Architecture

Retain existing /en-af/ and /fa-af/ routes, browser history and deep links; the current router is small and adequate for this finite static site. Preserve equipment/category/model, parts, service, applications/industry, company, contact, quote, downloads, availability and privacy routes. Add applications to primary navigation and explicit Home access via logo. Keep the full catalog/search/comparison on Equipment.

## Styling and gates

Tailwind v4 Vite plugin is the primary system for new/rebuilt components. Existing CSS remains temporarily for sections not yet migrated and existing dialogs. New components must not depend on legacy presentation selectors. Capture every major change at 1440, 1024, 768 and 390 in both languages. Review screenshots and interactions before advancing.

## Launch boundaries

No invented local office, distributor status, availability, model specifications, brochures or backend submission. The site remains noindex until business approval and real inquiry delivery are configured. Production URLs must be configured before absolute canonical/hreflang/sitemap output.
