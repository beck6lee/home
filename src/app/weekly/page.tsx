import SectionWrapper from '@/components/SectionWrapper/SectionWrapper'
import WeeklyCard from '@/components/WeeklyCard/WeeklyCard'
import { weeklyEntries } from '@/data/weekly'
import styles from './weekly.module.css'

export default function WeeklyPage() {
  return (
    <SectionWrapper
      title="一周见闻"
      subtitle="每周一次的复盘和记录，建造一人公司的过程"
    >
      <div className={styles.list}>
        {weeklyEntries.map((entry, index) => (
          <WeeklyCard key={index} entry={entry} />
        ))}
      </div>
      <p className={styles.hint}>每周日晚更新，欢迎订阅关注 👀</p>
    </SectionWrapper>
  )
}
