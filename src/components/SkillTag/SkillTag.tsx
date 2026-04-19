import styles from './SkillTag.module.css'

interface Props {
  name: string
}

export default function SkillTag({ name }: Props) {
  return <span className={styles.tag}>{name}</span>
}
