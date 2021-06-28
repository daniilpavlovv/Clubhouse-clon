import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Api } from '../api'
import Link from 'next/link'
import { checkAuth } from '../utils/checkAuth'
import { useSelector } from 'react-redux'
import { selectRooms, selectUserData } from '../redux/selectors'
import { wrapper } from '../redux/store'
import { setRooms } from '../redux/slices/roomsSlice'

import {
  Header,
  SearchButton,
  CalendarButton,
  BellButton,
  HeaderAvatar,
} from '../components/Header'
import { RoomCard } from '../components/RoomCard'
import { BottomMenu, StartButton } from '../components/BottomMenu'
import { StartRoomModal } from '../components/StartRoomModal'
import { InRoom } from '../components/BottomMenu/BottomMenuComponents/InRoom'
import { setUserData } from '../redux/slices/userSlice'

const RoomsPage: NextPage = () => {
  const [visibleModal, setVisibleModal] = React.useState(false)

  const userData = useSelector(selectUserData)
  const rooms = useSelector(selectRooms)

  return (
    <>
      {visibleModal && <StartRoomModal onClose={() => setVisibleModal(false)} />}
      <Header>
        <SearchButton />
        <div className="d-flex align-items-center g-50">
          <CalendarButton />
          <BellButton />
          <Link href={`/profile/${userData.username}`}>
            <a>
              <HeaderAvatar />
            </a>
          </Link>
        </div>
      </Header>
      <main className="container">
        <section className="rooms grid">
          {rooms.map((obj) => (
            <Link key={obj.id} href={`/rooms/${obj.id}`}>
              <a>
                <RoomCard
                  title={obj.title}
                  avatars={[]}
                  speakers={obj.speakers}
                  listenersCount={obj.listenersCount}
                />
              </a>
            </Link>
          ))}
        </section>
      </main>
      <BottomMenu>
        <StartButton onClick={() => setVisibleModal(true)} />
        {/* <InRoom avatars={rooms[0].avatars} listenersCount={rooms[0].listenersCount} /> */}
      </BottomMenu>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const user = await checkAuth(ctx)
    ctx.store.dispatch(setUserData(user))

    if (!user) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    const rooms = await Api(ctx).getRooms()
    ctx.store.dispatch(setRooms(rooms))

    return {
      props: {},
    }
  } catch (error) {
    console.log('ERROR!')
    return {
      props: {
        rooms: [],
      },
    }
  }
})

export default RoomsPage
