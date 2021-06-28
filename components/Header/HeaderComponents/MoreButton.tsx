import React from 'react'

import styles from './HeaderComponents.module.scss'

interface MoreButtonProps {
  href?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const MoreButton: React.FC<MoreButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img src="/static/more-horizontal.svg" alt="More" />
    </button>
  )
}
