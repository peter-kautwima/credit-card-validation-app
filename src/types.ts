export type AppState = {
  cards: Card[];
  bannedCountries: Country[];
};

export type Country = {
  value: string;
  label: string;
};

export type Card = {
  id?: string;
  name: string;
  country: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
};
