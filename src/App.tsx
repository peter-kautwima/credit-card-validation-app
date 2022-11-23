import { useState } from "react";
import "./App.css";
import CustomButton from "./Components/CustomButton/CustomButton";
import CardsTable, { Column } from "./Components/CardsTable/CardsTable";
import Modal from "./Components/Modal/Modal";
import { Card } from "./types";
import CreditCardForm from "./Components/CreditCardForm/CreditCardForm";

type AppState = {
  cards: Card[];
};

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
  const handleCardSubmit = () => {
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
        <CreditCardForm />
        <div className="App">
          <CustomButton onClick={handleCardSubmit} className="root">
            Save Card
          </CustomButton>
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
