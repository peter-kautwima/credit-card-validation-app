import React, { SelectHTMLAttributes } from "react";
import countries from "../../data/countries";
import styles from "./SelectCountry.module.scss";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

const SelectCountry = ({ label, error, ...props }: Props) => {
  return (
    <div className={styles.select}>
      <label htmlFor="country" className={styles.label}>
        {label}
      </label>
      <select id="country" name="country" {...props}>
        <option value="">select country</option>
        {countries.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default SelectCountry;
