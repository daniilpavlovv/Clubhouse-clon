import React from 'react';

import { Avatar } from '../Avatar';

import styles from './Speaker.module.scss';

export interface SpeakerProps {
  avatarUrl?: string;
  fullname: string;
}

export const Speaker: React.FC<SpeakerProps> = ({ avatarUrl, fullname }) => {
  return (
    <div>
      <Avatar avatarUrl={avatarUrl} fullname={fullname} width="90" height="90" />
      <div className="">{fullname}</div>
    </div>
  );
};
