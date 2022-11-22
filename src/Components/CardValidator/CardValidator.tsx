import React, { useEffect, useState } from "react";
import SelectCountry from "../SelectCountry/SelectCountry";
import TextField from "../TextField/TextField";

type Props = {};

type Values = {
  name: string | null;
  cardNumber: number | null;
  expirationDateMM: number | null;
  expirationDateYY: number | null;
  cvv: number | null;
};

const CardValidator = (props: Props) => {
  const [values, setValues] = useState<Values>({
    name: null,
    cardNumber: null,
    expirationDateMM: null,
    expirationDateYY: null,
    cvv: null,
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

  // Listen for changes in the values state and validate the inputs
  useEffect(() => {
    handleValidaton();
  }, [values, touched]);
  return (
    <form>
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
        label="Expiration date: MM"
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
        label="Expiration date: YY"
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
        placeholder="cvv"
        onChange={(e) => setValues({ ...values, cvv: e.target.value })}
        onBlur={() => setTouched({ ...touched, cvv: true })}
        error={errors.cvv}
      />
      <br />
      <SelectCountry
        onChange={function (e: React.ChangeEvent<HTMLSelectElement>): void {
          throw new Error("Function not implemented.");
        }}
      />
    </form>
  );
};

export default CardValidator;
