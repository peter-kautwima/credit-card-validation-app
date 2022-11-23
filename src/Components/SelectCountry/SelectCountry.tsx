import React, { SelectHTMLAttributes } from "react";
import countries from "./countries";
import styles from "./SelectCountry.module.scss";

interface Props {
  label: string;
}
const SelectCountry = ({ label, ...props }: Props) => {
  return (
    <div className={styles.select}>
      <label htmlFor="country">{label}</label>
      <select id="country" name="country" required {...props}>
        <option>select country</option>
        {countries.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCountry;
