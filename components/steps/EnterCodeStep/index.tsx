import React from 'react'
import { Axios } from '../../../core/axios'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Div100vh from 'react-div-100vh'

import { HelperBlock } from '../../HelperBlock'
import { StepInfo } from '../../StepInfo'
import { MainContext } from '../../../pages'
import { Header, BackButton } from '../../Header'

import styles from './EnterCodeStep.module.scss'

export const EnterCodeStep: React.FC = () => {
  const { onPreviousStep, userData } = React.useContext(MainContext)
  const router = useRouter()
  const [codes, setCodes] = React.useState(['', '', '', ''])
  const [incorrectCode, setIncorrectCode] = React.useState<boolean>(false)

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = +event.target.getAttribute('id')
    const value = event.target.value
    setCodes((prev) => {
      const newArr = [...prev]
      newArr[index] = value
      return newArr
    })
    if (event.target.nextSibling) {
      ;(event.target.nextSibling as HTMLInputElement).focus()
    } else {
      onSubmit([...codes, value].join(''))
    }
  }

  const onSubmit = async (code: string) => {
    try {
      setIncorrectCode(false)
      await Axios.post(`/auth/sms/activate`, {
        code,
        user: userData,
      })
      router.push('/rooms')
    } catch (error) {
      setCodes(['', '', '', ''])
      setIncorrectCode(true)
    }
  }

  const inputRef = React.useRef<any>([React.createRef()])

  React.useEffect(() => {
    inputRef.current[0].current.focus()
  }, [incorrectCode])

  return (
    <>
      <Header className="header__fixed">
        <BackButton onClick={onPreviousStep} />
      </Header>
      <Div100vh className="centering">
        <HelperBlock className={styles.HelperBlock}>
          <StepInfo
            icon="/static/numbers.png"
            title="Enter your activate code"
            description="We sent you a confirmation code"
          />
          <div className={clsx(styles.codeInput, incorrectCode ? styles.failed : '')}>
            {codes.map((code, index) => (
              <input
                key={index}
                type="text"
                placeholder=""
                maxLength={1}
                id={String(index)}
                onChange={handleChangeInput}
                value={code}
                inputMode="numeric"
                autoComplete="off"
                ref={inputRef.current[index]}
              />
            ))}
          </div>
        </HelperBlock>
      </Div100vh>
    </>
  )
}
