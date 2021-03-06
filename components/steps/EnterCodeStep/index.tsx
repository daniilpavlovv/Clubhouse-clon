import React from 'react';
import { Axios } from '../../../core/axios';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Div100vh from 'react-div-100vh';
import ReactCodeInput from 'react-verification-code-input-2';

import { HelperBlock } from '../../HelperBlock';
import { StepInfo } from '../../StepInfo';
import { MainContext } from '../../../pages';
import { Header, BackButton } from '../../Header';

import styles from './EnterCodeStep.module.scss';

export const EnterCodeStep: React.FC = () => {
  const { onPreviousStep, onKeyBack, userData } = React.useContext(MainContext);
  const router = useRouter();
  const [codes, setCodes] = React.useState(['', '', '', '']);
  const [incorrectCode, setIncorrectCode] = React.useState<boolean>(false);

  const onSubmit = async (code: string) => {
    try {
      console.log(code);
      setIncorrectCode(false);
      await Axios.post(`/auth/sms/activate`, {
        code,
        user: userData,
      });
      router.push('/rooms');
    } catch (error) {
      setCodes(['', '', '', '']);
      setIncorrectCode(true);
    }
  };

  onKeyBack();

  return (
    <>
      <Header>
        <BackButton onClick={onPreviousStep} />
      </Header>
      <Div100vh className="centering">
        <HelperBlock>
          <StepInfo
            icon="/static/numbers.png"
            title="Enter your activate code"
            description="We sent you a confirmation code"
          />
          <ReactCodeInput
            type={'number'}
            fields={4}
            onComplete={onSubmit}
            values={codes}
            className={clsx(styles.codeInput, incorrectCode ? styles.failed : '')}
          />
        </HelperBlock>
      </Div100vh>
    </>
  );
};
