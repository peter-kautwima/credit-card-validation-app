import { useCallback, useEffect, useState } from 'react';
import { validateLength, validationNumberRange } from '../../utils/validation';
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

  // handle validation on first mount
  useEffect(() => {
    handleValidaton();
  }, []);

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

  const getNameErrors = () => {
    if (!values.name && touched.name) {
      return 'Name is required';
    }
  };

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

  const getCvvErrors = () => {
    return touched?.cvv ? validateLength(values.cvv, 3) : '';
  };

  const getExpirationDateMMErrors = () =>
    touched?.expirationDateMM
      ? validationNumberRange(values.expirationDateMM, 1, 12)
      : '';

  const getExpirationDateYYErrors = () => {
    const currentYear =
      parseInt(new Date().getFullYear().toString().slice(2, 4)) + 1;
    return touched?.expirationDateYY
      ? validationNumberRange(values.expirationDateYY, currentYear, 99)
      : '';
  };

  const handleValidaton = () => {
    const newErrors = { ...errors };
    setErrors({
      ...newErrors,
      name: getNameErrors(),
      cardNumber: getCardNumberErrors(),
      cvv: getCvvErrors(),
      expirationDateMM: getExpirationDateMMErrors(),
      expirationDateYY: getExpirationDateYYErrors(),
      country: getCountryErrors(),
    });
  };

  const isValid = useCallback(() => {
    if (Object.values(touched).filter((t) => t === false).length > 0) {
      return false;
    }

    return Object.values(errors).filter((error) => error !== '').length === 0;
  }, [errors]);

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
