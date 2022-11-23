export type AppState = {
  cards: Card[];
};

export type Card = {
  id?: string;
  name: string;
  country: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
};
