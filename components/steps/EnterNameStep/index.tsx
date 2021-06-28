import React from 'react'
import Div100vh from 'react-div-100vh'

import { HelperBlock } from '../../HelperBlock'
import { Button } from '../../Button'
import { StepInfo } from '../../StepInfo'
import { MainContext } from '../../../pages'
import { Header, BackButton } from '../../Header'

import styles from './EnterNameStep.module.scss'

export const EnterNameStep = () => {
  const { onNextStep, onPreviousStep, userData, setFieldValue } = React.useContext(MainContext)
  const [inputValue, setInputValue] = React.useState<string>(userData ? userData.fullname : '')
  const nextDisabled = !inputValue || inputValue.length < 5

  const hendleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onClickNextStep = () => {
    setFieldValue('fullname', inputValue)
    onNextStep()
  }

  return (
    <>
      <Header className="header__fixed">
        <BackButton onClick={onPreviousStep} />
      </Header>
      <Div100vh className="centering">
        <HelperBlock className={styles.block}>
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
          <div className="d-grid justify-content-center">
            <Button disabled={nextDisabled} onClick={onClickNextStep}>
              Next
              <img className="ml-5" src="/static/arrow.svg" />
            </Button>
          </div>
        </HelperBlock>
      </Div100vh>
    </>
  )
}
