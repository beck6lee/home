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
