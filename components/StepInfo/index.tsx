import clsx from 'clsx';

import styles from './StepInfo.module.scss';

interface StepInfoProps {
  title: string;
  description?: string;
  icon: string;
}

export const StepInfo: React.FC<StepInfoProps> = ({ title, description, icon }) => {
  return (
    <div>
      <div className={styles.wrapperImg}>
        <img src={icon} alt="Step picture" />
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};
