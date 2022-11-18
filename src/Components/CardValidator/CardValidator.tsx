import React from "react";

type Props = {};

const CardValidator = (props: Props) => {
  return (
    <form>
      <label htmlFor="card-number">Card number</label>
      <input type="text" id="card-number" required size={16} min="16" />
      <label>Expiration date</label>
      <input max="12" min="1" name="month" step="1" type="number" required />
      <label htmlFor="month">MM</label>
      <input max="99" min="23" name="year" step="1" type="number" required />
      <label htmlFor="year">YY</label>
      <br />
      <label htmlFor="cvv">CVV</label>
      <input type="password" id="cvv" required min="3" size={3} />

      <label htmlFor="country">Country</label>
      <input type="text" id="country" />
      <label htmlFor="name">Name</label>
      <input type="text" id="name" />
    </form>
  );
};

export default CardValidator;
