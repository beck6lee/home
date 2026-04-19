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
