# Skill audit for the SHANTUI Afghanistan build

Audit date: 22 September 2026. This audit follows `msterpromt.txt`, which is the governing execution protocol.

Enabled: `skill-installer` was read and used for discovery/installation attempts. The local `review-agent` skill was read and enabled for defect-first code review. Its instructions will be supplied to the review agent. No additional downloadable package could be installed: Python is missing, and both escalated PowerShell and curl GitHub retrieval failed. This is the protocol's documented installation-blocked fallback, not a claim of installed frontend skills. Browser QA uses the existing Playwright package and the new eight-viewport gate.

## Local skills available now

| Skill | Location | Coverage for this project |
|---|---|---|
| `imagegen` | `C:/Users/mahdi/.codex/skills/.system/imagegen/SKILL.md` | Bitmap generation/editing. Not needed for the current implementation because approved WebP assets already exist and the protocol prioritizes real/replacable machinery imagery. |
| `review-agent` | `C:/Users/mahdi/.codex/skills/.system/review-agent/SKILL.md` | Review workflow; potentially useful for a final code/UI review if invoked by the lead agent. |
| `skill-installer` | `C:/Users/mahdi/.codex/skills/.system/skill-installer/SKILL.md` | Lists or installs curated/GitHub skills. Installation requires network and must not be attempted without the required escalation. |
| `plugin-management` | `C:/Users/mahdi/.codex/plugins/cache/openai-curated-remote/plugin-management/0.1.0/skills/plugin-management/SKILL.md` | Discovers/manages plugins and app connections. No connected design/browser plugin is currently needed for local React work. |
| Canva skills | `C:/Users/mahdi/.codex/plugins/cache/openai-curated-remote/canva/15.0.0/skills/` | Canva brand checks, design feedback, editing, translation and presentation workflows. They require Canva design context/connectors and do not apply to this local React repository. |
| OpenAI templates | `C:/Users/mahdi/.codex/plugins/cache/openai-curated-remote/openai-templates/0.1.1/skills/` | Document, presentation and spreadsheet templates. No relevant frontend implementation or QA coverage. |

The local cache also contains a GitHub connector plugin, but it has no `SKILL.md` and covers repository/PR operations rather than visual frontend craft, RTL, accessibility or browser QA.

## Official repository skills identified by web research

The official OpenAI skill repositories expose several relevant skills, but they are not installed locally in this session:

- [`frontend-design`](https://github.com/openai/skills/blob/main/skills/.curated/frontend-design/SKILL.md) — frontend visual design and implementation, including distinctive hierarchy, typography, imagery and motion. This is the closest match to the premium homepage direction.
- [`frontend-app-builder`](https://github.com/openai/plugins/blob/main/plugins/build-web-apps/skills/frontend-app-builder/SKILL.md) — polished React/Vite web applications, component structure, assets, responsive behavior and visual sign-off. This is the strongest fit for the multi-page execution protocol.
- [`playwright`](https://github.com/openai/skills/blob/main/skills/.curated/playwright/SKILL.md) — real-browser navigation, interaction, screenshots and UI-flow debugging. It complements the repository's existing `.research-tools` Playwright verification script.
- [`frontend-testing-debugging`](https://github.com/openai/plugins/blob/main/plugins/build-web-apps/skills/frontend-testing-debugging/SKILL.md) — rendered frontend testing and screenshot-based debugging. Useful for final visual/interaction QA if its plugin is installed.
- [`agent-browser`](https://github.com/openai/plugins/blob/main/plugins/vercel/skills/agent-browser/SKILL.md) — browser interaction, verification, screenshots, extraction and visual diff workflows. It is an alternative to the existing Chrome/Playwright path.
- [`screenshot`](https://github.com/openai/skills/blob/main/skills/.curated/screenshot/SKILL.md) — screenshot capture guidance. It is lower priority because this repository already has Chrome screenshot tooling.
- [`figma-generate-design`](https://github.com/openai/skills/blob/main/skills/.curated/figma-generate-design/SKILL.md) and [`figma-create-design-system-rules`](https://github.com/openai/skills/blob/main/skills/.curated/figma-create-design-system-rules/SKILL.md) — design-system/token extraction and visual validation when a Figma file and connector are available. No Figma source is present in the workspace.

No official skill was found in the available search results that specifically covers Dari Afghanistan editorial review, RTL implementation, heavy-equipment UX, or SEO as a standalone workflow. These concerns should remain explicit project acceptance criteria and be handled in source/tests.

## Recommended coverage

If installation becomes available, use the smallest set that covers the protocol:

1. `frontend-design` for visual direction and high-quality UI implementation decisions.
2. `frontend-app-builder` for the React multi-page implementation workflow.
3. `playwright` or `frontend-testing-debugging` for Chrome interaction, responsive screenshots and regression checks (choose one primary browser workflow).

Use Figma skills only if an actual Figma file/connector is supplied. Do not add image-generation or Canva skills solely to make the website feel more visual; the approved project assets and CSS/React composition are the appropriate source of truth.

## Blockers and installation status

- The local Python skill-installer helper was unavailable in the prior attempt.
- Direct GitHub skill retrieval failed even after an escalated network attempt.
- No installation was performed; therefore the official skills above are recommendations only and cannot be claimed as enabled for this turn.
- Existing project-local Playwright tooling, Chrome screenshots, CSS tokens, local fonts and the current research/design documents are sufficient to proceed without additional skills.
