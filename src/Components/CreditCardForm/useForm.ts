import { useCallback, useEffect, useState } from 'react';
import {
  validateLength,
  validateRequired,
  validationNumberRange,
} from '../../ValidationUtil/validation';
import { Props } from './CreditCardForm';

type Values = {
  name: string;
  cardNumber: string;
  expirationDateMM: string;
  expirationDateYY: string;
  country: string;
  cvv: string;
};

type Errors = {
  [Property in keyof Values]?: string;
};

type Touched = {
  [Property in keyof Values]?: boolean;
};

const initialValues = {
  name: '',
  cardNumber: '',
  expirationDateMM: '',
  expirationDateYY: '',
  country: '',
  cvv: '',
};

const useForm = ({ cards, bannedCountries, onSubmit }: Props) => {
  const [values, setValues] = useState<Values>(initialValues);

  const [errors, setErrors] = useState<Errors>({});

  const [touched, setTouched] = useState<Touched>({
    name: false,
    cardNumber: false,
    expirationDateMM: false,
    expirationDateYY: false,
    country: false,
    cvv: false,
  });

  const setAllTouched = () => {
    setTouched({
      name: true,
      cardNumber: true,
      expirationDateMM: true,
      expirationDateYY: true,
      country: true,
      cvv: true,
    });
  };

  const handleValidaton = () => {
    const newErrors = { ...errors };

    const handleRequiredValidation = (name: string, error: string) => {
      validateRequired(name, values, newErrors, touched, error);
    };

    handleRequiredValidation('name', 'Name is required');
    handleRequiredValidation('country', 'Country is required');

    const getCardNumberErrors = () => {
      let cardErrors = '';
      const isCardAlreadyAdded = (cardNumber: string) => {
        return cards.some((card) => card.cardNumber === cardNumber);
      };

      cardErrors = touched?.cardNumber
        ? validateLength(values.cardNumber, 16)
        : '';

      if (isCardAlreadyAdded(values.cardNumber)) {
        cardErrors = 'Card already added';
      } else {
        cardErrors = cardErrors;
      }

      return cardErrors;
    };

    const getCountryErrors = () => {
      let countryErrors = errors.country;

      if (!values.country && touched.country) {
        return 'Country is required';
      }

      const isCountryBanned = (country: string) => {
        return bannedCountries.some(
          (bannedCountry) => bannedCountry.value === country,
        );
      };

      if (isCountryBanned(values.country)) {
        countryErrors = 'Country is banned';
      } else {
        countryErrors = '';
      }

      return countryErrors;
    };

    const cvvErrors = touched?.cvv ? validateLength(values.cvv, 3) : '';

    const expirationDateMMErrors = touched?.expirationDateMM
      ? validationNumberRange(values.expirationDateMM, 1, 12)
      : '';

    const expirationDateYYErrors = touched?.expirationDateYY
      ? // @todo don't hard code the year
        validationNumberRange(values.expirationDateYY, 23, 99)
      : '';

    setErrors({
      ...newErrors,
      cardNumber: getCardNumberErrors(),
      cvv: cvvErrors,
      expirationDateMM: expirationDateMMErrors,
      expirationDateYY: expirationDateYYErrors,
      country: getCountryErrors(),
    });
  };

  const isValid = useCallback(() => {
    if (Object.values(touched).filter((t) => t === false).length > 0) {
      return false;
    }

    return Object.values(errors).filter((error) => error !== '').length === 0;
  }, [errors]);

  useEffect(() => {
    handleValidaton();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAllTouched();

    if (isValid()) {
      onSubmit(e);
      setValues(initialValues);
      setTouched({});
      setErrors({});
    }
  };

  // Listen for changes in the values state and validate the inputs
  useEffect(() => {
    handleValidaton();
  }, [values, touched]);

  return {
    values,
    touched,
    errors,
    setTouched,
    setValues,
    handleSubmit,
  };
};

export default useForm;
