import React from 'react';
import Link from 'next/link';
import { wrapper } from '../../redux/store';
import { checkAuth } from '../../utils/checkAuth';
import { GetServerSideProps, NextPage } from 'next';
import { UserData } from '..';
import { Room as RoomProps } from '../../api/RoomApi';

import { Api } from '../../api';

import { Header, BackLink } from '../../components/Header';
import { Room } from '../../components/Room';
import { Avatar } from '../../components/Avatar';

interface RoomPagesProps {
  user: UserData;
  room: RoomProps;
}

const RoomPages: NextPage<RoomPagesProps> = ({ user, room }) => {
  return (
    <>
      <Header>
        <BackLink href="/rooms" />
        <Link href={`/profile/${user.username}`}>
          <a>
            <Avatar avatarUrl={user.avatarUrl} fullname={user.fullname} width="42" height="42" />
          </a>
        </Link>
      </Header>
      <Room title={room.title} />
    </>
  );
};

export default RoomPages;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const user = await checkAuth(ctx);

    if (!user) {
      throw new Error();
    }

    const roomId = Number(ctx.query.id);
    const room = await Api(ctx).getRoom(roomId);

    return {
      props: {
        user,
        room,
      },
    };
  } catch (error) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/rooms',
      },
    };
  }
});
