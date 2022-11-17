import React from "react";

type Props = {};

const CardValidator = (props: Props) => {
  return (
    <form>
      <label htmlFor="card-number">Card number</label>
      <input type="text" id="card-number" />
      <label htmlFor="expiration-date">Expiration date</label>
      <input type="date" id="expiration-date" /> <br />
      <label htmlFor="date">Expiration date</label>
      <input max="12" min="1" name="month" step="1" type="number" value="12" />
      <label htmlFor="month">MM</label>
      <input max="99" min="23" name="year" step="1" type="number" value="23" />
      <label htmlFor="year">YY</label>
      <br />
      <label htmlFor="cvv">Security Code</label>
      <input type="password" id="cvv" />
      <label htmlFor="country">Country</label>
      <input type="text" id="country" /> <br />
      <label htmlFor="name">Name</label>
      <input type="text" id="name" />
      <label htmlFor="confirmation">Confirm Details</label>
      <input type="checkbox" id="confirmation" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CardValidator;
