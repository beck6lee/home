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
