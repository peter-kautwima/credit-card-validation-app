import React, { useState } from "react";
import SelectCountry from "../SelectCountry/SelectCountry";
import TextField from "../TextField/TextField";

type Props = {};

type Values = {
  cardNumber: number | null;
  expirationDateMM: number | null;
  expirationDateYY: number | null;
  cvv: number | null;
};

const CardValidator = (props: Props) => {
  const [values, setValues] = useState<Values>({
    cardNumber: null,
    expirationDateMM: null,
    expirationDateYY: null,
    cvv: null,
  });
  return (
    <form>
      <TextField
        name="name"
        label="Name"
        value={values.name}
        placeholder="John Doe"
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        error="Name is required"
      />
      <TextField
        name="card-number"
        label="Card Number"
        value={values.cardNumber}
        placeholder="XXXX XXXX XXXX XXXX"
        onChange={(e) => setValues({ ...values, cardNumber: e.target.value })}
        error="Card Number is required"
      />
      <TextField
        name="expiration-date-mm"
        label="Expiration date: MM"
        value={values.expirationDateMM}
        placeholder="MM"
        onChange={(e) =>
          setValues({ ...values, expirationDateMM: e.target.value })
        }
        error="Date is required"
      />
      <TextField
        name="expiration-date-yy"
        label="Expiration date: YY"
        value={values.expirationDateYY}
        placeholder="MM"
        onChange={(e) =>
          setValues({ ...values, expirationDateYY: e.target.value })
        }
        error="Date is required"
      />
      <TextField
        name="cvv"
        label="CVV"
        value={values.cvv}
        placeholder="cvv"
        onChange={(e) => setValues({ ...values, cvv: e.target.value })}
        error="CVV is required"
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
