import React from 'react'
import { Axios } from '../../../core/axios'
import clsx from 'clsx'
import NumberFormat from 'react-number-format'
import Div100vh from 'react-div-100vh'

import { HelperBlock } from '../../HelperBlock'
import { Button } from '../../Button'
import { StepInfo } from '../../StepInfo'
import { MainContext } from '../../../pages'
import { Header, BackButton } from '../../Header'

import styles from './EnterPhoneStep.module.scss'

type InputValueState = {
  formattedValue: string
  value: string
}

export const EnterPhoneStep = () => {
  const { onNextStep, onPreviousStep, setFieldValue } = React.useContext(MainContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [values, setValues] = React.useState<InputValueState>({} as InputValueState)

  const nextDisabled = !values.formattedValue || values.formattedValue.includes('⁣')

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await Axios.get(`/auth/sms?phone=${values.value}`)
      setFieldValue('phone', values.value)
      onNextStep()
    } catch (error) {
      console.warn('Error Sending SMS', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header className="header__fixed">
        <BackButton onClick={onPreviousStep} />
      </Header>
      <Div100vh className="centering">
        <HelperBlock className={styles.HelperBlock}>
          <StepInfo
            icon="/static/phone.png"
            title="Enter your phone"
            description="We will send you a confirmation code"
          />
          <div>
            <div className={clsx(styles.input, 'd-ib')}>
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
            <div className="d-grid justify-content-center">
              <Button onClick={onSubmit} disabled={isLoading || nextDisabled}>
                {isLoading ? (
                  'Sending...'
                ) : (
                  <>
                    Next
                    <img className="ml-5" src="/static/arrow.svg" />{' '}
                  </>
                )}
              </Button>
            </div>
            <p className={clsx(styles.policyText, 'mt-15')}>
              By entering your number, you’re agreeing to our Terms of Service and Privacy Policy.
              Thanks!
            </p>
          </div>
        </HelperBlock>
      </Div100vh>
    </>
  )
}
