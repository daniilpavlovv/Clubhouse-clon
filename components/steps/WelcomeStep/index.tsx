import React from 'react';
import Div100vh from 'react-div-100vh';

import { HelperBlock } from '../../HelperBlock';
import { Button } from '../../Button';
import { MainContext } from '../../../pages';

import styles from './WelcomeStep.module.scss';

export const WelcomeStep: React.FC = () => {
  const { onNextStep, onKeyNext } = React.useContext(MainContext);

  onKeyNext();

  return (
    <Div100vh className="centering">
      <HelperBlock>
        <h3 className={styles.title}>
          <img className={styles.handWaveImg} src="/static/hand-wave.png" alt="Hand Wave" />
          Welcome to Clubhouse!
        </h3>
        <p className={styles.subtitle}>
          Hey, we're opening, and anyone can join us with or without an invitation!
        </p>
        <div className="btnWrapper">
          <Button className="btnNext" onClick={onNextStep}>
            Get started
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
  );
};
