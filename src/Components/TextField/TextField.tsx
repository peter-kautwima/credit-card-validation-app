import { InputHTMLAttributes } from 'react';
import styles from './TextField.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const TextField = ({ name, label, error, ...props }: Props) => {
  const classes = [
    styles['text-field'],
    error ? styles['text-field--error'] : '',
  ].join(' ');
  return (
    <div className={classes}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default TextField;
