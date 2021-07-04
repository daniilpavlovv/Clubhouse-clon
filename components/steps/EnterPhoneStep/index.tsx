import React from 'react';
import { Axios } from '../../../core/axios';
import Div100vh from 'react-div-100vh';

import { HelperBlock } from '../../HelperBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { MainContext } from '../../../pages';
import { Header, BackButton } from '../../Header';
import NumberFormat from 'react-number-format';

import styles from './EnterPhoneStep.module.scss';

type InputValueState = {
  formattedValue: string;
  value: string;
};

export const EnterPhoneStep = () => {
  const { onNextStep, onPreviousStep, onKeyBack, setFieldValue } = React.useContext(MainContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState<InputValueState>({} as InputValueState);
  const nextDisabled = !values.formattedValue || values.formattedValue.includes('⁣');

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await Axios.get(`/auth/sms?phone=${values.value}`);
      setFieldValue('phone', values.value);
      onNextStep();
    } catch (error) {
      onNextStep();
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const keyPressNext = (event) => {
      if (event.key === 'Enter' && !nextDisabled) {
        onSubmit();
      }
    };

    document.addEventListener('keydown', keyPressNext);
    return () => document.removeEventListener('keydown', keyPressNext);
  }, [nextDisabled]);

  onKeyBack();

  return (
    <>
      <Header>
        <BackButton onClick={onPreviousStep} />
      </Header>
      <Div100vh className="centering">
        <HelperBlock>
          <StepInfo
            icon="/static/phone.png"
            title="Enter your phone"
            description="We will send you a confirmation code"
          />
          <div>
            <div className={styles.input}>
              <img src="/static/russian-flag.png" alt="flag" width={24} />
              <NumberFormat
                autoFocus
                className="field"
                format="# ### ### ## ##"
                mask="⁣"
                placeholder="8 111 222 33 44"
                value={values.value}
                onValueChange={({ formattedValue, value }) => setValues({ formattedValue, value })}
              />
            </div>
          </div>
          <div>
            <div className="btnWrapper">
              <Button className="btnNext" onClick={onSubmit} disabled={isLoading || nextDisabled}>
                {isLoading ? (
                  <>
                    Sending
                    <div className="loader"></div>
                  </>
                ) : (
                  <>
                    Next
                    <svg width="13" height="11" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 5.5a.786.786 0 01.786-.786h9.101L6.514 1.343A.787.787 0 117.626.23l4.714 4.714a.787.787 0 010 1.112L7.626 10.77a.787.787 0 01-1.112-1.113l3.373-3.371H.786A.786.786 0 010 5.5z"
                        fill="#fff"
                      />
                    </svg>
                  </>
                )}
              </Button>
            </div>
            <p className={styles.policyText}>
              By entering your number, you’re agreeing to our Terms of Service and Privacy Policy.
              Thanks!
            </p>
          </div>
        </HelperBlock>
      </Div100vh>
    </>
  );
};
