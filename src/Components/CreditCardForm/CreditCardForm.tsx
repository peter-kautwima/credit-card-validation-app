import { useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import SelectCountry from "../SelectCountry/SelectCountry";
import TextField from "../TextField/TextField";
import { Card } from "../../types";
import { AppState } from "../../types";

type Props = {
  state: AppState;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type Values = {
  name: string;
  cardNumber: string;
  expirationDateMM: string;
  expirationDateYY: string;
  cvv: string;
};

type Errors = {
  [Property in keyof Values]?: string;
};

type Touched = {
  [Property in keyof Values]?: boolean;
};

const CreditCardForm = ({ onSubmit }: Props) => {
  const [values, setValues] = useState<Values>({
    name: "",
    cardNumber: "",
    expirationDateMM: "",
    expirationDateYY: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Errors>({
    name: "Name is required",
    cardNumber: "Card number is required",
    expirationDateMM: "Expiration date is required",
    expirationDateYY: "Expiration date is required",
    cvv: "CVV is required",
  });

  const [touched, setTouched] = useState<Touched>({
    name: false,
  });

  const handleValidaton = () => {
    const newErrors = { ...errors };

    /** @todo abstract into validation util function.`validateRequired` */
    if (!values.name && touched.name) {
      newErrors.name = "Name is required";
    } else {
      newErrors.name = "";
    }

    if (!values.cardNumber && touched.name) {
      newErrors.cardNumber = "Card number is required";
    } else {
      newErrors.cardNumber = "";
    }

    if (!values.expirationDateMM && touched.name) {
      newErrors.expirationDateMM = "Expiration date is required";
    } else {
      newErrors.expirationDateMM = "";
    }

    if (!values.expirationDateYY && touched.name) {
      newErrors.expirationDateYY = "Expiration date is required";
    } else {
      newErrors.expirationDateYY = "";
    }

    if (!values.cvv && touched.name) {
      newErrors.cvv = "CVV is required";
    } else {
      newErrors.cvv = "";
    }

    setErrors(newErrors);
  };

  // const existingCards = sessionStorage.getItem("cards");
  // const [state, setState] = useState<AppState>({
  //   cards: existingCards !== null ? JSON.parse(existingCards) : [],
  // });

  // Listen for changes in the values state and validate the inputs
  useEffect(() => {
    handleValidaton();
  }, [values, touched]);
  return (
    <form onSubmit={onSubmit}>
      <TextField
        name="name"
        label="Name"
        value={values.name}
        placeholder="John Doe"
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        onBlur={() => setTouched({ ...touched, name: true })}
        error={errors.name}
      />
      <TextField
        name="card-number"
        label="Card Number"
        value={values.cardNumber}
        placeholder="XXXX XXXX XXXX XXXX"
        onChange={(e) => setValues({ ...values, cardNumber: e.target.value })}
        onBlur={() => setTouched({ ...touched, cardNumber: true })}
        error={errors.cardNumber}
      />
      <TextField
        name="expiration-date-mm"
        label="Expiration Date: MM"
        value={values.expirationDateMM}
        placeholder="MM"
        onChange={(e) =>
          setValues({ ...values, expirationDateMM: e.target.value })
        }
        onBlur={() => setTouched({ ...touched, expirationDateMM: true })}
        error={errors.expirationDateMM}
      />
      <TextField
        name="expiration-date-yy"
        label="Expiration Date: YY"
        value={values.expirationDateYY}
        placeholder="MM"
        onChange={(e) =>
          setValues({ ...values, expirationDateYY: e.target.value })
        }
        onBlur={() => setTouched({ ...touched, expirationDateYY: true })}
        error={errors.expirationDateYY}
      />
      <TextField
        name="cvv"
        label="CVV"
        value={values.cvv}
        placeholder="CVV"
        onChange={(e) => setValues({ ...values, cvv: e.target.value })}
        onBlur={() => setTouched({ ...touched, cvv: true })}
        error={errors.cvv}
      />
      <br />
      <SelectCountry label="Select Country" />
      <CustomButton type="submit">Save Card</CustomButton>
    </form>
  );
};

export default CreditCardForm;
