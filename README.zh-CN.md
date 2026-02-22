# WebPress

面向 AI Agent 的 HTML 渲染 CLI，可将本地 HTML 文件输出为高质量 PNG 图片。

## 特性

- 专注 PNG 输出（仅 `webpress`）
- 仅支持本地 HTML（不支持远程 URL）
- 内置 8 种图片预设
- 基于 Playwright + Chromium 的稳定渲染
- 使用 `#container` 作为截图区域，输出更可控

## 安装

```bash
npm install -g @liustack/webpress
npx playwright install chromium
```

或使用 `npx`：

```bash
npx @liustack/webpress [options]
```

也可以作为 **Agent Skill** 安装 — 在任何支持 Agent Skill 的 AI 编程工具（Claude Code、Codex、OpenCode、Cursor、Antigravity 等）中输入：

```
帮我安装这个 skill：https://github.com/liustack/webpress
```

或使用 `skills` CLI 直接安装：

```bash
npx skills add https://github.com/liustack/webpress --skill webpress
```

## 用法

```bash
# 生成 OG 卡片
webpress -i card.html -o og.png --preset og

# 生成信息图
webpress -i stats.html -o infographic.png --preset infographic
```

## 预设尺寸

| 预设 | 尺寸 | 示例 |
|------|------|------|
| `og` | 1200x630 | ![og](examples/og.png) |
| `twitter` | 1200x675 | ![twitter](examples/cinema-twitter-presets.png) |
| `banner` | 1600x900 | ![banner](examples/banner-vogue.png) |
| `youtube` | 1280x720 | ![youtube](examples/youtube.png) |
| `wechat` | 900x383 | ![wechat](examples/wechat.png) |
| `infographic` | 1080x1350 | ![infographic](examples/infographic-skill.png) |
| `poster` | 1200x1500 | ![poster](examples/poster.png) |
| `xiaohongshu` | 1080x1440 | ![xiaohongshu](examples/xiaohongshu.png) |

## 更多样例

**电影主题**

![cinema-twitter-pain](examples/cinema-twitter-pain.png)
![cinema-infographic-presets](examples/cinema-infographic-presets.png)
![cinema-infographic-skill](examples/cinema-infographic-skill.png)

**时尚主题**

![fashion-twitter-how](examples/fashion-twitter-how.png)
![fashion-twitter-pain](examples/fashion-twitter-pain.png)
![fashion-infographic-skill](examples/fashion-infographic-skill.png)
![fashion-xhs-main](examples/fashion-xhs-main.png)
![fashion-xhs-tutorial](examples/fashion-xhs-tutorial.png)

**其他风格**

![banner](examples/banner.png)
![twitter-pain](examples/twitter-pain.png)
![xhs-cover-film](examples/xhs-cover-film.png)
![xiaohongshu-cover](examples/xiaohongshu-cover.png)

## 参数

- `-i, --input <path>` 输入 HTML 路径
- `-o, --output <path>` 输出 PNG 路径
- `-p, --preset <name>` 预设名称（默认 `og`）
- `--width <number>` 自定义宽度
- `--height <number>` 自定义高度
- `--scale <number>` 设备缩放（默认 `2`）
- `--wait-until <state>` `load | domcontentloaded | networkidle`
- `--timeout <ms>` 超时时间（毫秒）
- `--safe` 禁用外部网络请求和 JavaScript 执行

> PNG 渲染要求 HTML 中存在 `#container` 元素，否则会失败。

## AI Agent Skill

- [webpress/SKILL.md](skills/webpress/SKILL.md)

## License

MIT
