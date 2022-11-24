import { useCallback, useEffect, useState } from "react";
import Button from "../Button/Button";
import SelectCountry from "../SelectCountry/SelectCountry";
import TextField from "../TextField/TextField";
import { Card, Country } from "../../types";
import {
  validateLength,
  validateRequired,
  validationNumberRange,
} from "../../ValidationUtil/validation";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  cards: Card[];
  bannedCountries: Country[];
};

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
  name: "",
  cardNumber: "",
  expirationDateMM: "",
  expirationDateYY: "",
  country: "",
  cvv: "",
};

const CreditCardForm = ({ onSubmit, bannedCountries, cards }: Props) => {
  const [values, setValues] = useState<Values>(initialValues);

  const [errors, setErrors] = useState<Errors>({});

  const [touched, setTouched] = useState<Touched>({
    name: false,
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

    handleRequiredValidation("name", "Name is required");
    handleRequiredValidation("country", "Country is required");

    const getCardNumberErrors = () => {
      let cardErrors = "";
      const isCardAlreadyAdded = (cardNumber: string) => {
        return cards.some((card) => card.cardNumber === cardNumber);
      };

      cardErrors = touched?.cardNumber
        ? validateLength(values.cardNumber, 16)
        : "";

      if (isCardAlreadyAdded(values.cardNumber)) {
        cardErrors = "Card already added";
      } else {
        newErrors.cardNumber = cardErrors;
      }

      return cardErrors;
    };

    const cvvErrors = touched?.cvv ? validateLength(values.cvv, 3) : "";

    const expirationDateMMErrors = touched?.expirationDateMM
      ? validationNumberRange(values.expirationDateMM, 1, 12)
      : "";

    const expirationDateYYErrors = touched?.expirationDateYY
      ? // @todo don't hard code the year
        validationNumberRange(values.expirationDateYY, 23, 99)
      : "";

    setErrors({
      ...newErrors,
      cardNumber: getCardNumberErrors(),
      cvv: cvvErrors,
      expirationDateMM: expirationDateMMErrors,
      expirationDateYY: expirationDateYYErrors,
    });
  };

  const isValid = useCallback(() => {
    return Object.values(errors).filter((error) => error !== "").length === 0;
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
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={values.name}
        placeholder="John Doe"
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        onBlur={() => setTouched({ ...touched, name: true })}
        error={errors.name}
        type="string"
      />
      <TextField
        name="cardNumber"
        label="Card Number"
        value={values.cardNumber}
        placeholder="XXXX XXXX XXXX XXXX"
        onChange={(e) => setValues({ ...values, cardNumber: e.target.value })}
        onBlur={() => setTouched({ ...touched, cardNumber: true })}
        error={errors.cardNumber}
        type="number"
      />
      <TextField
        name="expirationDateMM"
        label="Expiration Date: MM"
        value={values.expirationDateMM}
        placeholder="MM"
        onChange={(e) =>
          setValues({ ...values, expirationDateMM: e.target.value })
        }
        onBlur={() => setTouched({ ...touched, expirationDateMM: true })}
        error={errors.expirationDateMM}
        type="number"
      />
      <TextField
        name="expirationDateYY"
        label="Expiration Date: YY"
        value={values.expirationDateYY}
        placeholder="MM"
        onChange={(e) =>
          setValues({ ...values, expirationDateYY: e.target.value })
        }
        onBlur={() => setTouched({ ...touched, expirationDateYY: true })}
        error={errors.expirationDateYY}
        type="number"
      />
      <TextField
        name="cvv"
        label="CVV"
        value={values.cvv}
        placeholder="CVV"
        onChange={(e) => setValues({ ...values, cvv: e.target.value })}
        onBlur={() => setTouched({ ...touched, cvv: true })}
        error={errors.cvv}
        type="number"
      />
      <br />
      <SelectCountry
        label="Select Country"
        name="country"
        onChange={(e) => setValues({ ...values, country: e.target.value })}
        onBlur={() => setTouched({ ...touched, country: true })}
        error={errors.country}
      />
      <Button type="submit">Save Card</Button>
    </form>
  );
};

export default CreditCardForm;
