import styles from './ProductCard.module.css'
import type { Product } from '@/data/products'
import type { CSSProperties } from 'react'
interface Props {
  product: Product
}

const statusLabels = {
  live: '已上线',
  building: '建造中',
  idea: '想法',
} as const

export default function ProductCard({ product }: Props) {
  return (
    <article className={styles.card} style={{ '--accent': product.accentColor } as CSSProperties}>
      <div className={styles.top}>
        <span className={styles.status} data-status={product.status}>
          {statusLabels[product.status]}
        </span>
      </div>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.desc}>{product.description}</p>
      <p className={styles.long}>{product.longDescription}</p>
      <div className={styles.tags}>
        {product.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.links}>
        {product.link && (
          <a href={product.link} className={styles.link} target='_blank' rel='noopener noreferrer'>
            访问 →
          </a>
        )}
        {product.github && (
          <a href={product.github} className={styles.github} target='_blank' rel='noopener noreferrer'>
            GitHub
          </a>
        )}
      </div>
    </article>
  )
}
