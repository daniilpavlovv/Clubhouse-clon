import React from 'react'
import clsx from 'clsx'

import styles from './Header.module.scss'

interface Header {
  className?: string
}

export const Header: React.FC<Header> = ({ className, children }) => {
  const [scroll, setScroll] = React.useState<boolean>(false)

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 17)
    })
  }, [])

  return (
    <header className={clsx(className, styles.header, scroll ? styles.header__onscroll : '')}>
      <div className={styles.header__inner}>{children}</div>
    </header>
  )
}
