import React from 'react'
import { Button } from '../../Button'

import styles from './BottomMenuComponents.module.scss'

interface StartButtonProps {
  onClick?: () => void
}

export const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-20">
      <Button onClick={onClick} color="green">
        + Start a room
      </Button>
    </div>
  )
}
