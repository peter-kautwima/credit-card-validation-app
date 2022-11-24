import { useCallback, useEffect, useState } from "react";
import Button from "../Button/Button";
import SelectCountry from "../SelectCountry/SelectCountry";
import TextField from "../TextField/TextField";
import { Country } from "../../types";
import { validateRequired } from "../../ValidationUtil/validation";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
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

const CreditCardForm = ({ onSubmit, bannedCountries }: Props) => {
  const [values, setValues] = useState<Values>({
    name: "",
    cardNumber: "",
    expirationDateMM: "",
    expirationDateYY: "",
    country: "",
    cvv: "",
  });

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
    handleRequiredValidation("cardNumber", "Card number is required");
    handleRequiredValidation("expirationDateMM", "Expiration date is required");
    handleRequiredValidation("expirationDateYY", "Expiration date is required");
    handleRequiredValidation("cvv", "CVV is required");
    handleRequiredValidation("country", "Country is required");
    handleRequiredValidation("name", "Name is required");

    setErrors(newErrors);
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
