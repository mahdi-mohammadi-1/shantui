# SHANTUI Afghanistan — design research and creative direction

Status: proposed direction, awaiting design approval. Research date: 20 September 2026, America/Los_Angeles (tool logs may show 21 September UTC). Scope: research and design specification only.

**Live visual supplement completed 21 September 2026:** section 23 records the new Google Chrome inspections and supersedes the earlier browser-access limitations for the pages named there. The original PDF/reference analysis and design decisions below are preserved. The recommended direction remains unchanged; website creation awaits the user's next approval.

## 1. Executive design summary

**Recommended direction: Industrial confidence, local support.** Build a focused SHANTUI sales and support website with large machinery photography, a disciplined white-and-charcoal grid, restrained orange actions, and equally clear routes to machines, parts, and technical service. Authority should come from accurate product information, documented operations, and useful assistance.

The essential visitor sequence is: identify the machine or application → understand the model and Afghanistan availability → request a quote or speak to the appropriate team. Existing owners need an equally short path to parts and service, without going through the sales catalog.

Use one static hero, six prominent machinery categories with an expandable range, a conditional availability section, and a substantial parts/service module. Keep global credibility separate from local proof. Do not publish invented stock, warranties, distributor status, branch addresses, technical figures, or local project stories.

The next deliverable, after approval, is a bilingual React homepage prototype. This research does not approve production publication, business claims, or a final model assortment.

## 2. Strategy PDF analysis and research method

### Source coverage

Read all 18 pages of [the strategy PDF](Shantui_Afghanistan_Website_Strategy_2026.pdf). A page-labelled text extraction is retained in [research-evidence/strategy-extracted.txt](research-evidence/strategy-extracted.txt); extracted links are in [strategy-urls.json](research-evidence/strategy-urls.json). PDF annotations preserved full URLs where bidirectional text extraction broke their spelling. Four incomplete text-derived URL fragments are excluded from research.

Every file in the actual `../refrencess/` directory was visually inspected: ten design reference images and one logo. The prompt's `./references/` directory does not exist. No supplied file was renamed or replaced.

| PDF pages | Finding | Design consequence |
|---|---|---|
| 1–2 | Sales and service must share a global brand identity; the PDF explicitly is not a brand guide | Build an industrial identity; treat proposed colors and clear space as provisional |
| 3 | Global statistics conflict between official pages; technical data must be sourced per model | Omit numerical credibility counters initially; track provenance and configuration per specification |
| 4–6 | Regional sites supply a common structure; dealers supply local commercial flows | Preserve recognizable product/support terminology while simplifying navigation |
| 7 | Legal title must match the contract; three languages are proposed | Leave title pending; current prompt authorizes Dari and English only |
| 8 | Categories, stock, applications, support, local proof, quote and contact form the homepage | Retain these functions; promote support earlier and merge overlapping brand sections |
| 8–9 | Model pages need HTML specifications, brochures and contextual inquiry; parts need machine identification | Give each model a stable page; preserve its identity when requesting help |
| 9–10 | Sales, parts, service and general requests need separate handling; suggested response times are operational targets | Design distinct journeys; do not publish global or proposed internal SLAs as local promises |
| 10–11 | Local workshop, handover and team evidence matter; Dari terminology needs editorial consistency | Create a local evidence backlog and a controlled glossary |
| 11–12 | Industrial imagery, mobile usability and low transfer weight matter | Use static imagery, readable HTML and small forms; avoid background video |
| 12–13 | SEO, CMS, lead handling, accessibility and governance are required in the eventual site | Specify content contracts and production requirements; do not implement infrastructure now |
| 14 | MVP includes real models, inventory, support forms, brochures, contact and local content | Separate prototype readiness from public-launch readiness |
| 15–16 | Success is qualified inquiries and service access; full sitemap should support growth | Prioritize task completion and clear information ownership |
| 17 | Sources are a researched sample, not proof of every dealer's authorization | Inspect source pages; treat their claims as self-description, never Afghanistan authorization |
| 18 | Final brief: global identity, local sales/service, industrial direction | Use this as the governing creative principle |

### Scope resolutions

The current prompt governs this stage where it differs from the PDF: two languages, frontend only, no CMS/database/backend, and approval before a prototype. Preserve locale and content structures so Pashto and integrations can be added later. Do not expose an empty Pashto language option.

The PDF's launch requirement for at least three genuine local content items is still a launch backlog item. Placeholder photography cannot satisfy it. Projects/news pages may be designed in the information architecture but remain absent from public navigation until useful approved content exists.

### Tools and evidence limitations

Inspected available skills and utilities. The supplied skills do not include a directly applicable UI research or PDF skill. Reviewed the skill-installer instructions; no additional skill was necessary. Image generation is unnecessary before direction approval. No global tooling, accounts, paid services or OS settings were changed.

Installed `pdfjs-dist` and `playwright` locally in `.research-tools/`, with installation scripts disabled and versions locked. Used PDF.js for the complete PDF and URL extraction, image viewing for every reference, and the web research tool for public source pages. Headless Edge attempts at all 24 main site URLs failed with network-access or DNS errors even after an approved retry; individual logs are saved as `research-evidence/01-site.json` through `24-site.json`.

**Evidence levels:** “Page content” below means the web tool returned the page's readable content and links, potentially from its crawl cache. It does not mean a fresh visual browser session. “Indexed only” means search material, with direct opening unsuccessful. “Unavailable” means no usable page content. No competitor screenshot, mobile interaction, computed font/color, load-time measurement, Lighthouse score or submitted form is claimed. Visual critiques apply to local images; external critiques concern observed content/structure. Missing information in an extraction is not proof that a feature does not exist.

## 3. Analysis of every reference image

References are inspiration, not licensed production image libraries. Tiny copy in composite screenshots is not treated as reliable factual content. Mobile judgments are observations only where a mobile mockup is supplied; otherwise they are adaptation proposals.

| Reference file in `refrencess/` | Strong ideas and visual assessment | Weak areas / avoid | Adaptation for SHANTUI and mobile |
|---|---|---|---|
| `89f80171538620ddab675aa72c69ea75.jpg` — Built | Dark excavator hero; clean machine silhouettes in a six-category grid; contrasting contact area. Solid industrial subject matter and clear section progression. | Yellow dominates; many small modules, partner logos, rental copy, repeated counters and testimonials. Type becomes tiny in the long composition; narrow top navigation is unsuitable for touch. | Adapt the category silhouettes and practical contact block. Use real SHANTUI machines, larger type, fewer sections and restrained orange. On mobile use two category columns, with full-width forms. |
| `cca0e9b86c1152ea2e4b37d94d1b3741.jpg` — MegaEquip about | Strong wide loader photograph, restrained white space, readable heading hierarchy, distinct dark contact panel. Desktop/mobile pair demonstrates stacking the story and form. | Sign-up/login emphasis is irrelevant; rounded image collage and six testimonial cards dilute industrial authority. Mobile stretches the secondary content into a long page. | Use the photo/editorial relationship for the future Afghanistan about page. Replace generic mission text with documented team and support information. One verified local story is stronger than repeated testimonials. |
| `Construction Website UI_UX Design Figma Free Template.jpeg` — Ironclad | Oversized condensed headline over a working machine conveys scale. Quote panel has a strong visual anchor. Phone action is easy to identify. | Contractor positioning, distressed older machinery, many experience/project counters, photo overlays and decorative background texture. Tight condensed typography would be unsuitable for Dari. | Adapt the scale of the machine and direct contact hierarchy. Keep prose on quiet surfaces, use a modern correct-model photo, and stack image after copy on mobile. Do not copy the contractor narrative. |
| `e1e851842147505dc88cc89d1261c6a3.jpg` — MegaEquip home | Clear machine cards with large cutouts; industry-led discovery; contrasting dark brand section; desktop and mobile views supplied. Product selection appears early. | Unrelated automotive logo strip, price ranges, pill controls, testimonial bulk and repeated orange arrows. Dense category tabs are awkward on narrow screens. | Adapt model naming, consistent image stage and application links. Show availability rather than invented prices. Use visible category links and an accessible mobile filter sheet. Keep product cards one column on phones. |
| `Elementor dependency.jpeg` — ClassiAds | Repeating listing grid and category entry points demonstrate scanning. | Furniture/classified marketplace language, soft gray contrast, decorative floating objects, tiny labels, badges and ecommerce clutter. Low industrial suitability. | Borrow only the principle of consistent card anatomy. Reject the aesthetic, star ratings, advertising badges, and decorative 3D. A machine catalog needs far fewer fields and stronger contrast. |
| `Landing Page Design Tips for High Conversions.jpeg` — orange logistics | Useful contrast between light content and dark quote area. Visible contact strip and an understandable process sequence. | Too many competing modules, orange details, counters, progress bars, team cards and overlapping photographs. Compact navigation and body copy weaken scanability. | Use a short “choose → discuss → receive proposal” explanation on the quote page if operationally accurate. Reflow as a vertical list on mobile; avoid progress bars presented as business proof. |
| `logo.png` | Supplied black SHANTUI wordmark with orange A on a white canvas. This is the only supplied brand asset. | Small raster source; no vector, brand manual, permission statement or official color specification. Upscaling risks softness. | Preserve pixels, proportions and colors; use on white during a prototype. Place “Afghanistan” as separate live text, not inside the mark. Obtain approved vector and inverse variants before publication. |
| `Premium Logistics & Transportation Web UI 2026 _ Supply Chain Landing Page Design.jpeg` | Clear hero hierarchy, coherent repeated spacing, alternating surfaces and a legible short process. | Teal/navy transport identity, curved hero edge, numerous rounded panels and global shipping imagery. Testimonials and large counters would require evidence. | Borrow consistent rhythm and disciplined content widths. Replace shipping scenes with machinery and make support actions prominent. Stack sections without copying rounded transport styling. |
| `UI_UX Design equipment rental.jpeg` | Loader silhouette is visually dominant; six machinery types are immediately recognizable. Compact page structure. | Large orange background, gray cards with weak small white labels, rental “book” language and unsupported numbers. Product images crowd panel edges. | Use recognizable category silhouettes with generous image padding and dark labels on light surfaces. Orange should identify actions. Two-column mobile category grid, one-column detailed product list. |
| `Website Design for a Manufacturing Company.jpeg` — Sarvam | Closest useful structural reference: utility contacts, strong product hero, early category grid, one explanation of manufacturing credibility. Direct quote/brochure actions. | Blue-heavy identity, curved dividers, miniature category copy, generic metric strip and uneven small text. Not machinery photography. | Adapt its disciplined product-first sequence and clear navigation. Keep square section boundaries and more generous card typography. Collapse the five-column presentation to two categories per mobile row. |
| `Жми на перейти, чтоб посмотреть портфолио и заказать разработку сайта.jpeg` — Logamax | Most useful spacing reference: large left-aligned headings, strong image/copy balance, simple line icons and a controlled red action color. Process and operating information feel practical. | Warehouse/3PL subject, partner-logo strip, prominent counters and multiple overlapping hero cards. Red accent is not the proposed SHANTUI system. | Borrow editorial discipline and actual operating information. Replace floating panels with aligned factual content. Keep hero, support and contact in a clear reading order on phones. |

## 4. SHANTUI global and regional website analysis

Each regional entry below is an independent page-content inspection. Their common navigation includes products, applications, construction cases, support, news and company information. This is evidence for information architecture, not proof of identical rendering.

| Source / access | What works | Weakness or limitation | Afghanistan decision |
|---|---|---|---|
| [Global homepage](https://www.shantui-global.com/) — unavailable; [Parts Support](https://www.shantui-global.com/service/parts-support.htm) accessible | Parts content connects original components, parts infrastructure and EPC support. | Home, About, History, excavator listing, Service and Inquiry openings failed. Global network claims do not establish local stock or support. | Treat official pages/brochures as technical authorities when available. Give local parts requests a direct route; do not imply EPC integration. |
| [Europe](https://www.shantui-eu.com/) — page content | Machine categories, service shortcuts, applications and construction cases form a recognizable industrial structure. | Generic “read more” actions; company news below extensive navigation. Catalog extraction returned mostly navigation, so model cards could not be evaluated. | Use recognizable categories and meaningful action labels. Regional membership does not decide Afghanistan's approved range. |
| [Africa](https://en.shantui-africa.com/) — page content | Road/mining applications and broad equipment categories connect machines with jobs. Parts and support are explicit navigation items. | Breadth creates a lot of choices; extracted site structure is globally expansive. | Prioritize mining, road construction and earthworks; move secondary categories behind “All equipment.” |
| [MENA](https://www.shantui-mena.com/) — page content | Products, solutions, cases, inquiry and dealer access share one hierarchy. | Repeated generic English actions and broad regional content provide little Afghanistan-specific direction. | Adopt the consistent nomenclature; build local contact and availability separately. Do not infer that Afghanistan belongs to this region. |
| [Russia / Central Asia](https://www.shantui-ru.com/) — page content | Localized navigation preserves machinery and support structure. | Some English labels remain among Russian content, including request/navigation labels. | Translate all interface states deliberately; keep only model names, engine names and units in their original form. |
| [North America](https://en.shantui-na.com/) — page content | A narrower featured category set demonstrates regional selection; application cases include a US example. | Regional differences cannot justify technical or emissions assumptions for Afghanistan. | Maintain a country-specific assortment and exact configuration records. |
| [Latin America](https://en.shantui-sa.com/) — page content | A broad machine range, parts, applications and regional language links are discoverable. | The separate distributor page could not be opened. No local inventory behavior was verified. | Use consistent manufacturer context plus an independently maintained Afghanistan availability layer. |

Global subpage follow-up also returned Business Strengths and the dealer-conference/Brazil-event articles linked in the PDF. The Africa customer-care article failed. These support an editorial source list; none are evidence of Afghanistan operations. Regional service content distinguishes maintenance, training and support processes, but its advertised global response promises are not local commitments. [Europe Service Support](https://www.shantui-eu.com/service/service-support.htm).

## 5. Distributor and dealer website analysis

These sites' authorization, exclusivity, stock and warranty statements are their own claims. This research evaluates presentation, not the validity of their contracts.

| Source / access | Works / reusable strength | Weakness, uncertainty, or pattern to avoid | Adapt for Afghanistan |
|---|---|---|---|
| [Bagger2Go Germany](https://bagger2go.de/SHANTUI) — page content | Clearly connects local model selection, advice, parts and service; phone and WhatsApp access. | The displayed model-count claim does not align neatly with the longer visible list. The commercial journey can become complex. | One source of truth for displayed counts; contextual quote actions. |
| [Bagger2Go quote/configurator](https://bagger2go.de/Angebot_anfordern) — page content | Type, model, attachments and preferred contact channel carry context into an inquiry. | Financing calculations and many fields are excessive for this MVP. A zero-price initial state can confuse without context. Submission not tested. | Prefill model; collect only essentials initially. No financing or price calculations without real policies. |
| [Prescott Kenya](https://prescott.co.ke/quote/) — homepage failed, quote URL returned extensive landing-page content | Local conditions, stock, parts, practical advice and contact channels are connected. Clear industry entry points. | Long testimonial and repeated sales content increases reading burden. We did not verify stock claims. | Make local usefulness specific and concise; provide sales/parts/service routing. |
| [Prescott L55-B5 detail](https://prescott.co.ke/products/shantui/l55-b5-wheel-loader/) — page content | Summary information, WhatsApp and a short inquiry form are close to the model. | Bucket-capacity summary has a unit without a value. Strong promotional copy is less useful than precise sourced information. | Suppress incomplete specs; prefer three verified facts and task suitability. |
| [Apex Kenya](https://apextrux.com/shantui) — indexed only, direct opening failed twice | Indexed content describes machine types, model range, specification-sheet access and direct sales contacts. | No visual, card or interaction judgment possible. Broad in-stock/response claims cannot be reused. | Retain the concept of direct specification access; verify availability per model. |
| [SHANTUI.KG](https://shantui.kg/) — page content | Catalog, in-stock machines, repair/parts, local contacts, industry routes and PDF links form a complete ownership journey. | Long category descriptions and repeated credibility copy; financing is market-specific. | Strong functional reference for local ownership support, with much tighter content. |
| [SHANTUI.KG stock](https://shantui.kg/tehnika-v-nalichii-2/) and [SD22 detail](https://shantui.kg/buldozer-shantui-sd22-2/) — page content | Separate inventory route; model page includes HTML tables, PDF and messaging inquiry. | Large stock listing; extraction does not verify freshness. Variant tables require careful mobile treatment. | Add verified dates and explicit statuses; retain HTML specifications and optional PDF. Dealer specs are not our technical source. |
| [Kazakhstan / Fortex](https://www.shantui-kazakhstan.com/) — page content | Local supplier identity and catalog entry are immediately explicit. | Generic button labels and lowest-price language weaken clarity. Support/availability detail was not established. | Use concrete action labels and confirmed supplier information; avoid price superlatives. |
| [Shantui do Brasil](https://www.shantuidobrasil.com.br/) — page content | Country identity, machines, parts and authorized network have distinct routes. | Environmental narrative competes with early product discovery. Exact layouts unverified. | Keep country identity, but prioritize buying and ownership tasks. |
| [Brazil parts](https://www.shantuidobrasil.com.br/pe%C3%A7as-de-reposi%C3%A7%C3%A3o) and [equipment](https://www.shantuidobrasil.com.br/equipamentos) — page content | Parts page offers a direct WhatsApp action and component groupings; equipment page separates machine types. | Repeated generic detail labels; long category list could overwhelm. | Specific part/request labels; progressively reveal less common equipment. |
| [Shantui Peru](https://shantuiperu.pe/) — page content | Stock/incoming wording, quotation links, events and separate parts contact make local activity tangible. | Repeated promotions and models; 360-degree embed adds a potential loading cost. Some spec-sheet-labelled links point to WhatsApp. | Honest action labels, verified delivery stories and separated support contacts. Defer virtual showroom. |
| [SIT Russia](https://www.shantui-sit.ru/) — page content | Deep category structure, parts references, service, branches, certificates and reviews support ownership. | Very extensive multi-brand navigation; individual service opening failed. | Plan extensible taxonomy but expose a short SHANTUI-only menu. Never inherit exclusivity wording. |
| [Turkey B2B](https://b2b.shantuiturkiye.com/) — unavailable after retry | PDF identifies a local B2B/contact reference. | No usable page was inspected; visual and functional judgments withheld. | Use only the PDF's general local-contact lesson. No login requirement inferred. |
| [Arabian Bugshan](https://www.a-bugshangroup.com/) — direct page unavailable; [about page](https://www.a-bugshangroup.com/aboutus.html) indexed only | Indexed content describes branches, technical support and parts. | Current layout and branch data not verified. Do not treat historical indexed claims as current capacity. | Publish an actual local support directory when confirmed. |
| [Saudi ECC](https://ecc.net.sa/en/home/) — page content | Language choice, equipment/services and contact routes are visible. | Extracted text includes generic template remnants such as a placeholder email and startup-project language. Sales/rental mix blurs focus. | Remove all template residue; use task-specific equipment sales and support language. |
| [JAB Ethiopia](https://www.jabengineeringplc.com/) — page content | Product search, stock, parts, training and support links; office, parts shop and workshop distinguished. | Broad guarantees and heavy testimonial content; email appears required in quote. | Make support destinations explicit and phone the primary contact field. |
| [Ever Star Industries](https://www.everstarindustries.com/) — page content | Regional dealership and assistance information makes support tangible. | Current homepage emphasizes Powerstar trucks despite mentioning SHANTUI in company copy. | Keep manufacturer focus consistent; avoid unrelated brand/service promises. |
| [RAMMA Azerbaijan](https://ramma.az/en/) — page content | Language choice, machinery groups and local contact information are present. | Long multi-brand histories dominate; counters appear as zero in extraction, which may be a script limitation. | Prioritize useful local tasks; essential facts must remain readable without animated counters. |
| [Shantui Mongolia](https://www.shantuimongolia.mn/) — empty app shell | No usable page content returned. PDF describes category, payment and location functions. | No current UX or visual conclusions possible. | Keep as a documented research gap; do not derive payment promises. |
| [MAS Indonesia](https://masautomobil.co.id/) — page content | SHANTUI submenu groups machines; quote and contact routes are prominent in the content hierarchy. | Multi-brand hierarchy and extensive corporate prose add layers. | Retain category clarity without brand filtering. |
| [Astra Philippines](https://astramc.ph/) — page content | SHANTUI models are nested by equipment type within the catalog. | Long truck/multi-brand navigation would distract from a single-manufacturer site. | Model taxonomy should scale behind a simpler entry menu. |

### Coverage of the requested inspection dimensions

| Dimension | Evidence and conclusion | Limit |
|---|---|---|
| Header, navigation, homepage, footer | Link/heading order inspected on accessible pages; local references establish visual comparisons | Actual menu opening, sticky behavior and CSS positioning unverified |
| Hero, typography, colors, grid, spacing, photography and CTA appearance | Visually inspected in all supplied images | Live-site visual styling was not scored; extracted image labels do not prove image quality |
| Categories, cards, model details and stock | Regional taxonomy; dealer listings; KG and Prescott detail pages | Hidden filters, images, exact card dimensions and stock truth unverified |
| Quote/inquiry, phone, WhatsApp and brochures | Link destinations and field labels reviewed where returned | No form submitted; routing, prefill and downloads not end-to-end tested |
| Parts, service, support | Global parts, regional service, Brazil parts, dealer support navigation | Actual stock, local support capacity and response times unverified |
| Projects, cases, events, news, dealer identity and trust | Accessible regional case links and dealer local-content structures | Claims require their own evidence before reuse |
| Responsive behavior/mobile navigation | Two supplied MegaEquip desktop/mobile mockups inspected | All live mobile behavior remains unverified because browser networking failed |
| Performance | Potential costs identified from embedded-media/content patterns | No measured speed ranking or competitor performance scores |

## 6. Reusable strengths and synthesis

Use machine scale from Ironclad, early categories from Built/Sarvam, product-card consistency from MegaEquip, and disciplined spacing from Logamax. Keep their composition ideas independent: do not reproduce any whole page.

The website research suggests three complementary principles: manufacturer consistency for product terminology; model-aware inquiries for buyers; visible local parts/service access for owners. The new design should combine those principles without importing another country's inventory or commercial commitments.

## 7. Weak patterns to avoid

- Long slideshows that conceal important messages, generic “read more” buttons, and hover-only navigation.
- Placeholder company details, unrelated partner badges, invented testimonials or automatic counters used as authority.
- Catalog cards with missing values, mixed regional specifications, ambiguous stock labels, or download labels that actually open chat.
- Overlong quote forms, required email as the only contact path, and sales forms reused without parts/service context.
- Repeating the same models in featured, promotions and stock sections; combine these when the assortment is small.
- Orange backgrounds everywhere, rounded marketplace styling, decorative gradients and contractor-template copy.

## 8. Afghanistan-specific UX

Treat the PDF's mobile/WhatsApp emphasis as a project requirement, not a measured market-share finding. Design for a customer opening a shared model link on a modest phone and a costly or unstable connection.

| Visitor | Essential task | Successful experience |
|---|---|---|
| Contractor who knows a model | Confirm variant, availability and quote path | Model page shows exact name, sourced facts and one quote action |
| Buyer who knows only the job | Choose suitable equipment | Application page connects road/mining/earthworks to relevant categories and advice |
| Procurement officer | Obtain comparable specifications and documents | HTML technical table plus a clearly labelled dated PDF |
| Machine owner needing parts | Identify part without knowing its exact number | Model/PIN or photograph route, with “I don't know” available |
| Operator or fleet manager | Reach technical support | Model, location, fault and machine-stopped status route to service |

Ask for province and optionally district/site details where useful; do not invent branch coverage. Accept local and international phone formats, spaces, Persian/Arabic digits and a leading plus. Preserve original identifiers. Avoid forcing a precise map pin over a slow connection. Business hours must identify Afghanistan time once confirmed.

## 9. Proposed information architecture

Primary desktop navigation: **Equipment · Availability · Spare Parts · Service · Company**. Quote is the persistent primary action. Contact and `دری | English` are utility actions. Equipment contains category links and “By application.” Company groups local/global about, approved projects and news. Downloads appear under Equipment, on model pages and in the footer. The logo returns home.

The simplified menu preserves the PDF's sitemap without placing every page at the top level.

| Route beneath `/fa-af/` or `/en-af/` | Purpose / publication condition |
|---|---|
| `/` | Homepage |
| `/products/` | Browse categories and search models |
| `/products/{category}/` | Filtered model collection |
| `/products/{category}/{model}/` | Exact model/configuration detail |
| `/stock/` | Verified local availability; use “Availability” if stock not confirmed |
| `/solutions/`, `/solutions/{application}/` | Mining, road construction, earthworks/infrastructure; expand when content exists |
| `/parts/`, `/parts/request/` | Parts guidance and dedicated request |
| `/service/`, `/service/request/` | Confirmed support offering and dedicated request |
| `/downloads/` | Approved brochures/specification sheets, filterable by model/language |
| `/about/afghanistan/`, `/about/shantui/` | Clearly separated local business and manufacturer information |
| `/projects/`, `/projects/{slug}/` | Only documented deliveries/projects with permission |
| `/news/`, `/news/{slug}/` | Approved local updates; attributed global news with source links |
| `/contact/`, `/quote/` | Department contact and sales inquiry |
| `/privacy/`, `/terms/` | Company-approved policies before public launch |

Launch category structure: excavators, wheel loaders, bulldozers, compactors, motor graders, mining trucks, road machinery, new energy. Keep categories data-driven; hide empty local collections. New energy is also a cross-category tag, with one canonical model page rather than duplicate product records. Road machinery groups pavers/milling/recycling without duplicating compactors or graders. Future categories need no navigation rewrite.

Root `/` should offer a sensible Dari default with an explicit language switch; preserve chosen language and direct shared URLs. Do not forcibly redirect a visitor away from a model based on location.

## 10. Proposed homepage hierarchy

| Order | Section and composition | Purpose / content rule |
|---|---|---|
| 1 | Compact white header; charcoal utility line on wide screens | Brand, language, navigation and quote remain clear |
| 2 | One large working-machine image beside a charcoal copy panel | Establish product and market; one primary quote action and secondary “View equipment” |
| 3 | Narrow practical support strip | Links to availability, parts and service; legal distributor wording only if verified |
| 4 | Six major category tiles; “Explore all equipment” | Fast discovery, with large true-model silhouettes |
| 5 | Up to three verified available/incoming models | High-intent local availability. Until verified, use “Explore selected models” with “Contact for availability”; no “In stock Afghanistan” claim |
| 6 | Substantial parts and technical-service section | Bring ownership confidence ahead of general company narrative; two equal panels, one action each |
| 7 | Three application stories: mining, road construction, earthworks | Help visitors who cannot name a machine; no unsupported terrain-performance claims |
| 8 | Evidence-led Afghanistan introduction, then compact global context | Actual office/workshop/delivery evidence when supplied; distinguish manufacturer history from local operations |
| 9 | Conditional local deliveries or news, maximum three items | Demonstrate activity when genuine material exists; omit empty sections |
| 10 | Short quote/contact section with brochure-library text link | Complete inquiry and reach the correct department |
| 11 | Structured charcoal footer | Product/support/contact/legal routes; no newsletter until a real publishing program exists |

Changes from PDF order are intentional: promote support from after brand persuasion to immediately after selection; merge “Why SHANTUI,” local company and global credibility into a compact sequence; treat featured/stock products as one module; keep downloads contextual. This reduces duplicated sections and protects the priority of sales and ownership support.

The initial prototype should omit fabricated projects/news, numerical trust counters and fake local workshop photography. Show an honest review note where needed, not a mock testimonial. The final public page must use approved copy instead of review labels.

## 11. Proposed design language

Straight section boundaries, strong horizontal alignment, generous margins and limited accents convey engineering precision. Large machinery should carry the emotion; typography and controls carry the explanation. Use white for catalog clarity, charcoal for hero/support emphasis and pale gray for technical information.

Desktop hero: approximately five columns of concise copy and seven columns of machinery image inside a shared composition. Prefer an image whose subject faces toward the copy, using separate crops for each locale if needed. Mobile: copy first, actions, then a dedicated 4:3 image; the machine must remain identifiable. Do not mirror the photograph or place long Dari copy over tracks and hydraulic lines.

Use a dark support section as the principal contrast change. Avoid making every section a card. Product categories use compact tiles; product models use information cards; company content uses editorial rows. No parallax, decorative counters, auto-advancing hero or background video.

Draft hero copy, subject to local editorial review:

- English: **SHANTUI machinery for Afghanistan.** Supporting line: “Explore construction and mining equipment. Ask about model selection, availability, spare parts and technical service.”
- Dari: **ماشین‌آلات SHANTUI برای افغانستان**. Supporting line: «ماشین‌آلات ساختمانی و معدنی را ببینید. در مورد انتخاب مدل، موجودی، پرزه‌جات و خدمات تخنیکی معلومات بگیرید.»
- Actions: **Request a Quote / قیمت بگیرید**; **View Equipment / دیدن ماشین‌آلات**.

These drafts deliberately avoid an unverified official/exclusive distributor title and a promise of nationwide service.

## 12. Typography direction

Propose **Barlow Semi Condensed** for English display headings only, with the system sans-serif stack for English body/UI. Propose **Noto Sans Arabic** for Dari display, body and UI, subject to a native Dari reader's review. The two scripts need comparable hierarchy, not identical font sizes or character counts. Font sources: [Barlow specimen](https://fonts.google.com/specimen/Barlow+Semi+Condensed), [Noto Sans Arabic specimen](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic); actual font files and licenses will be checked during prototyping.

Use sentence case for prose and headings, unchanged SHANTUI/model casing, modest English display compression, and no added tracking in Dari. Allow generous Dari line height, natural wrapping and longer buttons. Numeric specifications use legible tabular Latin digits and intact units.

## 13. Color direction

Supplied logo establishes a black/orange/white relationship, not an official hexadecimal standard. Provisional UI orange: `#F56600`; charcoal: `#171A1C`; white: `#FFFFFF`; technical surface: `#F3F4F4`. Exact values are design proposals until approved assets arrive.

Use charcoal text on the bright orange primary button. Locally calculated contrast is 5.65:1; white on this orange is only 3.10:1 and is unsuitable for normal-size button text. Use a darker orange for links on white. The companion design-system document specifies tested pairs and component rules.

## 14. Image direction

Priority: permission-cleared manufacturer images of exact models, then real Afghanistan operational photography when available. Temporary generic industrial environments may establish mood, but must not be labelled as local projects or precise model evidence. Do not generate machine product cutouts with invented details.

Asset brief: one working bulldozer/excavator hero, six category machine cutouts, three exact-model product images, one original-parts image, and eventually separate workshop/team/delivery photographs. Image-led local proof is gated until real material exists. No office handshakes, foreign customer photos presented as Afghan customers, or AI-generated local branches.

Track source URL, rights/permission, original filename, asset role, exact model if applicable, country/location if known, focal point, localized alt/caption, placeholder state, approval and replacement owner. All page content references asset IDs. Do not hardcode image URLs inside future components. Research images from other dealers are not cleared for reuse.

## 15. CTA and inquiry strategy

One filled primary action per local decision area. Homepage: Request a Quote. Category page: view model links; quotation after selection. Model page: Request a Quote, brochure secondary, technical advice as text. Parts and service pages each have their own primary action. Contact methods remain secondary utility actions.

Sales minimum: name, phone, province and model/category (with “Help me choose”). Optional company, email, application, purchase timing and message reveal progressively. Preserve source model and locale in the request. A single generic email form must not erase context.

Design states: empty, prefilled, invalid, ready for review, sending, genuine acknowledgment, failure/retry. Until integration exists, the prototype explicitly says “Demo request — nothing sent.” Never simulate a delivered inquiry, generate a fake case number or quietly save personal details. WhatsApp opens only after a user action and only with a confirmed number; if unknown, review placeholders are noninteractive.

## 16. Product presentation and scalable content

Category pages lead with category name, concise task guidance, model count from data, model search and category-specific filters. Filter by availability; add technical ranges only when enough verified comparable data exists. Use explicit apply/clear actions on mobile and an informative no-results state. Search should tolerate case, spaces and hyphens while displaying canonical model names.

Product card sequence: exact model image → category/model → local availability label → up to three verified category-relevant specifications → view model. No prices or default “available” badge. Missing specs are omitted or explicitly pending in review mode, never displayed as zero.

Model page: breadcrumb, model/category, gallery, availability and last verification, essential facts, quote; followed by applications, sourced benefits, full HTML specifications, exact brochure, support links and two or three relevant models. All brochure links identify model, language, revision and file size. Unavailable documents offer “Request specification sheet,” not a broken download.

| Content entity | Required separation / future fields |
|---|---|
| Product | Stable ID, official model, category, configuration/market, localized copy, approved applications, specs, media and document references |
| Specification | Label key, original value/unit, source URL/document/page, configuration, checked date, approval; no inferred conversions |
| Local availability | Product/configuration ID, status, optional confirmed location, checked date, review expiry, sales owner; independent of global product data |
| Category | Stable ID, locale labels, display order, enabled state, image, optional parent |
| Asset / document | Provenance, permission, locale, revision, dimensions/file size, replacement status |
| Project / news | Locale copy, real event date/location, image permissions, source attribution, approval |
| Department contact | Sales/parts/service, verified channels, hours, coverage text, update owner |

Separate `sample`, `official-source`, and `locally-verified` provenance. In the prototype a realistic model name such as **SD22** may be a clearly marked sample record, with specs empty and local status “Contact for availability.” It is an example, not a selected Afghanistan product. Demonstrations of the other three statuses must be marked sample states.

Availability semantics: **Available in Afghanistan** requires physical local stock confirmation; **Incoming** requires confirmed inbound supply; **Available to Order** requires sales approval; **Contact for Availability** is the safe fallback for unknown or expired verification. Never invent arrival dates. Sales defines review expiry; until it does, do not publish positive availability statuses.

Future React rendering should consume a content-provider boundary and locale dictionaries. A later API can replace fixtures without changing visual components. This is an architecture proposal, not implementation.

## 17. Parts and service strategy

Parts page: explain original-parts sourcing only within approved capacity; group undercarriage, engine/filters, drivetrain and hydraulic components as content categories subject to assortment confirmation. Guide the owner to machine model, PIN and part number or photograph. Unknown identifiers must not block contact. Compatibility is confirmed by the parts team, never implied by a generic category card.

Parts request minimum: name, phone, location, machine/model if known and description. Then optional PIN, engine number when needed, quantity, urgency and photo. Include an illustrative instruction explaining where to find the machine plate; use a real approved image later.

Service page: separate maintenance, diagnosis/repair, workshop work and possible field visits. Warranty, operator training and project support appear only when contractually and operationally confirmed. Service form collects contact, province/site, machine/model, issue and machine-stopped status; PIN, operating hours and photos are optional supporting details.

Mobile photo selection needs size/type guidance, preview, remove and retry. Defer video uploads for the first version. A local prototype can preview without uploading, clearly labelled. Department-specific WhatsApp/call actions use confirmed details. Explain hours and next steps without an invented response guarantee.

## 18. Mobile design strategy

At 320–430 CSS pixels: short header, visible language switch, labelled menu button, one-column hero, two-column category tiles, one-column model cards, stacked support panels and single-column forms. The menu reveals five primary sections and explicit contact routes; category navigation uses click/tap disclosure, not hover.

On model pages, a bottom action bar provides Quote plus contact, with reserved page space and safe-area padding. Hide it while the menu or form dialog is open and prevent overlap with keyboard/focused controls. On parts/service pages use the relevant request action. Avoid a separate floating chat bubble competing with the bar.

Two-column label/value specifications should wrap naturally. Wide comparison/variant tables may scroll inside a labelled, keyboard-accessible region; the entire page must not scroll sideways. Preserve model, filters and scroll context when returning from details. No infinite scrolling required for the first catalog.

## 19. Dari and RTL considerations

Use `fa-AF` with RTL and `en-AF` with LTR. Dari copy requires local editorial approval; a font supporting Arabic script does not guarantee appropriate Afghan terminology. The question marks already present in `promt.txt` are not reliable vocabulary; use the readable glossary on PDF page 11.

| Concept | Proposed Dari UI term |
|---|---|
| Road / road construction | سرک / سرک‌سازی |
| Spare parts | پرزه‌جات |
| Technical service | خدمات تخنیکی |
| Workshop | ورکشاپ / مرکز خدمات تخنیکی |
| Company | کمپنی — use consistently after editorial confirmation |
| Vehicle / engine | موتر / انجن |
| Request a quote | قیمت بگیرید |
| Technical consultation | مشوره تخنیکی |
| Excavator | اکسکاواتور؛ explanatory بیل مکانیکی where useful |
| Compactor | رولر / کمپکتور |
| Province | ولایت |

Use document direction and logical layout properties; preserve sensible DOM reading order. Isolate model codes, engine names, telephone numbers, dimensions and units as LTR runs. Do not reverse photography, logos, numeric sequences, download icons or phone symbols. Mirror directional navigation arrows deliberately. Labels and error messages follow the locale; identifiers remain intact. [W3C bidirectional-text guidance](https://www.w3.org/International/articles/inline-bidi-markup/).

Dari headline wrapping, button heights, mixed-script technical tables and form alignment need separate screenshot review. The language switch retains the equivalent page and model, with a clear fallback if translation is missing. Do not silently display untranslated sales claims as approved Dari copy.

## 20. Performance, accessibility and SEO

Proposed first-load budget on a representative mobile homepage: no more than 700 KB compressed transfer including one hero, critical styles/scripts and active-locale fonts; stretch target 500 KB. Initial compressed JS at most 150 KB; mobile hero target 120–180 KB; card images approximately 25–50 KB at delivered size. These are project budgets to validate, not current measurements.

Use responsive AVIF/WebP with fallback, image dimensions, lazy loading below the fold and immediate loading of the hero. Load only needed font scripts/weights. Keep maps, videos and external widgets behind a user action. Avoid large slider/animation libraries. Preserve useful text, product links and contact access when enhanced interactions fail.

Target field Core Web Vitals at the 75th percentile: LCP ≤2.5 seconds, INP ≤200 ms and CLS ≤0.1. A laboratory prototype cannot establish field compliance; test throttled loading as well as actual modest Android hardware later. [Web Vitals definitions](https://web.dev/articles/vitals).

Accessibility target: WCAG 2.2 AA. Essential acceptance criteria include keyboard operation, visible/unobscured focus, meaningful headings/labels, error identification, color-independent statuses, adequate contrast, zoom/reflow and descriptive image alternatives. Project touch-target preference is 48×48 CSS pixels. Exact component rules are in the design-system proposal. [WCAG reference](https://www.w3.org/WAI/WCAG22/quickref/).

Production SEO should use crawlable model HTML, stable locale URLs, self-canonicals and reciprocal `fa-AF`/`en-AF` alternates; publish only languages that exist. A framework/prerendering decision belongs to implementation. Avoid fake availability/price structured data and unverified LocalBusiness addresses. Product metadata must describe the actual page, not imply local stock. Sitemap excludes private prototype and sample pages. [Localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).

## 21. Risks, governance and acceptance

| Risk / missing information | Resolution / owner | Blocks |
|---|---|---|
| Distributor legal title and permitted claims unknown | Management supplies contract-approved wording | Public official/exclusive claims |
| No brand guide/vector or image permissions | Brand liaison supplies approved assets | Final identity/asset publication |
| Final assortment and configurations unknown | Sales + technical team approve model/source register | Official product catalog |
| Stock unknown or stale | Sales owns dated status and expiry | Positive inventory promises |
| Addresses, channels, hours and coverage unknown | Operations confirms each department | Live contact and service promises |
| No real Afghanistan photographs or project consent | Content owner collects workshop, team and handover evidence | Local proof sections and PDF's local-content launch requirement |
| Dari quality and mixed-script defects | Native Dari editor + technical reviewer approve glossary and screen copy | Final bilingual publication |
| Frontend demo mistaken for functioning lead system | Persistent review context; explicit “nothing sent” state | Public inquiry capture |
| Browser network restriction | Record source-content findings; perform visual/browser review when access works | Claims about competitor rendering; prototype visual QA still required later |
| Excess homepage content | Enforce hierarchy and hide unapproved optional modules | Quality, not research completion |

Content release workflow: draft → source/rights check → technical or operations review → Dari/English editorial review → publication approval → scheduled recheck. Global statistics, warranty terms and technical specs require their own sources; approval of the visual direction is not approval of facts.

Prototype review criteria after approval: recognizable SHANTUI identity; machine discovery before long company prose; parts/service accessible from header and homepage; honest sample data; both locales at 390, 768 and 1440 pixels plus 320-pixel reflow; quote context retained; no false success; clear keyboard focus; no obscured fixed controls; documented image/font transfer weight. Actual forms, claim verification and launch data remain separate work.

Measure future business outcomes as qualified sales inquiries, identifiable parts requests, service inquiries, brochure interest and successful contact actions. A WhatsApp click or opened form is an interaction, not a confirmed lead. Do not include phone, PIN or message content in analytics events.

## 22. Final recommended creative direction

Approve **Industrial confidence, local support** as the single primary direction: strong machinery imagery, quiet white catalog surfaces, precise charcoal typography, restrained orange actions and visible ownership support. Build the first approved prototype around the homepage sequence in section 10 and the companion [design system proposal](design-system-proposal.md).

This direction meets the strategy's commercial intent while remaining credible with today's limited local assets. Its success depends on disciplined content and authentic evidence rather than decorative complexity.

**Approval requested:** the creative direction, homepage hierarchy and provisional design system for a bilingual React homepage prototype. React/UI implementation has not started, as required by `promt.txt`.

## 23. Missing live visual research — Chrome supplement, 21 September 2026

### Scope and evidence quality

Completed the missing browser research requested in `promt1.txt`, using Playwright and `C:\Program Files\Google\Chrome\Application\chrome.exe` (Chrome 153.0.8010.53). This supplement adds live rendering evidence to the existing research; it does not repeat the PDF/reference analysis or replace the creative direction. The companion design-system proposal is unchanged.

Nineteen of the 24 main websites supplied usable live page layouts. “Inspected” means the captured rendered page was visually reviewed, not that every image, script, font, interaction or page worked. Several pages had incomplete media or pending fonts. Their blank areas are observations of this session, not proof of permanent site defects. Font waits were bypassed for screenshots after they stalled; fallback type must not be mistaken for a site's intended final typography. No competitor performance score, fully loaded-page certification, stock verification or form delivery is claimed.

Evidence is retained in [research-evidence/chrome/](research-evidence/chrome/). Each numeric ID has a `-site.json` record with source URL, timestamp and result; successful captures generally add `-desktop.jpg`, `-mobile.jpg` and `-full.jpg`. Review sheets combine existing captures for visual comparison. Desktop sessions used 1440×1000; initial narrow-screen checks resized to 390×844. Additional fresh mobile sessions used a mobile user agent and touch emulation. No inquiry, email, phone call or WhatsApp message was sent.

### Newly inspected global/regional pages

| Source / evidence IDs | New visual evidence | Effect on the existing direction |
|---|---|---|
| [Europe](https://www.shantui-eu.com/) — 02 | White logo/navigation row, dark utility strip, machine-category silhouettes, pale-gray application grid, condensed display headings and dark footer. Narrow rendering includes a five-item bottom navigation. Hero/recommended-product media was incomplete in the captured state. | Retain the recognizable manufacturer hierarchy; our existing larger category tiles and task-focused mobile actions remain preferable for this brief. Do not copy the site's incomplete rendered state. |
| [Africa](https://en.shantui-africa.com/) — 03 | Broad, two-row silhouette taxonomy on desktop; compressed horizontal category presentation on narrow screens. Application tiles have restrained yellow edge markers. | Confirms the need to curate a smaller Afghanistan range and keep category labels legible without horizontal clipping. |
| [MENA](https://www.shantui-mena.com/) — 04 | Visually shares the regional white/gray grid, compact header, applications and cases structure. Narrow categories compete for limited space. | Manufacturer consistency is useful; no new reason to enlarge our primary menu. |
| [Russia / Central Asia](https://www.shantui-ru.com/) — 05 | Same regional layout in Russian; long category strings become crowded in the narrow category area. | Adds a concrete visual reason to test longer Dari labels independently rather than merely mirror English. |
| [North America](https://en.shantui-na.com/) — 06 | Smaller visible category assortment within the same regional structure. Several image slots did not render. | Supports curated country-level selection, without importing regional technical assumptions. |
| [Latin America](https://en.shantui-sa.com/) — 07; [distributor finder](https://en.shantui-sa.com/service/overseas-branches.htm) — 33 | Regional layout visible, with partial images/fonts. Finder controls rendered beside a largely empty map/results area; narrow layout reserved considerable space above them. | Keep the proposed text contact directory and optional map approach. Finder results and geographic accuracy were not verified. |

Europe subpages added useful evidence that was missing from the homepage captures: [excavators](https://www.shantui-eu.com/product/excavator.htm) (40), [service](https://www.shantui-eu.com/service/service-support.htm) (41), [parts](https://www.shantui-eu.com/service/parts-support.htm) (42), and [inquiry](https://www.shantui-eu.com/service/inquiry.htm) (43, fresh mobile 63). The excavator banner combines environmental photography and a prominent machine cutout, but no usable model grid rendered below it. Parts uses alternating component photographs and explanatory text; service uses a team banner and a numerical network strip. These support giving parts/service substantial page composition, while the existing ban on importing global service promises remains essential. Inquiry visibly separates product, parts, distributor and general-contact choices beneath a three-step explanation; the initial choice screen was inspected, not a completed submission. Its mobile viewport declares `user-scalable=no`; our implementation should permit zoom.

### Newly inspected distributor/dealer pages

| Source / evidence IDs | New visual evidence | Adaptation or limit |
|---|---|---|
| [Bagger2Go Germany](https://bagger2go.de/SHANTUI) — 08; [configurator](https://bagger2go.de/Angebot_anfordern) — 44, 64 | Strong dark split hero with isolated machinery; configurator places selection controls beside a dark price summary, then contact fields. Initial mobile cookie panel obscures much of the content. After rejecting optional cookies, the mobile navigation drawer visibly opened. | Preserve clear model/request context and generous drawer links. Avoid adding ecommerce account, cart, financing and price-summary complexity to this MVP. |
| [Prescott Kenya](https://prescott.co.ke/) — 09; [L55-B5 detail](https://prescott.co.ke/products/shantui/l55-b5-wheel-loader/) — 45 | Working-machine hero, condensed headings and clear orange product/contact actions. Detail puts model facts and quote/WhatsApp actions together. Its narrow capture left a large media area before the model summary; some resource requests failed. | Keep the useful fact/action grouping. Add an explicit review case for failed media so the model identity and quote remain easy to reach. Do not infer that the captured blank area is its normal fully loaded appearance. |
| [Apex Kenya](https://apextrux.com/shantui) — 10 | Previously indexed-only page rendered as a dark navy catalog, with orange diagonal warning-strip decoration, condensed headlines, category jump links, repeated spec cards and direct sales actions. Machine media was incomplete. | Category jump links are useful for a long collection. Dense small spec text and decorative striping add no value to our calmer catalog system. |
| [Ever Star Industries](https://www.everstarindustries.com/) — 12, fresh mobile 62 | Powerstar truck hero dominates; black header, red controls and an AI-assistant action. Fresh mobile layout is distinct from resized desktop and has a tall brand/assistant header. | Confirms the earlier multi-brand mismatch. Keep SHANTUI machinery and a compact task-focused header; no assistant widget is needed. |
| [RAMMA Azerbaijan](https://ramma.az/en/) — 13 | Spacious white editorial layout with red accents; the first major section is a long company introduction. It stacks into substantial text on narrow screens. | Useful restraint, but product discovery should precede this amount of company prose. |
| [Kazakhstan](https://www.shantui-kazakhstan.com/) — 14, fresh mobile 61 | Yellow desktop composition uses a person-led hero; fresh mobile instead shows a machine cutout, prominent phone icon and stacked copy/actions. | A meaningful example of intentionally different mobile art direction. Retain machinery as our visual hero on both screen sizes. |
| [SHANTUI.KG](https://shantui.kg/) — 15 | Large wordmark, separate navigation row, catalog tiles and orange angled labels. Slider/media remained partially loading; narrow layout stacks category panels. | Supports direct catalog access, but not an oversized header or dependence on a slider completing before useful content appears. Catalog and parts follow-ups timed out. |
| [Mongolia](https://www.shantuimongolia.mn/) — 16 | Previously empty app shell now rendered a complete page structure: black/yellow identity, large country headline, category routes, contact area and floating chat control. Typography appeared serif in this capture; desktop hero media arrived differently from mobile. | Treat as new layout evidence, with font/media limits. Keep our selected type system and avoid letting a country title overpower the machine. |
| [MAS Indonesia](https://masautomobil.co.id/) — 17 | Green multi-brand header, utility contacts, large truck banner, support strip and brand footer. Compact navigation appears at narrow widths. | Direct contacts/support remain useful; multi-brand color and imagery are unsuitable for the Afghanistan identity. |
| [Astra Philippines](https://astramc.ph/) — 18 | Broad truck hero carousel, orange contact control, dark footer and floating chat. Narrow rendering centers the hero text over the image. | Retain a static machine hero and explicit task labels; do not adopt a general corporate slideshow. |
| [Brazil](https://www.shantuidobrasil.com.br/) — 21, fresh mobile 60; [equipment](https://www.shantuidobrasil.com.br/equipamentos) — 49; [parts](https://www.shantuidobrasil.com.br/pe%C3%A7as-de-reposi%C3%A7%C3%A3o) — 50 | Strong yellow/black country branding. Equipment is a dense photo-tile matrix with text on images. Parts has a direct green request action and clear component-family illustrations. Fresh mobile homepage differs from resized desktop and includes bottom contact shortcuts. | Strengthens the separate parts-task route. Keep category labels on quiet surfaces and consistent orange primary actions; do not copy the dense photographic category matrix. |
| [Peru](https://shantuiperu.pe/) — 22; [contact](https://shantuiperu.pe/contactenos/) — 53; [machines](https://shantuiperu.pe/lista-de-maquinarias/) — 54 | Black/orange header, machinery-led contact banner, side-by-side form and department directory, and catalog download actions. Homepage/catalog had extensive blank media areas during capture. | Contact page visually reinforces distinct sales, workshop and parts destinations. Keep our visible labels and optional-email approach; do not let videos or a virtual showroom precede essential contact details. |
| [SIT Russia](https://www.shantui-sit.ru/) — 23; [service](https://www.shantui-sit.ru/services/Service/) — 51; [SD22 family](https://www.shantui-sit.ru/product/buldozery-shantui/gidromekhanicheskie-sd/sd22/) — 52 | Compact contact header, extensive desktop catalog tree, pale bordered product cards and a large grouped footer. SD22 route is a **family listing**, not a single-model detail: variants have separate cards. Narrow listing becomes one card per row with filter/sort controls. Service uses practical vehicle imagery and explanatory content. | New clarification: preserve exact model suffix/configuration and distinguish a family landing page from a model page. Our existing single-column mobile cards and structured configuration data already support this. Do not copy Russia's warranty terms. |

### Mobile evidence correction and remaining gaps

Resizing desktop pages initially produced scroll widths of 980 px for Brazil, 1133 px for Kazakhstan and 1060 px for Ever Star at a 390 px viewport. **Do not classify these measurements as proven mobile overflow defects.** Fresh mobile-user-agent sessions rendered dedicated layouts with a declared 320 px layout viewport and matching scroll width. They demonstrate why both cold mobile loads and resizing must be checked. Bagger2Go's drawer is visibly open in `64-menu.jpg`; clicks on the other three sites did **not** produce a visibly open menu in the saved captures, so their menu functionality remains unconfirmed. An earlier progress update saying all of those menus opened was too broad; this is the corrected finding.

| Still unavailable for useful live visual inspection | Observed reason / evidence |
|---|---|
| [SHANTUI Global](https://www.shantui-global.com/) and its extracted About, History, Strengths, Excavator, Service, Parts, Distributor, Inquiry and three news URLs | DNS resolution failure (`ERR_NAME_NOT_RESOLVED`); records 01, 25–32 and 36–38. Earlier text/PDF findings remain the evidence for those pages. |
| [JAB Ethiopia](https://www.jabengineeringplc.com/) | Returned HTTP 404; record 11 is an error page, not a reviewed company homepage. |
| [Arabian Bugshan](https://www.a-bugshangroup.com/) | Certificate authority error; record 19. No certificate bypass used. |
| [Saudi ECC](https://ecc.net.sa/en/home/) | HTTP 403/browser-check page; record 20. |
| [Turkey B2B](https://b2b.shantuiturkiye.com/) | HTTP 403/browser challenge; record 24. |
| [Prescott spare parts](https://prescott.co.ke/spare-parts/) | Navigation timeout; record 46. Its homepage and model detail were inspected successfully. |
| [KG catalog](https://shantui.kg/katalog-2/) and [KG parts](https://shantui.kg/zapchasti/) | Navigation timeouts; records 47–48. Its homepage was inspected successfully, with partial media. |

The YouTube URL also timed out (34). A LinkedIn page capture exists (35), but neither social profile is used to support website visual conclusions. Partial media on otherwise accessible sites remains a limit on photography/hero judgments, not an additional claim that those sites are unreachable.

### Meaningful additions to the design review criteria

1. **Test failure states visually:** suppress/delay hero and card media in the later prototype review and confirm that model identity, category labels and request actions remain useful. The live captures provide concrete evidence for this existing resilience requirement.
2. **Test real mobile entry as well as resizing:** use fresh mobile sessions at shared product URLs, alongside desktop-to-mobile resizing. Check the actually opened menu, not merely a successful click dispatch. Keep zoom available.
3. **Make model families explicit:** a family collection may contain multiple suffixes/configurations; every quote must retain the exact selected model. Do not accidentally present a family-page title or brochure as one configuration's specification.
4. **Keep departmental requests visible beside supporting imagery:** Brazil's parts composition and Peru's contact directory add visual support for the existing equal prominence of sales, parts and technical service. Avoid burying their actions under company-scale statistics, maps or media.

**Decision: keep “Industrial confidence, local support” unchanged.** The new visual research supports the existing white/charcoal surfaces, restrained orange actions, machinery-led composition, independent Dari layout review, curated categories and prominent parts/service journeys. No redesign of the information architecture, tokens or typography proposal is justified. The research stage is complete within the documented access limits. The next authorized step, after user approval, is the bilingual React homepage prototype and its desktop/tablet/mobile visual review.
