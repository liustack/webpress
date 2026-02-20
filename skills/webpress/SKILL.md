---
name: webpress
description: "Generate OG images, social cards, posters, banners, infographics, Twitter/X cards, YouTube thumbnails, and WeChat covers as PNG using WebPress CLI. The workflow is: write HTML layout → render to PNG via webpress. Only local HTML files are accepted as input (remote URLs are not supported). Use when user mentions 'OG image', 'social card', 'poster', 'banner', 'infographic', 'cheat sheet', 'cover image', 'Twitter card', 'YouTube thumbnail', 'video thumbnail', '公众号封面', '微信封面', 'WeChat cover', 'webpress', 'HTML to PNG', or 'HTML to image'. Priority: if an image generation model or dedicated image-gen skill is available, prefer that for visual assets; fall back to this HTML-screenshot approach only when no image-gen capability exists."
---

# WebPress — PNG

CLI tool to capture local HTML files as PNG images with preset dimensions.

## Installation

```bash
npm install -g @liustack/webpress@latest
npx playwright install chromium
```

> **Version check**: Before generating images, run `webpress --version`. If the command is not found or the version is outdated, re-run the install command above to get the latest release.

## Design References & Visual Rules

> [!IMPORTANT]
> **Read before generating any visual asset (PNG).** These rules are mandatory, not optional.
>
> **Priority**: If the user provides their own color palette, design guidelines, or style references, **use the user's** and skip the built-in references below. The built-in references are defaults, not overrides.

> [!CAUTION]
> **The output is a static visual asset** — a poster or card, **not a web page**.
>
> **Do not use**: navigation menus, buttons, links, forms, hamburger icons, badges/chips/pills/tags, emoji, or any elements that imply clickability or look like a web UI component. Avoid or minimize emoji — use SVG icons or typographic symbols instead for a polished, professional look.
>
> **Should use**: titles, taglines, decorative graphics, SVG illustrations, icons, statistics, brand marks.

> [!IMPORTANT]
> **Visual-heavy presets** (poster, banner, wechat) prioritize **graphics over text**.
>
> Use inline SVG for decorative elements (geometric shapes, patterns, gradients) and semantic illustrations (icons that convey meaning). SVG art should carry **50%+** of the visual weight. Text is limited to 1 headline + 1 optional subtitle — let the visuals speak.
>
> Other presets (og, twitter, youtube, xiaohongshu) still rely on **text as the primary content**, but should use SVG for decorative accents and visual polish.

- **references/color-theory.md** — Color theory rules (60-30-10 ratio, 4-hue limit, harmony methods) **always apply** to every design. Ready-to-use palettes are provided as **fallback only** — use them when no workspace brand colors exist. When brand colors exist, use them as the starting palette and apply the color theory rules on top.
- **references/design-principles.md** — Typography scale, visual hierarchy, Gestalt principles, Japanese aesthetics, Apple HIG. Apply to every layout decision.

## Usage

```bash
webpress -i input.html -o output.png --preset og
```

> PNG output requires a `#container` element. Rendering fails if it is missing.

## Assets Directory

> [!CAUTION]
> **ASK FIRST — do NOT assume a directory.** You MUST ask the user where to store generated images BEFORE writing any file. Do NOT silently create directories.

1. **Ask the user**: "Where should I store the generated images?" — wait for a response.
2. **Remember the answer** as `$ASSETS_DIR` for the rest of the session.
3. **Fallback**: Only if the user explicitly says "use default" or "whatever" or does not answer after being asked, use `${workspaceRoot}/assets`.

## Workspace Visual & Brand Resources (AI Agent Guidance)

- For OG cards, posters, and banners, **always** base the design on workspace visual/brand resources.
- Check the workspace for existing assets such as logos, color tokens, fonts, and brand imagery (commonly in `assets/`, `public/`, `src/assets/`, `docs/`, or any `brand/`-named folders).
- Also inspect project stylesheets and font usage (e.g., `*.css`, `*.scss`, `*.tailwind.css`) to infer the color palette and visual style when explicit brand assets are incomplete.
- If no brand resources are available, ask the user to provide them (logo, font preference) before generating visuals.

## Temporary HTML — Write to Assets Directory

> [!CAUTION]
> **NEVER scatter generated HTML files across the user's project.** All intermediate HTML must go into `$ASSETS_DIR` (the same directory where output images are stored).

1. **Write temporary HTML to `$ASSETS_DIR`**: this avoids permission prompts and keeps intermediate files alongside their output.
2. **Clean up after render**: delete the temporary HTML immediately after a successful `webpress` run.
3. **Keep only if asked**: if the user explicitly asks to keep the HTML source for debugging, leave it in `$ASSETS_DIR` and report its path.

## Scenario Routing Table (AI Agent Decision Guide)

| Scenario | Trigger Phrases | Parameters | Layout Guidelines | Spec ↓ |
|---|---|---|---|---|
| **screenshot (default)** | "screenshot", "take a screenshot", "capture local HTML" | **no preset** | Preserve the original HTML layout | — |
| **og (social card)** | "OG image", "social preview", "link preview", "share card", "social card" | `--preset og` | 1200x630; safe margin >=120px | **→ #1 og** |
| **infographic** | "infographic", "long-form image", "cheat sheet", "quick reference", "data card" | `--preset infographic` | 1080x1350; high information density | **→ #3 infographic** |
| **poster** | "poster", "event poster", "promo poster", "vertical promo" | `--preset poster` | 1200x1500; minimal text, strong visual impact | **→ #4 poster** |
| **banner** | "banner", "cover image", "header image", "hero image", "cover" | `--preset banner` | 1600x900; horizontal layout | **→ #5 banner** |
| **twitter** | "Twitter card", "X card", "tweet image", "Twitter preview" | `--preset twitter` | 1200x675; 16:9; readable at 400px width; text stroke for contrast | **→ #6 twitter** |
| **youtube** | "YouTube thumbnail", "video thumbnail", "YT thumbnail" | `--preset youtube` | 1280x720; 16:9; ultra-bold text; readable at 168x94 | **→ #7 youtube** |
| **xiaohongshu** | "xiaohongshu", "小红书", "小红书封面", "RedNote cover" | `--preset xiaohongshu` | 1080x1440; 3:4 vertical; bold headline impact | **→ #9 xiaohongshu** |
| **wechat** | "公众号封面", "微信封面", "WeChat cover", "公众号头图" | `--preset wechat` | 900x383; 2.35:1; safe zone center 383x383 square | **→ #8 wechat** |

## Mandatory Workflow (AI Agent MUST Follow)

> [!CAUTION]
> **Every image generation task MUST follow these steps in order. Do NOT skip or reorder.**

1. **Confirm output directory** — If `$ASSETS_DIR` is not set yet, **ask the user** where to store images. Do NOT create directories without asking.
2. **Match preset** — Use the Scenario Routing Table above to select the correct `--preset` and note the **Spec ↓** column.
3. **Read the preset spec** — Scroll to the referenced spec in "Preset Specs and Design Guidelines" below. Read the **`CONSTRAINTS`** line and full spec for that preset.
4. **Read design references** — Review `references/color-theory.md` and `references/design-principles.md` (or use user-provided brand assets if available).
5. **Write HTML** — Generate the HTML in `$ASSETS_DIR`, following the spec constraints (dimensions, safe area, typography, layout rules).
6. **Self-verify** — Before rendering, check the HTML against the preset's constraint summary. Fix any violations.
7. **Render** — Run `webpress` with the correct preset flag.
8. **Clean up** — Delete the temporary HTML file (unless the user asked to keep it).

## Preset Specs and Design Guidelines

> [!CAUTION]
> **MANDATORY — DO NOT SKIP.** You MUST read and follow the spec for the target preset BEFORE writing any HTML. Each preset has strict dimension, safe-area, typography, and layout constraints. Ignoring them produces unusable output.
>
> **How to use**: Find the preset that matches your task (referenced by the **Spec ↓** column in the routing table). Read the **`CONSTRAINTS`** line first — it is the minimum compliance bar. Then read the full spec for detailed guidance.

#### 1. og (1200x630) - Link Preview Image
> **`CONSTRAINTS`**: 1200x630 · safe area ≥120px from edges · headline legible at 400px width · single focus message · SVG accents required
- **Scenario**: Preview image when sharing links on social media.
- **Core principles**:
  - **Small-size readability**: the headline must be clearly legible at 400px width
  - **Single focus**: convey only one core message
  - **Safe area**: keep content at least **120px** from the edges
  - **SVG accents**: use inline SVG for decorative graphics and semantic icons to enrich the visual composition

#### 3. infographic (1080x1350) - Infographic/Cheat Sheet
> **`CONSTRAINTS`**: 1080x1350 · margins ≥100px · structured grids/blocks · clear hierarchy (title > subtitle > body > annotation)
- **Scenario**: Structured presentation of complex information, even code snippets.
- **Core principle**: **High information density**
  - **Structured**: use grids, blocks, lists, numbering
  - **Clear hierarchy**: title > subtitle > body > annotation
  - **Moderate whitespace**: **100px+** margins to avoid crowding

#### 4. poster (1200x1500) - Poster
> **`CONSTRAINTS`**: 1200x1500 · margins ≥120px · text = 1 title + 1 subtitle ONLY · SVG art ≥50% of canvas · NO paragraphs, NO bullet lists
- **Scenario**: Vertical mobile visual impact (events, launches).
- **Core principle**: **Minimal text, maximum visual**
  - Text: only 1 main title + 1 subtitle — **no paragraphs, no bullet lists**
  - SVG illustrations / geometric art should occupy **50%+** of the canvas
  - Use SVG for both decorative elements (patterns, shapes) and semantic content (icons that convey the topic)
  - **120px+** margins

#### 5. banner (1600x900) - Banner
> **`CONSTRAINTS`**: 1600x900 · horizontal layout · visual-first (SVG art majority) · text = 1 headline + optional subtitle ONLY
- **Scenario**: Blog covers, Twitter/LinkedIn header backgrounds.
- **Layout**: horizontal composition, content centered or left-text-right-image.
- **Visual-first**: SVG art / geometric decoration should fill the majority of the canvas; text limited to 1 headline + optional subtitle
- Use inline SVG for abstract patterns, brand-related illustrations, or semantic icons that reinforce the topic

#### 6. twitter (1200x675) - Twitter/X Card
> **`CONSTRAINTS`**: 1200x675 · safe area ≥120px all edges · headline ≥48px (rec 56-72px) · legible at 400px width · no pure white bg · no transparent bg · PNG <500KB
- **Scenario**: Preview image for tweets and X posts with `summary_large_image` card type.
- **Core principles**:
  - **Small-size readability**: headline must be legible when the card is displayed at ~400px width in the timeline
  - **Single focus**: one core message per card, details belong in the tweet text
  - **Safe area**: keep content at least **120px** from all edges (Twitter applies round corners and may crop top/bottom)
  - **Z-pattern layout**: top-left → top-right → bottom-left → bottom-right scanning path
- **HTML advantages to leverage**:
  - Precise CSS typography with custom fonts (`@font-face`), gradients, `backdrop-filter`
  - Dynamic text injection for programmatic batch generation (blog posts, release notes)
  - Pixel-perfect brand consistency via CSS variables
- **Pitfalls to avoid**:
  - No interactive elements (buttons, links) — this is a static image
  - Do not place critical content near corners (Twitter's round-corner clipping)
  - Avoid pure white backgrounds (blends with Twitter's light-mode chrome)
  - Do not use transparent PNG backgrounds (Twitter renders white or dark behind transparency)
  - Headline font-size >= **48px** (recommended 56-72px), max 2 font families, 3 weights
  - Keep PNG file size < **500 KB** for fast loading
- **Common patterns**: solid/gradient background + large title + brand logo; left-text-right-visual split; dark theme (stands out in feed)
- **SVG accents**: use inline SVG for decorative shapes, abstract graphics, and topic-related icons to add visual interest

#### 7. youtube (1280x720) - YouTube Thumbnail
> **`CONSTRAINTS`**: 1280x720 · 3-5 words max · font-size 120-200px Extra Bold + text-stroke 3-6px · recognizable at 168x94px · right-bottom 120x60px exclusion zone · margins ≥90px (bottom ≥100px) · ≤3 colors (60-30-10) · sans-serif bold only
- **Scenario**: Video thumbnail for YouTube, optimized for high click-through rate.
- **Core principles**:
  - **168px-test**: the thumbnail must be recognizable when scaled down to 168x94px (sidebar/mobile size)
  - **3-5 words max**: ultra-concise text; video title handles the details
  - **Ultra-bold typography**: font-size 120-200px, Extra Bold / Black weight, with **text-stroke** (3-6px) for contrast
  - **High-contrast colors**: red, yellow, orange, cyan stand out against YouTube's gray interface; avoid pure white/gray backgrounds
- **Safe area**:
  - **Right-bottom exclusion zone** (~120x60px): YouTube overlays the video duration badge here
  - **Bottom edge**: red progress bar may appear on rewatched videos
  - Keep all critical content within the **center 70%** of the canvas
  - **90px+** margins on top/left/right, **100px+** bottom margin
- **HTML advantages to leverage**:
  - CSS `text-stroke` and `text-shadow` for the bold outlined text style YouTube thumbnails demand
  - Consistent series branding via CSS variables (same layout, swapping title/colors per video)
  - Gradient backgrounds and `mix-blend-mode` for visual depth without Photoshop
  - SVG icons and geometric shapes for decorative elements
- **Pitfalls to avoid**:
  - Cannot render photographic faces/emotions (the highest-CTR element) — HTML excels at text-heavy thumbnails, not portrait photography
  - Avoid decorative/script fonts — use only sans-serif bold families (Montserrat, Oswald, Anton, Bebas Neue)
  - Do not exceed 3 dominant colors; apply 60-30-10 rule
  - Avoid small text — anything below 75px on the 1280x720 canvas becomes unreadable at thumbnail sizes
  - Do not use CSS animations or transitions (static output only)
- **Common patterns**: bold text + gradient background; number/statistic callout; before-after split; color-blocked sections with SVG icons
- **SVG accents**: geometric shapes, arrows, exclamation marks, topic-related icons — use SVG to create visual punch alongside bold typography

#### 8. wechat (900x383) - WeChat Official Account Cover
> **`CONSTRAINTS`**: 900x383 · critical content in center 383x383px safe zone · 2-6 keywords only · title ≥40px (rec 48-72px) · contrast ≥4.5:1 · no pure white bg · no transparent bg · SVG visual storytelling · PNG <500KB
- **Scenario**: WeChat Official Account (公众号) article cover image for headline position.
- **Core principles**:
  - **Center safe zone**: all critical content must fit within the **center 383×383px square** — WeChat crops to 1:1 when shared to Moments or chat
  - **2-6 keywords only**: extract key phrases from the article title; this is not a document, it's a billboard
  - **SVG visual storytelling**: use inline SVG illustrations/icons to convey the article's theme — the left/right decorative bands and center safe zone should all leverage SVG art, not text
  - **Avoid pure white backgrounds**: blends with WeChat's white interface and loses boundary
  - **Strong contrast**: text-to-background contrast >= 4.5:1; bold, high-weight sans-serif fonts
- **Safe area**:
  - **Center 383×383px** is the critical safe zone (1:1 crop for sharing)
  - Left/right ~259px bands are decorative/supplementary — they may be cropped
  - Title font-size >= **40px** (recommended 48-72px)
- **HTML advantages to leverage**:
  - CSS precise layout for the center safe zone with `flexbox` centering
  - Dynamic title/author injection for batch generation across article series
  - Brand consistency via CSS variables (logo, colors, fonts)
  - Gradient and color-block backgrounds that extend to full 900px width for the uncropped view
- **Pitfalls to avoid**:
  - Do not place critical text or logos outside the center 383×383 safe zone
  - Do not use transparent PNG backgrounds (WeChat fills with white/black)
  - Do not use small text — must be readable at thumbnail sizes in subscription list
  - Avoid complex photo backgrounds without a semi-transparent overlay for text readability
  - Keep PNG file size < **500 KB**
- **Common patterns**: solid/gradient background + bold keywords centered; brand color blocks + logo + title; left-right symmetric decorative elements with centered text

#### 9. xiaohongshu (1080x1440) - Xiaohongshu / RedNote Cover
> **`CONSTRAINTS`**: 1080x1440 · headline ≥80px occupying 40-60% canvas · keyword color/size contrast · SVG decorations · side margins ≥90px · top/bottom padding ≥80px
- **Scenario**: Xiaohongshu note cover, knowledge card, vertical mobile content.
- **Core principle**: **Bold headline + 3-second rule**
  - Headline font-size >= 80px, occupying 40-60% of the canvas
  - Highlight keywords with color/size contrast
  - Use SVG decorative elements and topic-related icons to fill remaining space and create visual richness
  - Convey "high information density" to entice clicks
  - **90px+** side margins, **80px+** top/bottom padding

## Options

- `-i, --input <path>` - input HTML file path (remote URLs are not supported)
- `-o, --output <path>` - output PNG path
- `-p, --preset <name>` - preset: `og`, `infographic`, `poster`, `banner`, `twitter`, `youtube`, `xiaohongshu`, `wechat`
- `--width <px>` - custom width
- `--height <px>` - custom height
- `--scale <n>` - device scale factor (default: 2)
- `--wait-until <state>` - navigation waitUntil: load, domcontentloaded, networkidle
- `--timeout <ms>` - navigation timeout in milliseconds
- `--safe` - disable external network requests and JavaScript execution

## Examples

```bash
# Generate an OG image
webpress -i card.html -o og.png --preset og

# Generate a poster
webpress -i poster.html -o poster.png --preset poster
```
