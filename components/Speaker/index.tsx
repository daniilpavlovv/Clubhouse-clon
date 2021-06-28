import React from 'react'

import { Avatar } from '../Avatar'

import styles from './Speaker.module.scss'

export interface SpeakerProps {
  fullname: string
  avatarUrl: string
}

export const Speaker: React.FC<SpeakerProps> = ({ fullname, avatarUrl }) => {
  return (
    <div>
      <Avatar width="90" height="90" src={avatarUrl} fullname={fullname} />
      <div className="">{fullname}</div>
    </div>
  )
}
