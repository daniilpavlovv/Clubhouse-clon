import React from 'react'
import Div100vh from 'react-div-100vh'

import { Axios } from '../../../core/axios'
import { HelperBlock } from '../../HelperBlock'
import { Button } from '../../Button'
import { StepInfo } from '../../StepInfo'
import { MainContext } from '../../../pages'
import { Avatar } from '../../Avatar'
import { Header, BackButton } from '../../Header'

import styles from './ChooseAvatarStep.module.scss'

const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData()
  formData.append('photo', file)
  const { data } = await Axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const ChooseAvatarStep: React.FC = () => {
  const { onNextStep, onPreviousStep, setFieldValue, userData } = React.useContext(MainContext)

  const [avatarUrl, setAvatarUrl] = React.useState<string>(userData.avatarUrl)

  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatarUrl(imageUrl)
      const data = await uploadFile(file)
      target.value = ''
      setAvatarUrl(data.url)
      setFieldValue('avatarUrl', data.url)
    }
  }

  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage)
    }
  }, [])

  return (
    <>
      <Header className="header__fixed">
        <BackButton onClick={onPreviousStep} />
      </Header>
      <Div100vh className="centering">
        <HelperBlock className={styles.block}>
          <StepInfo
            icon="/static/celebration.png"
            title={`Okay, ${userData.fullname}!`}
            description="How’s this photo?"
          />
          <div>
            <div className="d-i-flex">
              <label htmlFor="image" className="cup d-i-flex">
                <Avatar width="120" height="120" src={avatarUrl} fullname={userData.fullname} />
              </label>
            </div>
            <div className="mt-15">
              <label htmlFor="image" className="link cup">
                Choose a different photo
              </label>
            </div>
            <input
              id="image"
              ref={inputFileRef}
              type="file"
              accept="image/x-png,image/jpeg"
              hidden
            />
          </div>
          <div className="d-grid justify-content-center">
            <Button onClick={onNextStep}>
              Next
              <img className="ml-5" src="/static/arrow.svg" />
            </Button>
          </div>
        </HelperBlock>
      </Div100vh>
    </>
  )
}
