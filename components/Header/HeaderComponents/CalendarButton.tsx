import React from 'react'

import styles from './HeaderComponents.module.scss'

interface CalendarButtonProps {}

export const CalendarButton: React.FC<CalendarButtonProps> = ({}) => {
  return (
    <button className={styles.button}>
      <img src="/static/calendar.svg" alt="Calendar" />
    </button>
  )
}
