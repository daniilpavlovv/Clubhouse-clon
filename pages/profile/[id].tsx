import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../redux/selectors'

import { Profile } from '../../components/Profile'
import { wrapper } from '../../redux/store'
import { checkAuth } from '../../utils/checkAuth'
import { GetServerSideProps } from 'next'
import { Header, BackLink, MoreButton } from '../../components/Header'

export default function ProfilePages() {
  return (
    <>
      <Header>
        <BackLink href="/rooms" />
        <MoreButton />
      </Header>
      <div className="container">
        <Profile about="About" />
      </div>
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

    return {
      props: {},
    }
  } catch (error) {
    console.log('ERROR!')
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/rooms',
      },
    }
  }
})
