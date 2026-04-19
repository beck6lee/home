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
