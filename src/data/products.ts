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
