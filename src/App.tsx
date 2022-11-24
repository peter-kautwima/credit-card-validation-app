import React, { useState } from "react";
import "./App.css";
import CardsTable, { Column } from "./components/CardsTable/CardsTable";
import Modal from "./components/Modal/Modal";
import { AppState, Card } from "./types";
import CreditCardForm from "./components/CreditCardForm/CreditCardForm";

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
    bannedCountries: [],
  });

  const handleCardSubmit = (e: any) => {
    const {
      name,
      cardNumber,
      expirationDateMM,
      expirationDateYY,
      country,
      cvv,
    } = e.target;

    const newCard = {
      name: name?.value,
      country: country?.value,
      cardNumber: cardNumber?.value,
      expirationDate: `${expirationDateMM?.value}/${expirationDateYY?.value}`,
      cvv: cvv?.value,
    };

    const newCards = [...state.cards, newCard];
    setState({ ...state, cards: newCards });
    sessionStorage.setItem("cards", JSON.stringify(newCards));
  };

  return (
    <section>
      <section>
        <CreditCardForm
          onSubmit={handleCardSubmit}
          bannedCountries={state.bannedCountries}
        />
        <div className="App">
          <Modal
            bannedCountries={state.bannedCountries}
            setBannedCountries={(bannedCountries) =>
              setState({ ...state, bannedCountries })
            }
          />
        </div>
      </section>
      <section>
        <CardsTable data={state.cards} columns={columns} />
      </section>
    </section>
  );
}

export default App;
