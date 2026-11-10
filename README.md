# 独游手记

独立游戏开发的成长记录：**开发日志 / BGM 制作 / 美术练习（插画 + 像素）**。

线上站：<https://mowendao.github.io/>

这个仓库就是博客的**源工程**，不是构建产物。改了东西 push 到 `main`，GitHub Actions 自动构建并发布。

## 界面样式

界面装修集中在三个文件，**不改主题源码**，主题升级不受影响：

| 文件 | 作用 |
| --- | --- |
| `source/css/custom.css` | 全部自定义样式：色板变量、字体与行宽、导航、文章卡、表格、分类/标签页、侧栏、页脚 |
| `scripts/inline-custom-css.js` | 构建时把上面这份 CSS 内联进 `<head>`，并把首页导览条插到文章列表前 |
| `source/_data/home-intro.html` | 首页导览条的 HTML，改文案改这里就行 |

配色规则：

- 除一个强调色外，全部是中性灰。亮色底 `#fbfaf8`（暖纸），暗色底 `#131518`（近黑）。
- 强调色只用在链接、当前导航项、少量标签：亮色 `#8f4526`（砖红），暗色 `#d98a63`（浅砖）。
- 改配色优先改 `custom.css` 顶部 `:root` 里的变量，不要到处写死颜色。
- 深色模式跟随系统（`prefers-color-scheme`），两套色板在同一份 CSS 里。

排版：

- 正文 16px / 行高 1.85，内容列宽 760px（约 45 个汉字一行）。
- 表格是「三线表」：只有上下粗线和表头线，无竖线，隔行浅底。
- 入场动画已关闭（`motion.enable: false`），内容立即出现，不依赖 JS。

## 技术栈

| 项 | 版本 |
| --- | --- |
| Hexo | 8.1.x |
| 主题 | NexT 8.29.x（Muse scheme，跟随系统深色） |
| 部署 | GitHub Actions → GitHub Pages |

## 目录

```
_config.yml           站点配置（标题、简介、分类中文名→英文 URL 映射）
_config.next.yml      主题覆盖配置（导航、侧栏、代码块、搜索）
scaffolds/post.md     新文章的默认模板（含四套写作骨架提示）
source/_posts/        已发布文章
source/_drafts/       草稿，不发布
source/about|now|projects|tags|categories/   固定页面
source/images/        头像、favicon
source/audio/         站内音频（mp3）
WRITING.md            写作规范：front-matter 字段、四套正文骨架、资源规范
.github/workflows/    自动部署
```

## 本地写一篇

```bash
npm install          # 首次
npx hexo new draft "标题"     # 进草稿
npx hexo server              # http://localhost:4000 预览
npx hexo publish "标题"       # 草稿转正式
```

`hexo new` 会把文件名转成拼音/英文 slug。文件名格式 `YYYY-MM-DD-slug.md`，
URL 是 `/YYYY/MM/DD/slug/`，标题用中文写在 front-matter 里。

## 发布

```
git add -A
git commit -m "post: 标题"
git push
```

Actions 跑完就上线（约 1 分钟）。在仓库 Actions 页看进度。

## 一次性设置（只做一次，已完成的跳过）

1. **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。
   （以前是 "Deploy from a branch / main"，本仓库改成源码后必须换掉，否则线上是旧结构的 404。）
2. 确认 **Settings → Actions → General → Workflow permissions** 至少允许读取仓库内容。

## 栏目与 URL

分类名写中文，URL 走英文 slug（映射在 `_config.yml` 的 `category_map`）：

| 分类 | URL |
| --- | --- |
| 开发日志 | `/categories/devlog/` |
| BGM | `/categories/music/` |
| 美术 | `/categories/art/` |
| 笔记 | `/categories/notes/` |

> Hexo 只为「已有文章」的分类生成页面。四个分类都有第一篇真文章之后，
> 可以把 `_config.next.yml` 里注释掉的四行导航打开，换掉现在的「分类」总入口。

## 历史

改造前的信息安全版站点已打 tag `v1-infosec`（只含构建产物），需要回看时
`git checkout v1-infosec`。
