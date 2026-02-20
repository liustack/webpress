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

| Preset | Size | Example |
|--------|------|---------|
| `og` | 1200x630 | ![og](examples/shot-og.png) |
| `twitter` | 1200x675 | ![twitter](examples/shot-twitter.png) |
| `banner` | 1600x900 | ![banner](examples/shot-banner.png) |
| `youtube` | 1280x720 | ![youtube](examples/shot-youtube.png) |
| `wechat` | 900x383 | ![wechat](examples/shot-wechat.png) |
| `infographic` | 1080x1350 | ![infographic](examples/shot-infographic.png) |
| `poster` | 1200x1500 | ![poster](examples/shot-poster.png) |
| `xiaohongshu` | 1080x1440 | ![xiaohongshu](examples/shot-xiaohongshu.png) |

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

- [webpress/SKILL.md](skills/webpress/SKILL.md)

## License

MIT
