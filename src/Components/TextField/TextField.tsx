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
  return (
    <div className={styles["text-field"]}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
