import React from 'react';
import clsx from 'clsx';

import { Avatar } from '../Avatar';
import { Button } from '../Button';

import styles from './Profile.module.scss';

interface ProfileProps {
  avatarUrl: string;
  fullname: string;
  username: string;
  about: string;
}

export const Profile: React.FC<ProfileProps> = ({ avatarUrl, fullname, username, about }) => {
  return (
    <>
      <div className="align-items-center">
        <div className="d-flex align-items-end justify-content-between">
          <Avatar avatarUrl={avatarUrl} fullname={fullname} width="100" height="100" />
          <Button className="styles.followButton" color="blue">
            Follow
          </Button>
        </div>
        <div className="d-flex flex-column mt-20 mb-20">
          <h2 className="mt-0 mb-15">{fullname}</h2>
          <h3 className={clsx(styles.username, 'mt-0 mb-0 username')}>@{username}</h3>
        </div>
      </div>
      <p className={styles.about}>{about}</p>
    </>
  );
};
