import React from 'react'
import Link from 'next/link'

import { Api } from '../../api'

import { Header, BackLink, HeaderAvatar } from '../../components/Header'
import { Room } from '../../components/Room'
import { wrapper } from '../../redux/store'
import { checkAuth } from '../../utils/checkAuth'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../redux/selectors'
import { GetServerSideProps } from 'next'

export default function RoomPages({ room }) {
  const userData = useSelector(selectUserData)

  return (
    <>
      <Header>
        <BackLink href="/rooms" />
        <Link href={`/profile/${userData?.username}`}>
          <a>
            <HeaderAvatar />
          </a>
        </Link>
      </Header>
      <Room title={room.title} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const user = await checkAuth(ctx)

    if (!user) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    const roomId = +ctx.query.id
    const room = await Api(ctx).getRoom(roomId)
    return {
      props: {
        room,
      },
    }
  } catch (error) {
    console.log('ERROR!')
    return {
      props: {},
      redirect: {
        destination: '/rooms',
        permanent: false,
      },
    }
  }
})
