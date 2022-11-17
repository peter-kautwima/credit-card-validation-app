import React from "react";

type Props = {};

const CardValidator = (props: Props) => {
  return (
    <form>
      <label htmlFor="card-number">Card number</label>
      <input type="text" id="card-number" />

      <label htmlFor="expiration-date">Expiration date</label>
      <input type="date" id="expiration-date" />

      <label htmlFor="cvv">Security Code</label>
      <input type="password" id="cvv" />

      <label htmlFor="country">Country</label>
      <input type="text" id="country" />

      <label htmlFor="name">Name</label>
      <input type="text" id="name" />
    </form>
  );
};

export default CardValidator;
