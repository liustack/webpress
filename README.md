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

Or install as an **Agent Skill** — tell any AI coding tool that supports agent skills (Claude Code, Codex, OpenCode, Cursor, Antigravity, etc.):

```
Install the skill from https://github.com/liustack/webpress
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
| `og` | 1200x630 | ![og](examples/og.png) |
| `twitter` | 1200x675 | ![twitter](examples/cinema-twitter-presets.png) |
| `banner` | 1600x900 | ![banner](examples/banner-vogue.png) |
| `youtube` | 1280x720 | ![youtube](examples/youtube.png) |
| `wechat` | 900x383 | ![wechat](examples/wechat.png) |
| `infographic` | 1080x1350 | ![infographic](examples/infographic-skill.png) |
| `poster` | 1200x1500 | ![poster](examples/poster.png) |
| `xiaohongshu` | 1080x1440 | ![xiaohongshu](examples/xiaohongshu.png) |

## More Examples

**Cinema Theme**

![cinema-twitter-pain](examples/cinema-twitter-pain.png)
![cinema-infographic-presets](examples/cinema-infographic-presets.png)
![cinema-infographic-skill](examples/cinema-infographic-skill.png)

**Fashion Theme**

![fashion-twitter-how](examples/fashion-twitter-how.png)
![fashion-twitter-pain](examples/fashion-twitter-pain.png)
![fashion-infographic-skill](examples/fashion-infographic-skill.png)
![fashion-xhs-main](examples/fashion-xhs-main.png)
![fashion-xhs-tutorial](examples/fashion-xhs-tutorial.png)

**Other Styles**

![banner](examples/banner.png)
![twitter-pain](examples/twitter-pain.png)
![xhs-cover-film](examples/xhs-cover-film.png)
![xiaohongshu-cover](examples/xiaohongshu-cover.png)

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
