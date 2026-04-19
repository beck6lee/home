'use client'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' },
  { href: '/skills', label: '技能' },
  { href: '/products', label: '产品' },
  { href: '/weekly', label: '一周见闻' },
  { href: '/contact', label: '联系' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>BECK</a>
        <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)} aria-label="菜单">
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
        </button>
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
