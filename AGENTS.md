# Project Overview (for AI Agent)

## Goal
Provide the `webpress` CLI tool to render local HTML files into polished web visuals and export them as **PNG**. Remote URLs are not supported for security reasons.

## Technical Approach
- **Playwright + Chromium** as the rendering and export engine
- **PNG**: use `page.screenshot`, capture only `#container` (fail if missing)
- **Design direction**: emphasize visual hierarchy, whitespace, and strong readability

```bash
cd /path/to/webpress
pnpm install
pnpm exec playwright install chromium
```

## Code Organization (Domain-driven / Go Style)

Use a domain-based structure:

```
src/
├── main.ts       # CLI entry
├── renderer.ts   # PNG rendering logic
└── presets.ts    # size presets
```

## Skills Directory

```
skills/
└── webpress/
    ├── SKILL.md
    └── references/
        ├── color-theory.md
        └── design-principles.md
```

The CLI is exposed via `dist/main.js`.

## CLI Usage

```bash
webpress -i card.html -o og.png --preset og
webpress -i stats.html -o infographic.png --preset infographic
```

## Operational Docs (`docs/`)

1. Operational docs use front-matter metadata (`summary`, `read_when`).
2. Before creating a new doc, run `pnpm docs:list` to review the existing index.
3. Before coding, check the `read_when` hints and read relevant docs as needed.
4. Existing docs: `commit`, `testing`.

## .gitignore must include
- `node_modules/`
- `dist/`
- `skills/**/outputs/`
- common logs/cache/system files
