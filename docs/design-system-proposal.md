# SHANTUI Afghanistan — design system proposal

Status: provisional design specification for approval. Date: 20 September 2026, America/Los_Angeles. Companion: [design research](design-research.md). No production styles, React components or prototype UI have been implemented.

## System principles

Direction: **Industrial confidence, local support.** Machine imagery provides scale; consistent alignment, readable technical information and direct actions provide confidence. The same system supports English LTR and Afghanistan Dari RTL with intentional differences in typography and composition.

Use a small set of semantic tokens. Components consume purpose-based values such as `text.primary` and `action.primary.surface`, rather than choosing new colors or spacing per page. Values below are a proposed project system, not official SHANTUI brand standards.

## 1. Brand and logo

The only supplied identity asset is [logo.png](../refrencess/logo.png). Preserve its colors, aspect ratio and white canvas. Do not redraw the wordmark, replace its type, add shadows, recolor it or embed “Afghanistan” into the logo. Use a separate locale-aware country descriptor.

Prototype display width: approximately 160–180 px desktop and 132–144 px mobile, subject to raster sharpness. Keep at least half the visible letter height of clear space around the mark as a **temporary layout rule**, superseded by a brand guide. Do not invent an inverse mark for dark sections: retain the supplied mark on a clean white plate until an approved inverse asset exists. Request vector/source assets before public launch.

## 2. Color system

### Core tokens

| Token | Proposed value | Use |
|---|---|---|
| `surface.base` | `#FFFFFF` | Main page and product surfaces |
| `surface.subtle` | `#F3F4F4` | Catalog image stages, specification groups |
| `surface.dark` | `#171A1C` | Hero copy panel, major support section, footer |
| `surface.darkRaised` | `#262B2F` | Secondary controls inside dark regions |
| `text.primary` | `#171A1C` | Headings, main body, text on primary orange |
| `text.secondary` | `#60666B` | Supporting copy on white |
| `text.inverse` | `#FFFFFF` | Copy on charcoal |
| `text.inverseSecondary` | `#D9DEE1` | Supporting text on charcoal |
| `accent.brandProvisional` | `#F56600` | Primary action surface, selected markers, short accent rules |
| `accent.ink` | `#B84400` | Underlined links and emphasis on white |
| `border.decorative` | `#D9DEE1` | Nonessential dividers and card separators |
| `border.control` | `#747D84` | Input/control boundaries on white |
| `focus` | `#005FCC` | Keyboard outline on light surfaces |
| `error.ink` | `#A82020` | Error text and icon on white |
| `error.surface` | `#FCECEC` | Error message container; verify pair in prototype |

Bright orange is an accent, not a universal text color. Avoid large orange page backgrounds. No gradients in normal UI; if an image needs text protection, use a solid copy panel instead of an elaborate overlay.

### Contrast decisions

Calculated locally using the WCAG relative-luminance formula for opaque sRGB pairs; rounded to two decimals. These validate token pairs, not whole-page compliance.

| Foreground / background | Ratio | Decision |
|---|---:|---|
| `#171A1C` / `#FFFFFF` | 17.49:1 | Main copy |
| `#60666B` / `#FFFFFF` | 5.82:1 | Normal supporting text |
| `#171A1C` / `#F56600` | 5.65:1 | Primary-button label |
| `#FFFFFF` / `#F56600` | 3.10:1 | Do not use for normal-size button labels |
| `#B84400` / `#FFFFFF` | 5.43:1 | Normal-size orange text link |
| `#747D84` / `#FFFFFF` | 4.19:1 | Control boundary; not normal-size body text |
| `#17633D` / `#EAF4ED` | 6.46:1 | Confirmed stock badge |
| `#7A4B00` / `#FFF3D6` | 6.72:1 | Incoming badge |
| `#235B85` / `#EAF2F8` | 6.38:1 | Order badge |

Normal text requires at least 4.5:1; large text at least 3:1; meaningful control boundaries/icons at least 3:1 against adjacent colors. Recheck actual focus, hover, image overlays and disabled-state clarity when rendered. [WCAG 2.2 reference](https://www.w3.org/WAI/WCAG22/quickref/).

## 3. Typography system

English display: **Barlow Semi Condensed**, weight 600 or 700. English body/UI: native system sans-serif (`system-ui`, Segoe UI, Arial, sans-serif). Dari: **Noto Sans Arabic**, weights 400 and 600/700 as needed, with Tahoma/Arial fallback. These are proposed families; verify license, font-file size and actual Dari shaping before shipping. [Barlow](https://fonts.google.com/specimen/Barlow+Semi+Condensed), [Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic).

Use a 16 px root and rem-based scalable type. Sizes are role-specific, with bounded fluid growth between narrow and wide layouts. Do not reduce body text to accommodate a crowded design.

| Role | English desktop / mobile | Dari desktop / mobile | Weight and line height |
|---|---|---|---|
| Hero display | 64 / 36 px | 52 / 32 px | EN 700, 1.05–1.12; Dari 700, 1.5 |
| Page title | 48 / 32 px | 40 / 30 px | 700; EN 1.15, Dari 1.5 |
| Section title | 40 / 28 px | 34 / 26 px | 600–700; EN 1.2, Dari 1.55 |
| Card/model title | 24 / 22 px | 24 / 22 px | 600; EN 1.25, Dari 1.6 |
| Intro paragraph | 20 / 18 px | 20 / 18 px | 400; EN 1.6, Dari 1.85 |
| Body, labels, inputs | 16 px | 17 px | 400 body, 600 labels; EN 1.6, Dari 1.85 |
| Supporting metadata | 14 px | 15 px | 400; EN 1.5, Dari 1.8 |
| Buttons/navigation | 16 px | 16–17 px | 600; natural content height, no clipping |
| Technical values/model codes | 16–20 px Latin | 16–20 px isolated Latin | 500–600, tabular numerals where available |

Use one H1 per page. Body measures: around 60–70 Latin characters and a visually tested 42–55 Dari characters. Headings should describe a concrete category, service or task. Avoid uppercase paragraphs; model names retain official casing. English display may use slight negative tracking, no more than -0.02em. Dari tracking remains normal; no forced uppercase, letter spacing or decorative elongation.

Allow multi-line Dari navigation items in expanded menus. Keep full model suffixes readable; never truncate the distinguishing part of a code. Product-card titles may wrap, with Latin model code kept together when feasible.

## 4. Spacing, grid and containers

The system uses a 4 px base, with larger increments following an 8 px rhythm. Token set: **4, 8, 12, 16, 24, 32, 48, 64, 80, 96 px**. Four pixels is for icon/text microspacing; 16–24 for component padding; 48–96 for section separation. Do not scatter arbitrary spacer values across pages.

| Layout | Content arrangement | Outer gutters / grid gap |
|---|---|---|
| Under 640 px | Four-column alignment grid; categories span two, detailed cards span four | 16 px gutters; 16 px gap |
| 640–1023 px | Eight-column grid; categories typically two or three per row, models two | 24 px gutters; 24 px gap |
| 1024–1279 px | Twelve-column content grid; header remains compact if labels do not fit | 32 px gutters; 24 px gap |
| 1280 px and above | Twelve columns; full desktop header; models three, categories three or six where readable | At least 40 px gutters; 24 px gap |

Maximum normal content width: **1280 px**, centered. Reading content: **720 px** maximum. Forms: **640 px** maximum. Full-width background bands contain the same aligned content container. At 1440 px, a 1280 px container leaves 80 px margins and makes a three-model grid readable. Avoid stretching text on ultrawide displays.

Section vertical padding: 48 px mobile, 64 px tablet, 80–96 px desktop. Heading-to-content: 24 px mobile, 32 px desktop. Card padding: 16 px mobile, 24 px desktop. Related label/helper text: 4–8 px apart; separate form fields by 24 px.

Breakpoints are initial layout rules, not device promises. Header collapse follows content fit in both languages; never shrink labels to force the desktop menu. Validate intermediate widths and 200% zoom.

## 5. Borders, radius, elevation and icons

Default radius: 4 px for buttons, inputs and model cards; 2 px for status labels; 0 px for section panels and editorial image edges. Full circles only for inherently circular controls such as an avatar or close button, not every CTA. Use a 1 px border for cards and tables.

No default card shadow. A proposed overlay shadow, `0 8px 24px rgba(23,26,28,0.12)`, is reserved for menus/dialogs. Elevation communicates layering; it is not decoration.

Use one consistent outline SVG icon set in the later prototype: 20 px inline, 24 px controls, approximately 1.75–2 px stroke. Do not add an icon library until needed. Icons accompany clear labels for contact, download and availability. Decorative icons are hidden from assistive technology. Icon-only controls receive accessible names and a 48×48 px hit area. Avoid emoji in product/service UI.

## 6. Button and link system

| Variant | Appearance | Typical task |
|---|---|---|
| Primary | Provisional orange fill, charcoal label, 4 px radius | Quote; parts request; service request |
| Secondary on light | White fill, charcoal label and visible border | View equipment; brochure |
| Secondary on dark | Charcoal fill, white label and light border | View support details |
| Text link on light | Dark orange, underline with offset | Technical consultation; all categories |
| Text link on dark | White underlined text | Secondary footer/support links |

Minimum normal control height 48 px, large primary 52–56 px. Horizontal padding 24 px, icon gap 8 px. Heights are minimums: Dari or zoomed text may expand. Full width for main mobile form actions; avoid two cramped buttons side by side at 320 px.

Default/hover/pressed/focus/loading/disabled are distinct. Hover may add a stronger border or subtle inset treatment without changing label contrast; no bouncing/scaling. Keyboard focus uses a 3 px outline with 2 px offset; dark/image surfaces use a contrasting light outer ring plus dark separation. Loading preserves label context and button width. Disabled controls need an explanation when the reason is not obvious.

Links navigate; buttons change state or submit. A brochure opens/downloads a file and states its type; WhatsApp links explicitly say WhatsApp. Opening chat must not be labelled “Download.” Avoid whole-card clickable containers with nested interactive buttons: the model title/image link and secondary actions have separate clear targets.

CTA density: one primary action per decision area. When mobile sticky quote is visible, an in-view duplicate quote action can remain secondary or the sticky bar can temporarily hide. Do not display competing filled Quote, Call, WhatsApp and Download buttons together.

## 7. Cards and product components

### Category tile

Light neutral image stage, correctly identified machine, category label and a directional arrow. No speculative model count. Approximately 4:3 image region; contain the machine with 12–16 px minimum inner room so booms, buckets and tracks remain intact. Categories can be two columns on mobile because little copy is required.

### Product model card

Consistent sequence: 4:3 contained image → category overline → official model name → text/icon availability badge → two or three source-backed facts → “View model.” Body padding 24 px desktop and 16 px mobile. Keep card content aligned by structure, not by clipping long translated text.

Category-specific fact choices: excavator operating weight/power/bucket; loader rated load/bucket/power; bulldozer operating weight/power/blade; grader power/blade/weight; compactor operating weight/drum width/power; mining truck payload/body/power. These are field choices only, not supplied technical values. Each must match the actual model/configuration source.

Prototype fixtures must show a persistent sample-data context and explicit per-card sample availability when demonstrating stock. Missing production specs are omitted; review fixtures can use “Specification pending verification.” Never use random plausible numbers, zero-valued placeholders or mismatched model photographs.

### Model detail

Desktop: seven-column gallery and five-column summary. Mobile: breadcrumb/title, image, local status, facts and quote; then remaining sections. Model ID and source are shared with quote, parts and service journeys. Gallery thumbnails are buttons with labels; video requires explicit activation. Offer a static first image when enhanced gallery behavior fails.

Specifications appear in HTML. Source/configuration information and brochure revision sit near the table. Similar models are chosen by category and application, maximum three initially. Avoid an automatic recommendation claim without meaningful data.

### Support and editorial cards

Parts and service use two equal large panels on desktop, stacked on phones, with one task heading, short explanation and a single primary action. Application cards use 3:2 imagery, a clear industry title and relevant category links. News/project cards add actual date, location where verified and content type. No star ratings, counters or customer logos by default.

## 8. Availability status system

| Data state | English / draft Dari | Color and symbol | Evidence required |
|---|---|---|---|
| `in_stock` | Available in Afghanistan / موجود در افغانستان | Green `#17633D` on `#EAF4ED`, check icon | Confirmed local stock and current verification |
| `incoming` | Incoming / در راه | Brown `#7A4B00` on `#FFF3D6`, transit icon | Confirmed inbound supply; date only if approved |
| `available_to_order` | Available to Order / قابل سفارش | Blue `#235B85` on `#EAF2F8`, order icon | Sales-approved orderability |
| `contact` | Contact for Availability / برای معلومات موجودی تماس بگیرید | Charcoal on pale gray, information icon | Default for unknown/unverified/expired status |

Badges have 4×8 px internal padding and allow wrapping; the long Dari fallback may appear as a full-width metadata line. Status is always text plus icon, never color alone. Show last-verified date on stock/detail pages. Treat stock expiry as a content rule: expired positive status falls back to contact. Do not imply reservation, delivery date or regional coverage from the badge.

## 9. Forms and request states

Visible labels above controls, supporting text underneath, required/optional status expressed in words where useful. Placeholders illustrate format but never replace labels. Inputs use 16 px or larger text and 48 px minimum height, 12–16 px padding, 1 px control border. Textarea starts at roughly four lines and can grow. Use native controls where they are effective.

### Form contracts

| Request | Initial required information | Optional/progressive detail |
|---|---|---|
| Quote | Name, phone, province, model/category or “Help me choose” | Company, email, project, purchase timing, message, contact preference |
| Parts | Name, phone, location, description | Model, PIN, part/engine number, quantity, urgency, photo; allow identifiers unknown |
| Service | Name, phone, location, issue, stopped/not-stopped/unknown | Model, PIN, machine hours, photo, contact preference |

Show relevant model context above the form, editable without losing contact fields. Do not make both phone and email compulsory. Labels for identifiers remain understandable in Dari while code entry stays LTR. Accept Persian/Arabic-Indic digits for human-entered quantities/phone where applicable, normalize validation gently, and preserve the entered value for correction. Do not enforce an invented Afghanistan phone pattern.

Errors appear near the field with icon/text; a summary links to invalid fields on submit. Validate obvious problems after interaction, not on every keystroke. Retain entered information on recoverable failures. Do not persist personal information in local storage by default. Add privacy explanation before any real request handling; marketing permission must be separate and unchecked.

| State | Required behavior |
|---|---|
| Empty | Explain task and minimum information |
| Prefilled | Show exact selected model and editable context |
| Invalid | Explain correction without clearing entries |
| Sending | Disable duplicate submission, communicate progress accessibly |
| Delivered | Only after actual acknowledged integration response; show real next step/reference if available |
| Failure/offline | State that delivery is unconfirmed; retry and verified alternate contact |
| Prototype review | “Demo request — nothing sent”; no outbound message, fake case ID or success promise |

For optional photo selection, propose JPG/PNG/WebP, maximum three images and 5 MB each, to be confirmed during implementation. Show size/type guidance before selection, preview/remove, and an accessible error. A prototype previews locally only. File limits are product decisions, not a claim that an upload service exists.

## 10. Navigation, search and language switch

Wide header at approximately 1280 px and above: white brand row, Equipment, Availability, Spare Parts, Service, Company, and primary Quote. Utility row contains verified contact and language choices; omit nonexistent details. Main row approximately 80 px high, utility approximately 32 px. These heights can expand for zoom without clipping.

Compact header: roughly 64 px minimum with logo, language action and labelled menu control. Do not squeeze five links into a tablet header. Expanded menu prioritizes Equipment, Availability, Parts, Service, Quote, then Company/Contact and Downloads. Disclosure buttons expose child links and announce expanded state. Escape closes an overlay, focus returns to its trigger, and background controls are inaccessible while a modal drawer is open.

Desktop product menu uses click/focus support and a clear “All equipment” link. Do not require precise pointer paths through nested hover menus. Show application entry links separately from equipment types.

Search belongs on the catalog initially. It matches model names and localized category aliases, preserves official code display, and returns helpful “No matching model” guidance with a consultation route. Results count reflects filtered data. Avoid site-wide empty search until there is enough content.

Language choice uses **دری / English**, no flags. Switch to the equivalent route, preserve product context, and set language and direction immediately. If content is unavailable in the other locale, explain and offer the nearest useful page. Never relabel Iranian Persian copy as Dari without review.

## 11. Tabs, filters, accordions and specification tables

Product details initially use in-page section links—Overview, Specifications, Downloads, Support—rather than hiding core information in tabs. If interactive tabs are later used, provide tab/tabpanel relationships, arrow-key navigation, active styling beyond color and readable fallback content. On narrow screens, wrap section links or use a labelled horizontal scroll region without hiding focus.

Mobile filters open a dedicated sheet with explicit Apply and Clear actions, a visible result count and a close control. Preserve choices when opening a model and returning. Only show filters supported by verified data; do not fabricate ranges.

Accordions suit secondary FAQs and grouped mobile footer links. Their headings contain real buttons with expanded state. Important quote/contact information remains visible. Permit keyboard operation and retain logical document order.

Technical tables: 16 px minimum values, 12–16 px cell padding, subtle group backgrounds and 1 px separators. Use a caption, proper row/column headers and actual units. Two-column label/value tables wrap; complex multi-configuration tables scroll within their own region with a visible scrolling hint. Numeric values/model codes remain LTR in Dari. Never stack rows in a way that loses which value belongs to which configuration.

## 12. Photography and image ratios

| Use | Proposed ratio / fit | Rules |
|---|---|---|
| Desktop hero image region | Approximately 4:3 within a wide split composition | Machine should occupy most of the image; keep working context |
| Mobile hero | Dedicated 4:3 crop | Do not squeeze a wide banner; show the complete recognizable machine |
| Category / product stage | 4:3, contain | Neutral surface, consistent scale, protect boom/bucket/track edges |
| Application / project story | 3:2, cover | Focal point set per image; real context only |
| Workshop / team editorial | 4:3 or 3:2 | Verified local image and permission |
| News thumbnail | 3:2 | Honest image/caption relationship |
| Brochure preview | Actual document aspect ratio | Decorative preview optional; file metadata is essential |

Different photo crops may be chosen for RTL/LTR, but machines, decals and logos must never be mirrored. Avoid compositing a branded machine into a fabricated Afghanistan site and presenting it as real evidence. If a prototype uses an illustrative scene, label its temporary nature visibly in review mode.

Define intrinsic dimensions to reserve space. Provide responsive sources at appropriate widths rather than sending the original everywhere. The hero loads immediately; lower images load lazily. Alt text describes meaningful subject/model/action, and never invents a location. Decorative duplicates have empty alt text.

## 13. Footer and contact patterns

Charcoal footer with a restrained brand plate and four logical groups on desktop: Equipment, Parts & Service, Company & Resources, Contact. Contact distinguishes sales, parts and technical service where confirmed. Include verified hours/time zone and accessible phone/email links. Address/map appears only after confirmation; external directions link precedes any optional map embed.

On mobile, keep direct contact and quote visible, with secondary link groups in accessible accordions. Place Privacy, Terms and locale choice at the bottom. No fabricated social handles, mandatory newsletter or badges. Use company-approved copyright/legal identity.

## 14. Responsive and motion rules

| Width | Categories | Model cards | Support | Hero / navigation |
|---|---:|---:|---|---|
| 320–639 px | 2 columns; 1 if labels need room | 1 | Stacked | Copy/actions then image; compact menu |
| 640–1023 px | 2–3 | 2 | Stacked or 2 if copy fits | Compact navigation; hero split only if readable |
| 1024–1279 px | 3 | 3 | 2 | Split hero; compact header as needed |
| 1280 px+ | 3 or 6 compact tiles | 3 | 2 | Full navigation and aligned split hero |

Cards and forms grow with content; avoid fixed heights for translated copy. Reserve space for any sticky bottom action bar plus safe area. Set section-anchor offsets for a sticky header. Test portrait/landscape, text zoom and virtual keyboard visibility.

Motion is limited to clear state feedback around 120–180 ms. Menus may transition opacity/position gently, with no dependency on animation for function. Honor reduced motion by removing transitions and smooth scrolling. No parallax, autoplay video, looping marquees or animated business counters.

## 15. RTL and mixed-script rules

Set page language to `fa-AF` and direction to RTL; English uses `en-AF` and LTR. Use logical start/end alignment and spacing in implementation. Visual reordering must preserve semantic reading and keyboard order.

| Element | RTL rule |
|---|---|
| Header and menu | Align to locale reading order; verify longer Dari labels independently |
| Hero | Right-aligned Dari copy; choose image placement/crop intentionally, not through a global flip |
| Breadcrumbs / next-back arrows | Reverse directional progression while keeping model names intact |
| Logo, photos, phone/download icons | Never mirror |
| Model codes, engines, phone/email, units | Isolate as LTR; preserve punctuation and suffixes |
| Dynamic user names/messages | Direction-auto isolation where appropriate |
| Inputs | Label direction matches locale; phone, email, PIN and code entry are LTR |
| Technical table | Labels on reading-start side; values remain coherent isolated runs |
| Numbers | Dari prose may use local digits; technical values retain source notation; avoid broad string replacement |
| Errors/status announcements | Fully localized and associated with their controls |

Use semantic direction attributes and bidi isolation rather than sprinkling invisible Unicode control characters throughout translated strings. [W3C inline bidirectional markup](https://www.w3.org/International/articles/inline-bidi-markup/).

Representative copy for native-editor/visual testing: `مدل SD22`, `پرزه‌جات برای SE220LC`, `انجن Weichai`, and dimensions/units copied from a verified model source. Test hyphens, decimal points, `m³`, slashes and telephone plus signs in surrounding Dari text. Numeric examples used to test layout must be explicitly labelled test strings, not product data.

## 16. Content contracts and integration boundary

Future components consume structured product, availability, asset, document, localized-copy and contact records. Model/configuration identity is separate from translation. Global specifications are separate from Afghanistan inventory. Every publishable factual record has source, review state and owner.

Proposed component inventory for later implementation: SiteHeader, LanguageSwitch, ProductNavigation, Hero, CategoryTile, ProductCard, AvailabilityBadge, SupportPanel, ApplicationCard, SpecificationTable, DocumentLink, QuoteForm, PartsRequestForm, ServiceRequestForm, ContactDirectory and SiteFooter. This list is a design contract; components have not been written.

Sample records live separately from approved content. A development content provider supplies fixtures; a later CMS/API adapter can replace it. Empty, loading, error, no-results, unavailable-image and stale-stock states must be designed without turning unknown values into facts. Unknown contacts/documents do not produce active dummy URLs.

## 17. Performance and review acceptance

Initial mobile transfer budget: ≤700 KB compressed including active-locale fonts and one hero; stretch 500 KB. Initial JS ≤150 KB compressed. Hero target 120–180 KB, cards around 25–50 KB at served dimensions. Load only needed font files/weights; retain open-source license records. No remote video, map or messaging widget on initial load.

Performance targets: field LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1 at the 75th percentile. Test laboratory loading after implementation; do not call a prototype field-validated. [Web Vitals](https://web.dev/articles/vitals).

Approval-stage review accepts the direction, not final brand specifications or business facts. After approval, capture and critique the actual prototype at 390, 768 and 1440 px in both languages, plus 320 px reflow. Review the hero, category grid, model cards, support section, navigation and form states separately.

Required prototype checks: readable machinery imagery; no clipped Dari glyphs or model codes; keyboard-reachable menu and forms; visible focus; semantic labels and table headers; no horizontal page overflow; no sticky element obscuring fields; honest sample/prototype messages; source-linked technical content; no empty contact/download links; and a measured asset budget. Broaden testing when defects or integration changes justify it.

**Next stage requires the user's approval under `promt.txt`: a high-fidelity bilingual React homepage prototype, followed by desktop, tablet and mobile visual refinement.**
