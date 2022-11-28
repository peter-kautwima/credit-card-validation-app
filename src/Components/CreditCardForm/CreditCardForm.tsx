import Button from '../Button/Button';
import SelectCountry from '../SelectCountry/SelectCountry';
import TextField from '../TextField/TextField';
import { Card, Country } from '../../types';
import styles from './CreditCardForm.module.scss';
import useForm from './useForm';

export type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  cards: Card[];
  bannedCountries: Country[];
};

const CreditCardForm = ({ onSubmit, bannedCountries, cards }: Props) => {
  const { values, touched, errors, setValues, setTouched, handleSubmit } =
    useForm({ cards, bannedCountries, onSubmit });

  return (
    <form onSubmit={handleSubmit} className={styles['credit-card-form']}>
      <div className={styles['two-col']}>
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
      </div>
      <div className={styles['three-col']}>
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
          placeholder="YY"
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
      </div>
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
