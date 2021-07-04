import React from 'react';
import Div100vh from 'react-div-100vh';

import { Axios } from '../../../core/axios';
import { HelperBlock } from '../../HelperBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { MainContext } from '../../../pages';
import { Avatar } from '../../Avatar';
import { Header, BackButton } from '../../Header';

import styles from './ChooseAvatarStep.module.scss';

const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('photo', file);
  const { data } = await Axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const ChooseAvatarStep: React.FC = () => {
  const { onNextStep, onKeyNext, onPreviousStep, onKeyBack, setFieldValue, userData } =
    React.useContext(MainContext);

  const [avatarUrl, setAvatarUrl] = React.useState<string>(userData.avatarUrl);

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
      const data = await uploadFile(file);
      target.value = '';
      setAvatarUrl(data.url);
      setFieldValue('avatarUrl', data.url);
    }
  };

  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

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
            icon="/static/celebration.png"
            title={`Okay, ${userData.fullname}!`}
            description="How’s this photo?"
          />
          <div className={styles.сhooseWrapper}>
            <label htmlFor="image" className={styles.сhooseLabel}>
              <Avatar avatarUrl={avatarUrl} fullname={userData.fullname} width="120" height="120" />
            </label>
            <label htmlFor="image" className={styles.сhooseBtn}>
              Choose a different photo
            </label>
            <input
              id="image"
              ref={inputFileRef}
              type="file"
              accept="image/png, image/jpeg"
              hidden
            />
          </div>
          <div className="btnWrapper">
            <Button className="btnNext" onClick={onNextStep}>
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
