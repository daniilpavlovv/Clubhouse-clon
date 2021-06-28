import React from 'react'

import styles from './HeaderComponents.module.scss'

interface BellButtonProps {}

export const BellButton: React.FC<BellButtonProps> = ({}) => {
  return (
    <button className={styles.button}>
      <img src="/static/bell.svg" alt="Bell" />
    </button>
  )
}
