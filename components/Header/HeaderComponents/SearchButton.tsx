import React from 'react'

import styles from './HeaderComponents.module.scss'

interface SearchButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img src="/static/search.svg" alt="Search" />
    </button>
  )
}
