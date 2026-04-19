import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard/ProductCard'
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper'
import styles from './products.module.css'

export default function ProductsPage() {
  const live = products.filter((p) => p.status === 'live')
  const building = products.filter((p) => p.status === 'building')
  const idea = products.filter((p) => p.status === 'idea')

  return (
    <SectionWrapper title='产品' subtitle='_side projects'>
      {building.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>🚧 建造中</h3>
          <div className={styles.grid}>
            {building.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      )}
      {live.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>✅ 已上线</h3>
          <div className={styles.grid}>
            {live.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      )}
      {idea.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>💡 想法</h3>
          <div className={styles.grid}>
            {idea.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}
