import React, { useState } from "react";
import "./App.css";
import CardsTable, { Column } from "./Components/CardsTable/CardsTable";
import Modal from "./Components/Modal/Modal";
import { AppState, Card } from "./types";
import CreditCardForm from "./Components/CreditCardForm/CreditCardForm";

export const columns: Column[] = [
  { accessor: "name", label: "Name" },
  { accessor: "country", label: "Country" },
  { accessor: "cardNumber", label: "Card Number" },
  { accessor: "expirationDate", label: "Exp Date" },
  { accessor: "cvv", label: "CVV" },
];

function App() {
  const existingCards = sessionStorage.getItem("cards");
  const [state, setState] = useState<AppState>({
    cards: existingCards !== null ? JSON.parse(existingCards) : [],
  });
  const handleCardSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("e", e);
    const newCard = {
      id: `${state.cards.length + 1}`,
      name: `John Doe ${state.cards.length + 1}`,
      country: "United States",
      cardNumber: "1234 5678 9012 3456",
      expirationDate: "01/2025",
      cvv: "123",
    };
    const newCards = [...state.cards, newCard];
    setState({ cards: newCards });
    // store cards in sessionStorage
    sessionStorage.setItem("cards", JSON.stringify(newCards));
  };

  return (
    <section>
      <section>
        <CreditCardForm onSubmit={handleCardSubmit} state={state} />
        <div className="App">
          <Modal />
        </div>
      </section>
      <section>
        <CardsTable data={state.cards} columns={columns} />
      </section>
    </section>
  );
}

export default App;
