import type { Metadata } from 'next'
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper'
import styles from './contact.module.css'

export const metadata: Metadata = {
  title: '联系方式 | Beck',
}

export default function ContactPage() {
  return (
    <SectionWrapper id="contact" title="联系我" subtitle="合作、交流或只是想打个招呼">
      <div className={styles.grid}>
        <div className={styles.links}>
          <a
            href="https://github.com/beck6lee"
            target="_blank"
            rel="noopener"
            className={styles.linkCard}
          >
            <div className={styles.icon}>⌉</div>
            <div>
              <span className={styles.linkLabel}>GitHub</span>
              <span className={styles.linkValue}>github.com/beck6lee</span>
            </div>
          </a>
          <a href="mailto:hi@beckli.top" className={styles.linkCard}>
            <div className={styles.icon}>✉</div>
            <div>
              <span className={styles.linkLabel}>邮箱</span>
              <span className={styles.linkValue}>hi@beckli.top</span>
            </div>
          </a>
        </div>
        <div className={styles.message}>
          <h3 className={styles.msgTitle}>给我留言</h3>
          <p className={styles.msgText}>
            如果你有有趣的项目想法，或者只是想聊聊，我很愿意交流。现在回复可能不会太快，但看到一定会回 😊
          </p>
          <a href="mailto:hi@beckli.top" className={styles.cta}>
            发送邮件 ✉
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
