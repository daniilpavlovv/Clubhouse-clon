import React from 'react';
import { WelcomeStep } from '../components/steps/WelcomeStep';
import { EnterNameStep } from '../components/steps/EnterNameStep';
import { SocialAuthStep } from '../components/steps/SocialAuthStep';
import { ChooseAvatarStep } from '../components/steps/ChooseAvatarStep';
import { EnterPhoneStep } from '../components/steps/EnterPhoneStep';
import { EnterCodeStep } from '../components/steps/EnterCodeStep';
import { checkAuth } from '../utils/checkAuth';
import { Axios } from '../core/axios';
import { wrapper } from '../redux/store';
import router from 'next/router';

const stepsComponents = {
  0: WelcomeStep,
  1: SocialAuthStep,
  2: EnterNameStep,
  3: ChooseAvatarStep,
  4: EnterPhoneStep,
  5: EnterCodeStep,
};

export type UserData = {
  id: number;
  fullname: string;
  avatarUrl: string;
  isActive: number;
  username: string;
  phone: string;
  token: string;
};

type MainContextProps = {
  onNextStep: () => void;
  onKeyNext: () => void;
  onPreviousStep: () => void;
  onKeyBack: () => void;
  step: number;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  userData: UserData;
  setFieldValue: (field: keyof UserData, value: string) => void;
};

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

const getUserData = (): UserData | null => {
  try {
    return JSON.parse(window.localStorage.getItem('userData'));
  } catch (error) {
    return null;
  }
};

const getFormStep = (): number => {
  const json = getUserData();
  if (json) {
    if (json.token && json.isActive === 1) {
      router.push('/rooms');
    }
    if (json.isActive === 0) {
      return 4;
    }
  }
  return 0;
};

export default function Home() {
  const [step, setStep] = React.useState<number>(getFormStep());
  const Step = stepsComponents[step];

  const [userData, setUserData] = React.useState<UserData>();

  React.useEffect(() => {
    console.log(step);
  }, [step]);

  const onNextStep = () => {
    if (step < 5) {
      setStep((prev) => ++prev);
    }
  };

  const onPreviousStep = () => {
    setStep((prev) => --prev);
  };

  const setFieldValue = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onKeyNext = () => {
    React.useEffect(() => {
      const keyPressNext = (event) => {
        if (event.key === 'Enter') {
          onNextStep();
        }
      };

      document.addEventListener('keydown', keyPressNext);
      return () => document.removeEventListener('keydown', keyPressNext);
    }, []);
  };

  const onKeyBack = () => {
    React.useEffect(() => {
      const keyPressBack = (event) => {
        if (event.key === 'Escape') {
          onPreviousStep();
        }
      };

      document.addEventListener('keydown', keyPressBack);
      return () => document.removeEventListener('keydown', keyPressBack);
    }, []);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const json = getUserData();
      if (json) {
        setUserData(json);
        setStep(getFormStep());
      }
    }
  }, []);

  React.useEffect(() => {
    if (userData) {
      window.localStorage.setItem('userData', JSON.stringify(userData));
      Axios.defaults.headers.Authorization = 'Bearer ' + userData.token;
    }
  }, [userData]);

  return (
    <MainContext.Provider
      value={{
        step,
        onNextStep,
        onKeyNext,
        onPreviousStep,
        onKeyBack,
        userData,
        setUserData,
        setFieldValue,
      }}>
      <Step />
    </MainContext.Provider>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const user = await checkAuth(ctx);

    if (user.isActive) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: '/rooms',
        },
      };
    }
  } catch (error) {
    return { props: {} };
  }
});
