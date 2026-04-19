import styles from './WeeklyCard.module.css'
import type { WeeklyEntry } from '@/data/weekly'

interface Props {
  entry: WeeklyEntry
}

export default function WeeklyCard({ entry }: Props) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div>
          <span className={styles.week}>{entry.week}</span>
          <span className={styles.date}>{entry.date}</span>
        </div>
        <span className={styles.mood}>{entry.mood}</span>
      </header>

      <h3 className={styles.theme}>{entry.theme}</h3>

      <ul className={styles.highlights}>
        {entry.highlights.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong>
            <p>{item.content}</p>
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
