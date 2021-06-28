import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../redux/selectors'
import io, { Socket } from 'socket.io-client'
import { useRouter } from 'next/router'
import { UserData } from '../../pages'

import { Speaker } from '../Speaker'

import styles from './Room.module.scss'

interface RoomProps {
  title: string
}

export const Room: React.FC<RoomProps> = ({ title }) => {
  const [users, setUsers] = React.useState<UserData[]>([])

  const user = useSelector(selectUserData)
  const router = useRouter()
  const socketRef = React.useRef<typeof Socket>()

  React.useEffect(() => {
    socketRef.current = io('http://192.168.31.75:3001')

    socketRef.current.emit('FRONT@ROOM/USER_JOIN', {
      roomId: router.query.id,
      user,
    })

    socketRef.current.on('BECK#ROOM/USER_LEAVE', (user: UserData) => {
      setUsers((prev) => prev.filter((obj) => obj.id !== user.id))
    })

    socketRef.current.on('BECK#ROOM/USER_JOIN', (allUsers) => {
      setUsers(allUsers)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  return (
    <>
      <div className={styles.wrapper}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h2>{title}</h2>
          </div>

          <div className="users">
            {/* {isLoading && <div className="loader"></div>} */}
            {users.map((obj) => (
              <Speaker {...obj} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
