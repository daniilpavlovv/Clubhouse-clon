import React from 'react';
import numbro from 'numbro';
import { Avatar } from '../../Avatar';

import styles from './BottomMenuComponents.module.scss';

interface InRoomProps {
  avatars: string[];
  fullname: string;
  listenersCount: string;
}

export const InRoom: React.FC<InRoomProps> = ({ avatars = [], fullname, listenersCount }) => {
  const randomAvatars = avatars.sort(() => 0.5 - Math.random()).slice(0, 2);
  const listenersRoundedCount = numbro(listenersCount).format({ average: true });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.avatars}>
          {randomAvatars.map((url, i) => (
            <Avatar
              key={url}
              avatarUrl={url}
              fullname={fullname}
              width="42"
              height="42"
              className={
                randomAvatars.length > 1 && i === randomAvatars.length - 1 ? 'lastAvatar' : 'first'
              }
            />
          ))}
          <div className={styles.counter}>
            <div className={styles.listenersCount}>+{listenersRoundedCount}</div>
            <svg width="42px" height="42px" viewBox="0 0 100 100" fill="none">
              <path
                d="M0.5 50C0.5 30.5091 3.25846 18.1987 10.7286 10.7286C18.1987 3.25846 30.5091 0.5 50 0.5C69.4909 0.5 81.8014 3.25846 89.2714 10.7286C96.7415 18.1987 99.5 30.5091 99.5 50C99.5 69.4909 96.7415 81.8014 89.2714 89.2714C81.8014 96.7415 69.4909 99.5 50 99.5C30.5091 99.5 18.1987 96.7415 10.7286 89.2714C3.25846 81.8014 0.5 69.4909 0.5 50Z"
                fill="#E0E0E0"
              />
            </svg>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button__leave}>
            <img width="24px" height="24px" src="/static/peace.png" alt="Leave" />
          </button>
          <button className={styles.button__raiseHand}>
            <img width="24px" height="24px" src="/static/raised-hand.png" alt="Raise a hand" />
          </button>
        </div>
      </div>
    </>
  );
};
