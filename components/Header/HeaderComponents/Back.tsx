import React from 'react';
import Link from 'next/link';

import styles from './HeaderComponents.module.scss';

interface BackProps {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const BackButton: React.FC<BackProps> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <svg
        width="32"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4f4f4f"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
};

export const BackLink: React.FC<BackProps> = ({ href }) => {
  return (
    <Link href={href}>
      <a className={styles.button}>
        <svg
          width="32"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4f4f4f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </a>
    </Link>
  );
};
