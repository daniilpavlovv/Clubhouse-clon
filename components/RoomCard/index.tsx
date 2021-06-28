import React from 'react'
import clsx from 'clsx'
import numbro from 'numbro'

import { Avatar } from '../Avatar'

import styles from './RoomCard.module.scss'

interface RoomCardProps {
  title: string
  speakers: string[]
  avatars: string[]
  listenersCount: number
}

export const RoomCard: React.FC<RoomCardProps> = ({
  title,
  speakers = [],
  avatars = [],
  listenersCount,
}) => {
  // // const randomAvatars = avatars.sort(() => 0.5 - Math.random()).slice(0, 2)
  // const listenersRoundedCount = numbro(listenersCount).format({ mantissa: 1, average: true })

  return (
    <article className={styles.card}>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{title}</h4>
      </div>
      <div className={clsx('d-flex', styles.content)}>
        <div className={styles.avatars}>
          {avatars.map((url, i) => (
            <Avatar
              key={url}
              width="50"
              height="50"
              src={url}
              className={avatars.length > 1 && i === avatars.length - 1 ? 'lastAvatar' : 'first'}
            />
          ))}
        </div>
        <div className={clsx(styles.info)}>
          <ul className={styles.listeners}>
            {speakers.map((name, i) => (
              <li key={name + i}>
                <div>{name}</div>
                <img src="/static/cloud.png" alt="Cloud" width={16} height={16} />
              </li>
            ))}
          </ul>
          <div className="d-flex">
            <ul className={styles.details}>
              <li>
                {listenersCount}
                <img src="/static/listeners.svg" alt="Listeners count" width={10} height={10} />
              </li>
            </ul>
            <ul className={styles.details}>
              <li>
                {speakers.length}
                <img src="/static/speakers.svg" alt="Speakers count" width={10} height={10} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}
