import clsx from 'clsx';
import styles from './HelperBlock.module.scss';

export const HelperBlock = ({ children, className }) => {
  return <div className={clsx(styles.block, className)}>{children}</div>;
};
