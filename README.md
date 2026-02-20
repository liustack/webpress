# WebPress

A CLI toolkit for AI agents to render local HTML files into high-quality PNG images.

中文说明请见：[README.zh-CN.md](README.zh-CN.md)

## Features

- Purpose-built for PNG output (`webpress` only)
- Local HTML only (remote URLs are not supported)
- 8 built-in presets for social and content images
- Deterministic rendering with Playwright + Chromium
- `#container`-based screenshot capture for predictable framing

## Installation

```bash
npm install -g @liustack/webpress
npx playwright install chromium
```

Or run with `npx`:

```bash
npx @liustack/webpress [options]
```

## Usage

```bash
# OG card
webpress -i card.html -o og.png --preset og

# Infographic
webpress -i stats.html -o infographic.png --preset infographic
```

## Presets

- `og` (1200x630)
- `infographic` (1080x1350)
- `poster` (1200x1500)
- `banner` (1600x900)
- `twitter` (1200x675)
- `youtube` (1280x720)
- `xiaohongshu` (1080x1440)
- `wechat` (900x383)

## Options

- `-i, --input <path>` input HTML file path
- `-o, --output <path>` output PNG file path
- `-p, --preset <name>` preset name (default: `og`)
- `--width <number>` custom width
- `--height <number>` custom height
- `--scale <number>` device scale factor (default: `2`)
- `--wait-until <state>` `load | domcontentloaded | networkidle`
- `--timeout <ms>` timeout in milliseconds
- `--safe` disable external network requests and JavaScript execution

> PNG rendering requires a `#container` element in HTML. Rendering fails if missing.

## AI Agent Skill

- [web-to-png/SKILL.md](skills/web-to-png/SKILL.md)

## License

MIT
