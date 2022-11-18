import React, { HTMLAttributes, ReactHTMLElement } from "react";
import styles from "./CustomButton.module.scss";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
}

const CustomButton = ({ children, ...rest }: Props) => {
  return (
    <button className={styles.root} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;
