import React from 'react'
import Div100vh from 'react-div-100vh'

import { HelperBlock } from '../../HelperBlock'
import { Button } from '../../Button'
import { MainContext } from '../../../pages'

import styles from './WelcomeStep.module.scss'

export const WelcomeStep: React.FC = () => {
  const { onNextStep } = React.useContext(MainContext)

  return (
    <Div100vh className="centering">
      <HelperBlock className={styles.block}>
        <h3 className={styles.title}>
          <img className={styles.handWaveImg} src="/static/hand-wave.png" alt="Celebration" />
          Welcome to Clubhouse!
        </h3>
        <p className={styles.subtitle}>
          Hey, we're opening, and anyone can join us with or without an invitation!
        </p>
        <div className="d-grid justify-content-center">
          <Button onClick={onNextStep}>
            Get started
            <img className="ml-5" src="/static/arrow.svg" />
          </Button>
        </div>
      </HelperBlock>
    </Div100vh>
  )
}
