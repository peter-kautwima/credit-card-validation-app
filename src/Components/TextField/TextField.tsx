import React, { ChangeEvent } from "react";
import styles from "./TextField.module.scss";

type Props = {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextField = ({
  name,
  label,
  value,
  placeholder,
  error,
  onChange,
}: Props) => {
  const classes = [
    styles["text-field"],
    error ? styles["text-field--error"] : "",
  ].join(" ");
  return (
    <div className={classes}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default TextField;
