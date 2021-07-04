import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Api } from '../api';
import Link from 'next/link';
import { checkAuth } from '../utils/checkAuth';
import { useDispatch, useSelector } from 'react-redux';
import { selectRooms, selectUserData } from '../redux/selectors';
import { wrapper } from '../redux/store';
import { setRooms, updateSpeakersInfo } from '../redux/slices/roomsSlice';
import { setUserData } from '../redux/slices/userSlice';
import { useSocket } from '../hooks/useSocket';
import { UserData } from '.';
import { Room } from '../api/RoomApi';

import { Header, SearchButton, CalendarButton, BellButton } from '../components/Header';
import { RoomCard } from '../components/RoomCard';
import { BottomMenu, StartButton } from '../components/BottomMenu';
import { StartRoomModal } from '../components/StartRoomModal';
import { InRoom } from '../components/BottomMenu/BottomMenuComponents/InRoom';
import { Avatar } from '../components/Avatar';

interface RoomsPageProps {
  user: UserData;
  rooms: Room[];
}

const RoomsPage: NextPage<RoomsPageProps> = ({ user, rooms }) => {
  const [visibleModal, setVisibleModal] = React.useState(false);
  console.log(user.isActive === 0);

  const socket = useSocket();
  const dispatch = useDispatch();

  React.useEffect(() => {
    socket.on('BECK#ROOM/UPDATE', ({ speakers, roomId }) => {
      dispatch(updateSpeakersInfo({ speakers, roomId }));
    });
  }, []);

  return (
    <>
      {visibleModal && <StartRoomModal onClose={() => setVisibleModal(false)} />}
      <Header>
        <SearchButton />
        <div className="d-flex align-items-center g-50">
          <CalendarButton />
          <BellButton />
          <Link href={`/profile/${user.id}`}>
            <a>
              <Avatar avatarUrl={user.avatarUrl} fullname={user.fullname} width="42" height="42" />
            </a>
          </Link>
        </div>
      </Header>
      <main className="container">
        <section className="roomsGrid">
          {rooms.map((obj) => (
            <Link key={obj.id} href={`/rooms/${obj.id}`}>
              <a>
                <RoomCard
                  title={obj.title}
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
        {/* <InRoom avatars={rooms[0].avatars} fullname={rooms[0].fullname} listenersCount={rooms[0].listenersCount} /> */}
      </BottomMenu>
    </>
  );
};

export default RoomsPage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const user = await checkAuth(ctx);
    ctx.store.dispatch(setUserData(user));

    if (!user) {
      throw new Error();
    }

    const rooms = await Api(ctx).getRooms();
    ctx.store.dispatch(setRooms(rooms));

    return {
      props: {
        user,
        rooms,
      },
    };
  } catch (error) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
});
