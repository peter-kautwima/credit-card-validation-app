import React, { ChangeEvent, useState } from "react";
import { Country } from "../../types";
import { getSelectedCountry } from "../../utils";
import Button from "../Button/Button";
import SelectCountry from "../SelectCountry/SelectCountry";

type Props = {
  bannedCountries: Country[];
  setBannedCountries: (bannedCountries: Country[]) => void;
};

const BannedCountries = ({ bannedCountries, setBannedCountries }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const countryObj = getSelectedCountry(e.target.value);
    if (countryObj) {
      setSelectedCountry(countryObj);
    }
  };

  return (
    <form>
      <SelectCountry label="Select Country" onChange={handleCountrySelect} />
      <Button
        onClick={() => {
          console.log("adding banned country", selectedCountry);

          if (selectedCountry) {
            console.log([...bannedCountries, selectedCountry]);
            setBannedCountries([...bannedCountries, selectedCountry]);
          }
        }}
      >
        Ban Country
      </Button>

      <h4>Banned Countries</h4>
      <ul>
        {bannedCountries.map((country) => (
          <li key={country.value}>{country.label}</li>
        ))}
      </ul>
    </form>
  );
};

export default BannedCountries;
