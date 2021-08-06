import React from 'react';
import clsx from 'clsx';
import numbro from 'numbro';

import { Avatar } from '../Avatar';

import styles from './RoomCard.module.scss';
import { UserData } from '../../pages';

interface RoomCardProps {
  title: string;
  speakers: UserData[];
  listenersCount: number;
}

export const RoomCard: React.FC<RoomCardProps> = ({ title, speakers = [], listenersCount }) => {
  // const randomAvatars = avatars.sort(() => 0.5 - Math.random()).slice(0, 2)
  // const listenersRoundedCount = numbro(listenersCount).format({ mantissa: 1, average: true })

  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{title}</h4>
      </div>
      <div className={clsx('d-flex', styles.content)}>
        <div className={styles.avatars}>
          {speakers.map((user, i) => (
            <Avatar
              key={user.avatarUrl}
              avatarUrl={user.avatarUrl}
              fullname={user.fullname}
              width="50"
              height="50"
              className={speakers.length > 1 && i === speakers.length - 1 ? 'lastAvatar' : 'first'}
            />
          ))}
        </div>
        <div className={clsx(styles.info)}>
          <ul className={styles.listeners}>
            {speakers.map((user, i) => (
              <li key={user.username + i}>
                <div>{user.fullname}</div>
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
    </div>
  );
};
