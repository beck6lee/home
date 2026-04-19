# Personal Homepage (Next.js) Implementation Plan

> **Agentic workers:** Use `openclaw-imports:subagent-driven-development` (recommended) or `openclaw-imports:executing-plans` to implement.

**Goal:** 重构 beckli.top 个人主页，使用 Next.js + Vercel，活力创意风格，展示产品和一周见闻

**Architecture:**
- Next.js 14 App Router，TypeScript
- CSS Modules（无 Tailwind，按需样式）
- Vercel 部署（已支持）
- 页面：首页（Hero）、关于、技能、产品、一周见闻、联系方式

**Tech Stack:** Next.js 14, TypeScript, CSS Modules, Vercel

---

## File Structure

```
beck-home/
├── docs/superpowers/plans/2026-04-19-personal-homepage-nextjs.md
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 全局布局 + 字体
│   │   ├── page.tsx            # 首页（Hero）
│   │   ├── globals.css         # 全局样式 + CSS 变量
│   │   ├── about/page.tsx      # 关于我
│   │   ├── skills/page.tsx     # 技能
│   │   ├── products/page.tsx    # 产品展示
│   │   ├── weekly/page.tsx     # 一周见闻
│   │   └── contact/page.tsx     # 联系方式
│   ├── components/
│   │   ├── Navbar/Navbar.tsx + Navbar.module.css
│   │   ├── Hero/Hero.tsx + Hero.module.css
│   │   ├── SectionWrapper/SectionWrapper.tsx + .module.css
│   │   ├── ProductCard/ProductCard.tsx + .module.css
│   │   ├── WeeklyCard/WeeklyCard.tsx + .module.css
│   │   ├── SkillTag/SkillTag.tsx + .module.css
│   │   └── Footer/Footer.tsx + Footer.module.css
│   └── data/
│       ├── products.ts         # 产品数据
│       └── weekly.ts           # 一周见闻数据
├── public/
│   └── (静态资源)
├── next.config.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Design Language

**配色方案（活力创意型）：**
```css
--color-bg: #0a0a0f;
--color-surface: #12121a;
--color-primary: #7c3aed;      /* 紫色 */
--color-secondary: #f472b6;    /* 粉色 */
--color-accent: #38bdf8;       /* 蓝色 */
--color-text: #f8fafc;
--color-text-muted: #94a3b8;
--color-gradient-1: linear-gradient(135deg, #7c3aed, #f472b6);
--color-gradient-2: linear-gradient(135deg, #f472b6, #38bdf8);
```

**字体：** Google Fonts - `Space Grotesk` (标题) + `Inter` (正文)

---

## Tasks

### Task 1: 项目初始化

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `.gitignore`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "beck-home",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: 创建 next.config.ts**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true }
}

export default nextConfig
```

- [ ] **Step 4: 创建 .gitignore**

```
node_modules/
.next/
out/
.env*.local
.vercel
```

- [ ] **Step 5: 创建 src/app/globals.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

:root {
  --color-bg: #0a0a0f;
  --color-surface: #12121a;
  --color-surface-2: #1a1a25;
  --color-primary: #7c3aed;
  --color-secondary: #f472b6;
  --color-accent: #38bdf8;
  --color-text: #f8fafc;
  --color-text-muted: #94a3b8;
  --color-border: #2a2a3a;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --radius: 12px;
  --transition: 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
}

::selection {
  background: var(--color-primary);
  color: white;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg);
}
::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 3px;
}
```

- [ ] **Step 6: 创建 src/app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beck | 全栈开发者 & 一人公司',
  description: '前端开发 | AI Agent | 创意开发',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 7: 初始化安装**

Run: `cd ~/Documents/GitHub/beck-home && npm install`
Expected: node_modules created, no errors


---

### Task 2: 通用组件

**Files:**
- Create: `src/components/Navbar/Navbar.tsx`
- Create: `src/components/Navbar/Navbar.module.css`
- Create: `src/components/SectionWrapper/SectionWrapper.tsx`
- Create: `src/components/SectionWrapper/SectionWrapper.module.css`
- Create: `src/components/Footer/Footer.tsx`
- Create: `src/components/Footer/Footer.module.css`

- [ ] **Step 1: 创建 Navbar 组件**

```tsx
// src/components/Navbar/Navbar.tsx
'use client'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' },
  { href: '/skills', label: '技能' },
  { href: '/products', label: '产品' },
  { href: '/weekly', label: '一周见闻' },
  { href: '/contact', label: '联系' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>BECK</a>
        <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)} aria-label="菜单">
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
        </button>
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
```

```css
/* src/components/Navbar/Navbar.module.css */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.25rem 2rem;
  transition: all var(--transition);
}

.navbar.scrolled {
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--color-gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
}

.links a {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: color var(--transition);
  position: relative;
}

.links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-gradient-1);
  transition: width var(--transition);
}

.links a:hover {
  color: var(--color-text);
}

.links a:hover::after {
  width: 100%;
}

.menuBtn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 20px;
  position: relative;
}

.bar {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-text);
  position: absolute;
  left: 0;
  transition: all var(--transition);
}

.bar:nth-child(1) { top: 0; }
.bar:nth-child(2) { top: 50%; transform: translateY(-50%); }
.bar:nth-child(3) { bottom: 0; }

.bar.open:nth-child(1) { top: 50%; transform: translateY(-50%) rotate(45deg); }
.bar.open:nth-child(2) { opacity: 0; }
.bar.open:nth-child(3) { bottom: 50%; transform: translateY(50%) rotate(-45deg); }

@media (max-width: 768px) {
  .menuBtn { display: block; }
  .links {
    position: fixed;
    inset: 0;
    background: var(--color-bg);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition);
  }
  .links.open {
    opacity: 1;
    pointer-events: all;
  }
  .links a { font-size: 1.5rem; }
}
```

- [ ] **Step 2: 创建 SectionWrapper 组件**

```tsx
// src/components/SectionWrapper/SectionWrapper.tsx
import styles from './SectionWrapper.module.css'

interface Props {
  id?: string
  title: string
  subtitle?: string
  children: React.ReactNode
  light?: boolean
}

export default function SectionWrapper({ id, title, subtitle, children, light }: Props) {
  return (
    <section id={id} className={`${styles.section} ${light ? styles.light : ''}`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  )
}
```

```css
/* src/components/SectionWrapper/SectionWrapper.module.css */
.section {
  padding: 8rem 2rem;
}

.section:nth-child(odd) {
  background: var(--color-surface);
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: clamp(2rem, 5vw, 3rem);
  background: var(--color-gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  max-width: 500px;
  margin: 0 auto;
}
```

- [ ] **Step 3: 创建 Footer 组件**

```tsx
// src/components/Footer/Footer.tsx
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>&copy; {new Date().getFullYear()} Beck. 用力建造，用心生活.</p>
        <div className={styles.links}>
          <a href="https://github.com/beck6lee" target="_blank" rel="noopener">GitHub</a>
          <a href="mailto:hi@beckli.top">Email</a>
        </div>
      </div>
    </footer>
  )
}
```

```css
/* src/components/Footer/Footer.module.css */
.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 3rem 2rem;
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.copy {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.links {
  display: flex;
  gap: 2rem;
}

.links a {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  transition: color var(--transition);
}

.links a:hover {
  color: var(--color-secondary);
}
```


---

### Task 3: 首页 Hero + 导航布局

**Files:**
- Modify: `src/app/layout.tsx` (引入 Navbar + Footer)
- Modify: `src/app/page.tsx` (首页)
- Create: `src/components/Hero/Hero.tsx`
- Create: `src/components/Hero/Hero.module.css`

- [ ] **Step 1: 更新 layout.tsx 引入 Navbar 和 Footer**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

export const metadata: Metadata = {
  title: 'Beck | 全栈开发者 & 一人公司',
  description: '前端开发 | AI Agent | 创意开发',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: 创建 Hero 组件**

```tsx
// src/components/Hero/Hero.tsx
'use client'
import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = []
    const colors = ['#7c3aed', '#f472b6', '#38bdf8']

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.6
        ctx.fill()
        ctx.globalAlpha = 1

        particles.forEach((p2, j) => {
          if (i >= j) return
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = p.color
            ctx.globalAlpha = 0.15 * (1 - dist / 150)
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })
      })
      frame++
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.content}>
        <div className={styles.badge}>🚀 正在建造一人公司</div>
        <h1 className={styles.name}>
          你好，我是 <span className={styles.gradient}>Beck</span>
        </h1>
        <p className={styles.tagline}>
          全栈开发者 · 专注 AI 与创意产品
        </p>
        <div className={styles.ctas}>
          <a href="/products" className={styles.ctaPrimary}>看看我在做的东西</a>
          <a href="/weekly" className={styles.ctaSecondary}>一周见闻</a>
        </div>
      </div>
      <div className={styles.scrollHint}>↓</div>
    </section>
  )
}
```

```css
/* src/components/Hero/Hero.module.css */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--color-bg);
}

.canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 700px;
}

.badge {
  display: inline-block;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  margin-bottom: 2rem;
  animation: fadeUp 0.6s ease both;
}

.name {
  font-size: clamp(2.5rem, 8vw, 5rem);
  color: var(--color-text);
  margin-bottom: 1rem;
  animation: fadeUp 0.6s 0.1s ease both;
}

.gradient {
  background: var(--color-gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  font-size: clamp(1rem, 3vw, 1.4rem);
  color: var(--color-text-muted);
  margin-bottom: 3rem;
  animation: fadeUp 0.6s 0.2s ease both;
}

.ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeUp 0.6s 0.3s ease both;
}

.ctaPrimary {
  background: var(--color-gradient-1);
  color: white;
  padding: 0.85rem 2rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.ctaPrimary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(124, 58, 237, 0.4);
}

.ctaSecondary {
  background: transparent;
  color: var(--color-text);
  padding: 0.85rem 2rem;
  border-radius: 999px;
  font-weight: 500;
  font-size: 1rem;
  border: 1px solid var(--color-border);
  transition: all var(--transition);
}

.ctaSecondary:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
}

.scrollHint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-text-muted);
  font-size: 1.5rem;
  animation: bounce 2s infinite;
  opacity: 0.5;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px); }
}
```

- [ ] **Step 3: 创建 src/app/page.tsx**

```tsx
import Hero from '@/components/Hero/Hero'

export default function HomePage() {
  return <Hero />
}
```


---

### Task 4: 关于 + 技能页面

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/skills/page.tsx`
- Create: `src/components/SkillTag/SkillTag.tsx`
- Create: `src/components/SkillTag/SkillTag.module.css`

- [ ] **Step 1: 创建关于页面**

```tsx
// src/app/about/page.tsx
import type { Metadata } from 'next'
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: '关于 | Beck',
}

export default function AboutPage() {
  return (
    <>
      <SectionWrapper id="about" title="关于我" subtitle="我是谁，我在做什么">
        <div className={styles.grid}>
          <div className={styles.text}>
            <p>
              前端开发，现居国内。正在探索一人公司的路上，用代码建造产品。
            </p>
            <p>
              关注 AI、Agent、创意开发。喜欢把复杂的东西变得简单好用。
            </p>
            <p>
              当你看到这篇文章的时候，我可能正在研究一个新的 AI 项目，或者在写代码。
            </p>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>3+</span>
              <span className={styles.statLabel}>年开发经验</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>∞</span>
              <span className={styles.statLabel}>一人公司路上</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>每天</span>
              <span className={styles.statLabel}>建造中 🚀</span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="philosophy" title="建造理念" light>
        <div className={styles.philosophy}>
          <blockquote className={styles.quote}>
            "与其更好，不如不同。"
          </blockquote>
          <p className={styles.quoteSub}>—— 做有独特视角的产品</p>
        </div>
      </SectionWrapper>
    </>
  )
}
```

```css
/* src/app/about/about.module.css */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.text p {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  line-height: 1.8;
}

.stats {
  display: grid;
  gap: 2rem;
}

.stat {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 2rem;
  text-align: center;
  transition: border-color var(--transition);
}

.stat:hover {
  border-color: var(--color-primary);
}

.statNum {
  display: block;
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  background: var(--color-gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.statLabel {
  display: block;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.philosophy {
  text-align: center;
  padding: 2rem;
}

.quote {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
  font-style: normal;
}

.quoteSub {
  color: var(--color-text-muted);
  font-size: 1rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

- [ ] **Step 2: 创建技能页面**

```tsx
// src/app/skills/page.tsx
import type { Metadata } from 'next'
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper'
import SkillTag from '@/components/SkillTag/SkillTag'
import styles from './skills.module.css'

export const metadata: Metadata = {
  title: '技能 | Beck',
}

const skillGroups = [
  {
    label: '前端',
    skills: ['TypeScript', 'React', 'Next.js', 'CSS/SCSS', 'TailwindCSS', 'Vue 3'],
  },
  {
    label: '后端 & 工具',
    skills: ['Node.js', 'Python', 'REST API', 'GraphQL', 'Docker', 'Git'],
  },
  {
    label: 'AI & Agent',
    skills: ['LLM API', 'Prompt Engineering', 'LangChain.js', 'MCP', 'OpenAI API', 'AI Agent'],
  },
  {
    label: '部署 & 云',
    skills: ['Vercel', 'Cloudflare', 'GitHub Actions', 'PostgreSQL', 'Redis'],
  },
]

export default function SkillsPage() {
  return (
    <SectionWrapper id="skills" title="技能栈" subtitle="技术是我实现想法的工具">
      <div className={styles.groups}>
        {skillGroups.map(group => (
          <div key={group.label} className={styles.group}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <div className={styles.tags}>
              {group.skills.map(skill => (
                <SkillTag key={skill} name={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

```css
/* src/app/skills/skills.module.css */
.groups {
  display: grid;
  gap: 3rem;
}

.group {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 2rem;
}

.groupLabel {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-secondary);
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.8rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
```

- [ ] **Step 3: 创建 SkillTag 组件**

```tsx
// src/components/SkillTag/SkillTag.tsx
import styles from './SkillTag.module.css'

interface Props {
  name: string
}

export default function SkillTag({ name }: Props) {
  return <span className={styles.tag}>{name}</span>
}
```

```css
/* src/components/SkillTag/SkillTag.module.css */
.tag {
  display: inline-block;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition);
  cursor: default;
}

.tag:hover {
  border-color: var(--color-primary);
  color: var(--color-text);
  background: rgba(124, 58, 237, 0.1);
}
```


---

### Task 5: 产品展示页面

**Files:**
- Create: `src/data/products.ts`
- Create: `src/app/products/page.tsx`
- Create: `src/app/products/products.module.css`
- Create: `src/components/ProductCard/ProductCard.tsx`
- Create: `src/components/ProductCard/ProductCard.module.css`

- [ ] **Step 1: 创建产品数据**

```ts
// src/data/products.ts
export interface Product {
  name: string
  description: string
  longDescription: string
  tags: string[]
  status: 'live' | 'building' | 'idea'
  link?: string
  github?: string
  accentColor: string
}

export const products: Product[] = [
  {
    name: 'AI Shorts',
    description: 'AI 短视频内容生成工具',
    longDescription: '帮助内容创作者快速生成短视频脚本和创意，让创意到内容的路径缩短 10 倍。',
    tags: ['AI', '内容创作', '短视频'],
    status: 'building',
    accentColor: '#7c3aed',
  },
  {
    name: 'Obsidian Wiki',
    description: '个人知识管理系统',
    longDescription: '基于 Obsidian 的第二大脑，涵盖学习笔记、决策框架和商业思考。',
    tags: ['知识管理', 'Obsidian', 'PKM'],
    status: 'live',
    link: 'https://github.com/beck6lee/obsidian-record',
    github: 'https://github.com/beck6lee/obsidian-record',
    accentColor: '#38bdf8',
  },
  {
    name: '小红书 Agent',
    description: '自动化小红书内容运营',
    longDescription: '基于 LangChain.js + ReAct 模式的自动化内容生成和发布 Agent。',
    tags: ['AI Agent', '小红书', 'LangChain.js'],
    status: 'building',
    accentColor: '#f472b6',
  },
]
```

- [ ] **Step 2: 创建 ProductCard 组件**

```tsx
// src/components/ProductCard/ProductCard.tsx
import styles from './ProductCard.module.css'
import type { Product } from '@/data/products'

interface Props {
  product: Product
}

const statusLabel: Record<Product['status'], string> = {
  live: '已上线',
  building: '建造中',
  idea: '想法',
}

export default function ProductCard({ product }: Props) {
  return (
    <article className={styles.card} style={{ '--accent': product.accentColor } as React.CSSProperties}>
      <div className={styles.top}>
        <span className={styles.status} data-status={product.status}>{statusLabel[product.status]}</span>
      </div>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.desc}>{product.description}</p>
      <p className={styles.long}>{product.longDescription}</p>
      <div className={styles.tags}>
        {product.tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
      <div className={styles.links}>
        {product.link && (
          <a href={product.link} target="_blank" rel="noopener" className={styles.link}>
            访问 →
          </a>
        )}
        {product.github && (
          <a href={product.github} target="_blank" rel="noopener" className={styles.github}>
            GitHub
          </a>
        )}
      </div>
    </article>
  )
}
```

```css
/* src/components/ProductCard/ProductCard.module.css */
.card {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all var(--transition);
  border-top: 3px solid var(--accent);
}

.card:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status[data-status="live"] {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.status[data-status="building"] {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
}

.status[data-status="idea"] {
  background: rgba(148, 163, 184, 0.15);
  color: var(--color-text-muted);
}

.name {
  font-size: 1.4rem;
  color: var(--color-text);
}

.desc {
  font-weight: 600;
  color: var(--accent);
  font-size: 0.95rem;
}

.long {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
  flex: 1;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}

.links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.link {
  color: var(--accent);
  font-weight: 600;
  font-size: 0.9rem;
  transition: opacity var(--transition);
}

.link:hover { opacity: 0.8; }

.github {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  transition: color var(--transition);
}

.github:hover { color: var(--color-text); }
```

- [ ] **Step 3: 创建产品页面**

```tsx
// src/app/products/page.tsx
import type { Metadata } from 'next'
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper'
import ProductCard from '@/components/ProductCard/ProductCard'
import { products } from '@/data/products'
import styles from './products.module.css'

export const metadata: Metadata = {
  title: '产品 | Beck',
}

export default function ProductsPage() {
  const live = products.filter(p => p.status === 'live')
  const building = products.filter(p => p.status === 'building')
  const ideas = products.filter(p => p.status === 'idea')

  return (
    <SectionWrapper id="products" title="在做的事情" subtitle="一个正在建造中的一人公司">
      {building.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>🚧 建造中</h3>
          <div className={styles.grid}>
            {building.map(p => <ProductCard key={p.name} product={p} />)}
          </div>
        </div>
      )}

      {live.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>✅ 已上线</h3>
          <div className={styles.grid}>
            {live.map(p => <ProductCard key={p.name} product={p} />)}
          </div>
        </div>
      )}

      {ideas.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>💡 想法</h3>
          <div className={styles.grid}>
            {ideas.map(p => <ProductCard key={p.name} product={p} />)}
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}
```

```css
/* src/app/products/products.module.css */
.group {
  margin-bottom: 4rem;
}

.groupTitle {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```


---

### Task 6: 一周见闻页面

**Files:**
- Create: `src/data/weekly.ts`
- Create: `src/app/weekly/page.tsx`
- Create: `src/app/weekly/weekly.module.css`
- Create: `src/components/WeeklyCard/WeeklyCard.tsx`
- Create: `src/components/WeeklyCard/WeeklyCard.module.css`

- [ ] **Step 1: 创建一周见闻数据**

```ts
// src/data/weekly.ts
export interface WeeklyEntry {
  week: string
  date: string
  theme: string
  highlights: { title: string; content: string }[]
  mood: string
  nextWeek: string
}

export const weeklyEntries: WeeklyEntry[] = [
  {
    week: 'W16',
    date: '2026-04-13 ~ 2026-04-19',
    theme: '重新聚焦产品路线',
    mood: '⚡',
    highlights: [
      {
        title: '确定了核心产品方向',
        content: '把 AI Shorts 定为主攻方向，暂停其他几个 idea，专注一件事。学到「不做太多」比「做更多」重要。',
      },
      {
        title: '开始用 Next.js 重构个人主页',
        content: '把原来简单的静态页面升级为 Next.js 应用，交给 Agent 管理代码，为后续博客等功能打好基础。',
      },
      {
        title: '重新审视知识管理系统',
        content: 'Obsidian Wiki 整理了一个月后，发现有些笔记在「收藏」而不是「使用」。这周开始用渐进式写作来改进。',
      },
    ],
    nextWeek: '继续推进 AI Shorts，争取完成 MVP。读《The Momentum Manifesto》第二章。',
  },
]
```

- [ ] **Step 2: 创建 WeeklyCard 组件**

```tsx
// src/components/WeeklyCard/WeeklyCard.tsx
import styles from './WeeklyCard.module.css'
import type { WeeklyEntry } from '@/data/weekly'

interface Props {
  entry: WeeklyEntry
}

export default function WeeklyCard({ entry }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <span className={styles.week}>第 {entry.week} 周</span>
          <span className={styles.date}>{entry.date}</span>
        </div>
        <span className={styles.mood}>{entry.mood}</span>
      </div>
      <h3 className={styles.theme}>{entry.theme}</h3>
      <ul className={styles.highlights}>
        {entry.highlights.map((h, i) => (
          <li key={i}>
            <strong>{h.title}</strong>
            <p>{h.content}</p>
          </li>
        ))}
      </ul>
      <div className={styles.next}>
        <span className={styles.nextLabel}>下周计划</span>
        <p>{entry.nextWeek}</p>
      </div>
    </article>
  )
}
```

```css
/* src/components/WeeklyCard/WeeklyCard.module.css */
.card {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 2.5rem;
  border-left: 4px solid var(--color-primary);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.week {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  background: var(--color-gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: block;
}

.date {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  display: block;
  margin-top: 0.25rem;
}

.mood {
  font-size: 2rem;
}

.theme {
  font-size: 1.6rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  background: var(--color-gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.highlights {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.highlights li {
  border-left: 2px solid var(--color-border);
  padding-left: 1rem;
}

.highlights li strong {
  display: block;
  color: var(--color-text);
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.highlights li p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.next {
  background: var(--color-surface);
  border-radius: 8px;
  padding: 1.25rem;
}

.nextLabel {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  display: block;
  margin-bottom: 0.5rem;
}

.next p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}
```

- [ ] **Step 3: 创建一周见闻页面**

```tsx
// src/app/weekly/page.tsx
import type { Metadata } from 'next'
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper'
import WeeklyCard from '@/components/WeeklyCard/WeeklyCard'
import { weeklyEntries } from '@/data/weekly'
import styles from './weekly.module.css'

export const metadata: Metadata = {
  title: '一周见闻 | Beck',
}

export default function WeeklyPage() {
  return (
    <SectionWrapper id="weekly" title="一周见闻" subtitle="每周一次的复盘和记录，建造一人公司的过程">
      <div className={styles.list}>
        {weeklyEntries.map(entry => (
          <WeeklyCard key={entry.week} entry={entry} />
        ))}
      </div>
      <p className={styles.hint}>每周日晚更新，欢迎订阅关注 👀</p>
    </SectionWrapper>
  )
}
```

```css
/* src/app/weekly/weekly.module.css */
.list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hint {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-top: 3rem;
  opacity: 0.7;
}
```


---

### Task 7: 联系方式页面

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/app/contact/contact.module.css`

- [ ] **Step 1: 创建联系方式页面**

```tsx
// src/app/contact/page.tsx
import type { Metadata } from 'next'
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper'
import styles from './contact.module.css'

export const metadata: Metadata = {
  title: '联系 | Beck',
}

const links = [
  {
    label: 'GitHub',
    value: 'github.com/beck6lee',
    href: 'https://github.com/beck6lee',
    icon: '⌨',
  },
  {
    label: '邮箱',
    value: 'hi@beckli.top',
    href: 'mailto:hi@beckli.top',
    icon: '✉',
  },
]

export default function ContactPage() {
  return (
    <SectionWrapper id="contact" title="联系我" subtitle="合作、交流或只是想打个招呼">
      <div className={styles.grid}>
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener"
              className={styles.linkCard}
            >
              <span className={styles.icon}>{link.icon}</span>
              <div>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkValue}>{link.value}</span>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.message}>
          <h3 className={styles.msgTitle}>给我留言</h3>
          <p className={styles.msgText}>
            如果你有有趣的项目想法，或者只是想聊聊，我很愿意交流。
            现在回复可能不会太快，但看到一定会回 😊
          </p>
          <a href="mailto:hi@beckli.top" className={styles.cta}>
            发送邮件 ✉
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
```

```css
/* src/app/contact/contact.module.css */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.linkCard {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: all var(--transition);
}

.linkCard:hover {
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.icon {
  font-size: 1.5rem;
  width: 48px;
  height: 48px;
  background: var(--color-surface);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.linkLabel {
  display: block;
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.9rem;
}

.linkValue {
  display: block;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin-top: 0.15rem;
}

.message {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 2.5rem;
  text-align: center;
}

.msgTitle {
  font-size: 1.3rem;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.msgText {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.cta {
  display: inline-block;
  background: var(--color-gradient-1);
  color: white;
  padding: 0.85rem 2.5rem;
  border-radius: 999px;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(124, 58, 237, 0.4);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```


---

### Task 8: 收尾与部署

**Files:**
- Create: `README.md`
- Verify: 所有 pages 路由正确

- [ ] **Step 1: 添加 favicon（可选）**

在 `public/` 放一个 `favicon.ico` 或在 `layout.tsx` 加图标 link

- [ ] **Step 2: 本地验证构建**

Run: `cd ~/Documents/GitHub/beck-home && npm run build`
Expected: Build successful, no TypeScript errors

- [ ] **Step 3: 推送代码到 GitHub**

Run: `cd ~/Documents/GitHub/beck-home && git add -A && git commit -m "feat: Next.js 重构个人主页 - 活力创意风格"`
Run: `git push origin main`
Expected: Pushed to github.com/beck6lee/home

- [ ] **Step 4: Vercel 部署**

登录 vercel.com → Import GitHub repo beck6lee/home → Deploy
预计域名: beck-home.vercel.app 或 beckli.top（如果你配置了）

- [ ] **Step 5: 验证线上**

用浏览器打开部署后的 URL，确认所有页面正常加载

---

## Verification Checklist

- [ ] `/` 首页 Hero 有动画粒子背景
- [ ] `/about` 关于页面正常渲染
- [ ] `/skills` 技能标签全部显示
- [ ] `/products` 产品卡片正常渲染（building/live 状态）
- [ ] `/weekly` 一周见闻卡片正常渲染
- [ ] `/contact` 联系方式链接可点击
- [ ] 移动端导航菜单可展开
- [ ] 所有页面在暗色主题下视觉一致
- [ ] Vercel 部署成功，域名可访问
