import React from 'react';
import { Api } from '../../api';
import { wrapper } from '../../redux/store';
import { checkAuth } from '../../utils/checkAuth';
import { GetServerSideProps, NextPage } from 'next';
import { UserData } from '..';

import { Header, BackLink, MoreButton } from '../../components/Header';
import { Profile } from '../../components/Profile';

interface ProfilePageProps {
  profileData: UserData;
}

const ProfilePages: NextPage<ProfilePageProps> = ({ profileData }) => {
  return (
    <>
      <Header>
        <BackLink href="/rooms" />
        <MoreButton />
      </Header>
      <div className="container">
        <Profile
          avatarUrl={profileData.avatarUrl}
          fullname={profileData.fullname}
          username={profileData.username}
          about="About"
        />
      </div>
    </>
  );
};

export default ProfilePages;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const user = await checkAuth(ctx);

    const userId = Number(ctx.query.id);
    const profileData = await Api(ctx).getUserInfo(userId);

    if (!user || !profileData) {
      throw new Error();
    }

    return {
      props: {
        profileData,
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
