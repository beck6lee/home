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
