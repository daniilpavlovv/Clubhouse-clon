import React from 'react'
import Link from 'next/link'

import styles from './HeaderComponents.module.scss'

interface BackProps {
  href?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const BackButton: React.FC<BackProps> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img src="/static/chevron-left.svg" alt="Back" />
    </button>
  )
}

export const BackLink: React.FC<BackProps> = ({ href }) => {
  return (
    <Link href={href} passHref>
      <a>
        <img src="/static/chevron-left.svg" alt="Back" />
      </a>
    </Link>
  )
}
