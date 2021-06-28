import clsx from 'clsx'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../redux/selectors'

import { Avatar } from '../Avatar'
import { Button } from '../Button'

import styles from './Profile.module.scss'

interface ProfileProps {
  about: string
}

export const Profile: React.FC<ProfileProps> = ({ about }) => {
  const userData = useSelector(selectUserData)
  return (
    <>
      <div className="align-items-center">
        <div className="d-flex align-items-end justify-content-between">
          <Avatar width="100" height="100" />
          <Button className="styles.followButton" color="blue">
            Follow
          </Button>
        </div>
        <div className="d-flex flex-column mt-20 mb-20">
          <h2 className="mt-0 mb-15">{userData.fullname}</h2>
          <h3 className={clsx(styles.username, 'mt-0 mb-0 username')}>@{userData.username}</h3>
        </div>
      </div>
      <p className={styles.about}>{about}</p>
    </>
  )
}
