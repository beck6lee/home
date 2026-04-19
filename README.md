# Beck Home

个人主页 · beckli.top

## 概述

基于 Next.js 14 + TypeScript 的个人主页，展示产品、技能和一周见闻。

## 页面

- `/` — Hero 首屏 + 粒子动画
- `/about` — 关于我 + 建造理念
- `/skills` — 技能栈
- `/products` — 在做的事情
- `/weekly` — 一周见闻复盘
- `/contact` — 联系方式

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 部署

本项目使用 `output: 'export'` 静态导出，可直接部署到 Vercel：

1. 将代码推送到 GitHub
2. 登录 [vercel.com](https://vercel.com)
3. Import `beck6lee/home` 仓库
4. Deploy（无需额外配置）

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- CSS Modules
- Vercel

## 域名

部署后可在 Vercel Dashboard 配置自定义域名 beckli.top
