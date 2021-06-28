import React from 'react'
import clsx from 'clsx'

import styles from './BottomMenu.module.scss'

interface BottomMenu {
  className?: string
}
export const BottomMenu: React.FC<BottomMenu> = ({ className, children }) => {
  return (
    <menu className={clsx(className, styles.menu)}>
      <div className={styles.menu__inner}>{children}</div>
    </menu>
  )
}
