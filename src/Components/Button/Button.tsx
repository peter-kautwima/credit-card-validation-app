import React, { HTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: 'submit' | 'button';
}

const Button = ({ children, type = 'button', ...rest }: Props) => {
  return (
    <button className={styles.root} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
