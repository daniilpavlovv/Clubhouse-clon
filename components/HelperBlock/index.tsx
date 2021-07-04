import styles from './HelperBlock.module.scss';

export const HelperBlock = ({ children }) => {
  return <div className={styles.block}>{children}</div>;
};
