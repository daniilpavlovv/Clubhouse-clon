import React from 'react';
import clsx from 'clsx';

import styles from './Avatar.module.scss';

interface AvatarProps {
  avatarUrl?: string;
  width: string;
  height: string;
  className?: string;
  isVoice?: boolean;
  fullname: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  width,
  height,
  className,
  isVoice,
  fullname,
}) => {
  const avatarLetters = () => {
    if (!avatarUrl) {
      const name = fullname;
      const letters = name
        .split(/\s+/)
        .slice(0, 2)
        .map((s) => s[0].toUpperCase())
        .join('');
      return letters;
    }
  };

  return (
    <>
      <div className={styles.avatar__block}>
        <svg
          width={`${width}px`}
          height={`${height}px`}
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 100 100"
          fill="none"
          role="image"
          className={clsx(className, styles.avatar)}>
          <defs>
            <mask id="msk1">
              <rect fill="#000" />
              <g>
                <path
                  d="M0.5 50C0.5 30.5091 3.25846 18.1987 10.7286 10.7286C18.1987 3.25846 30.5091 0.5 50 0.5C69.4909 0.5 81.8014 3.25846 89.2714 10.7286C96.7415 18.1987 99.5 30.5091 99.5 50C99.5 69.4909 96.7415 81.8014 89.2714 89.2714C81.8014 96.7415 69.4909 99.5 50 99.5C30.5091 99.5 18.1987 96.7415 10.7286 89.2714C3.25846 81.8014 0.5 69.4909 0.5 50Z"
                  fill="#fff"
                  stroke="#c7c7c7"
                />
              </g>
            </mask>
          </defs>
          <svg viewBox="0 0 100 100" fill="none">
            <path
              d="M0.5 50C0.5 30.5091 3.25846 18.1987 10.7286 10.7286C18.1987 3.25846 30.5091 0.5 50 0.5C69.4909 0.5 81.8014 3.25846 89.2714 10.7286C96.7415 18.1987 99.5 30.5091 99.5 50C99.5 69.4909 96.7415 81.8014 89.2714 89.2714C81.8014 96.7415 69.4909 99.5 50 99.5C30.5091 99.5 18.1987 96.7415 10.7286 89.2714C3.25846 81.8014 0.5 69.4909 0.5 50Z"
              fill="#E0E0E0"
            />
          </svg>
          <image href={avatarUrl} width="100%" height="100%" mask="url(#msk1)" />
        </svg>
        <div
          className={clsx(
            styles.letters,
            +width === 42
              ? styles.letters__s
              : +width === 90
              ? styles.letters__m
              : +width === 100
              ? styles.letters__l
              : +width === 120
              ? styles.letters__xl
              : '',
          )}>
          {avatarLetters()}
        </div>
      </div>
    </>
  );
};
