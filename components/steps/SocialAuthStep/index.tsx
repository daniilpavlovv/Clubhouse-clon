import React from 'react'
import Cookies from 'js-cookie'
import Div100vh from 'react-div-100vh'

import { HelperBlock } from '../../HelperBlock'
import { Button } from '../../Button'
import { StepInfo } from '../../StepInfo'
import { MainContext, UserData } from '../../../pages'
import { Header, BackButton } from '../../Header'

import styles from './SocialAuthStep.module.scss'

export const SocialAuthStep: React.FC = () => {
  const { onNextStep, onPreviousStep, setUserData } = React.useContext(MainContext)

  const onClickAuth = () => {
    const windowWidth = 500
    const windowHeight = 745
    const left = screen.width / 2 - windowWidth / 2
    const top = screen.height / 2 - windowHeight / 2
    window.open(
      'http://192.168.31.75:3001/auth/github',
      'Auth',
      `width=${windowWidth},height=${windowHeight}, left=${left}, top=${top},status=yes,toolbar=no,menubar=no,location=no`,
    )
  }

  React.useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      const user: string = data
      if (typeof user === 'string' && user.includes('username')) {
        Cookies.remove('token')
        const json: UserData = JSON.parse(user)
        setUserData(json)
        Cookies.set('token', json.token)
        onNextStep()
      }
    })
  }, [])

  return (
    <>
      <Header className="header__fixed">
        <BackButton onClick={onPreviousStep} />
      </Header>
      <Div100vh className="centering">
        <HelperBlock className={styles.block}>
          <StepInfo
            icon="/static/connect.png"
            title="Do you want to import information?"
            description="This will help you fill out the data faster"
          />
          <div className="d-flex justify-content-evenly">
            <Button disabled onClick={onClickAuth} className={styles.twitterBtn}>
              <img src="/static/twitter.svg" alt="Twitter logo" className={styles.twitterLogo} />
              Twitter
            </Button>
            <Button onClick={onClickAuth} className={styles.githubBtn}>
              <img src="/static/github.svg" alt="GitHub logo" className={styles.githubLogo} />
              GitHub
            </Button>
          </div>
          <Button onClick={onNextStep} className={styles.skipBtn}>
            Enter my info manually
          </Button>
        </HelperBlock>
      </Div100vh>
    </>
  )
}
