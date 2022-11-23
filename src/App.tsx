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

  return (
    <section>
      <section>
        <CreditCardForm />
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
