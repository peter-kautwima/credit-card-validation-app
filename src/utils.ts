import countries from './data/countries';
import { Country } from './types';

export const getSelectedCountry = (
  selectedCountry: string,
): Country | undefined => {
  const country = countries.find(
    (country) => country.value === selectedCountry,
  );
  return country;
};
