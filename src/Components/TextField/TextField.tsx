import React, { ChangeEvent } from "react";
import styles from "./TextField.module.scss";

type Props = {
  name: string;
  label: string;
  value: string | number | null;
  placeholder?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

const TextField = ({
  name,
  label,
  value,
  placeholder,
  error,
  onChange,
  onFocus,
  onBlur,
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
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default TextField;
