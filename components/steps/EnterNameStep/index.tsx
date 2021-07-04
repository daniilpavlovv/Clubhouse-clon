import React from 'react';
import Div100vh from 'react-div-100vh';

import { HelperBlock } from '../../HelperBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { MainContext } from '../../../pages';
import { Header, BackButton } from '../../Header';

import styles from './EnterNameStep.module.scss';

export const EnterNameStep = () => {
  const { onNextStep, onKeyNext, onPreviousStep, onKeyBack, userData, setFieldValue } =
    React.useContext(MainContext);
  const [inputValue, setInputValue] = React.useState<string>(userData ? userData.fullname : '');
  const nextDisabled = !inputValue || inputValue.length < 5;

  const hendleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onClickNextStep = () => {
    setFieldValue('fullname', inputValue);
    onNextStep();
  };

  onKeyNext();
  onKeyBack();

  return (
    <>
      <Header>
        <BackButton onClick={onPreviousStep} />
      </Header>
      <Div100vh className="centering">
        <HelperBlock>
          <StepInfo
            icon="/static/man.png"
            title="What’s your full name?"
            description="People use real names on Clubhouse :)"
          />
          <div className={styles.input}>
            <input
              autoFocus
              onChange={hendleChangeInput}
              value={inputValue}
              maxLength={30}
              className="field"
              placeholder="Enter Fullname"
              spellCheck="false"
            />
          </div>
          <div className="btnWrapper">
            <Button className="btnNext" disabled={nextDisabled} onClick={onClickNextStep}>
              Next
              <svg width="13" height="11" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 5.5a.786.786 0 01.786-.786h9.101L6.514 1.343A.787.787 0 117.626.23l4.714 4.714a.787.787 0 010 1.112L7.626 10.77a.787.787 0 01-1.112-1.113l3.373-3.371H.786A.786.786 0 010 5.5z"
                  fill="#fff"
                />
              </svg>
            </Button>
          </div>
        </HelperBlock>
      </Div100vh>
    </>
  );
};
