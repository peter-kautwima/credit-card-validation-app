import { useState } from 'react';
import CardsTable, { Column } from './components/CardsTable/CardsTable';
import Modal from './components/Modal/Modal';
import { AppState, Card, Country } from './types';
import CreditCardForm from './components/CreditCardForm/CreditCardForm';
import { getSelectedCountry } from './utils';
import Button from './components/Button/Button';
import BannedCountries from './components/BannedCountries/BannedCountries';
import styles from './App.module.scss';

export const columns: Column[] = [
  { accessor: 'name', label: 'Name' },
  { accessor: 'country', label: 'Country' },
  { accessor: 'cardNumber', label: 'Card Number' },
  { accessor: 'expirationDate', label: 'Exp Date' },
  { accessor: 'cvv', label: 'CVV' },
];

const transformCardRow = (card: Card) => {
  const countryName = getSelectedCountry(card.country)?.label ?? '';
  return {
    ...card,
    country: countryName,
  };
};

function App() {
  const existingCards = sessionStorage.getItem('cards');
  const bannedCountries = sessionStorage.getItem('bannedCountries');

  const [state, setState] = useState<AppState>({
    cards: existingCards !== null ? JSON.parse(existingCards) : [],
    bannedCountries:
      bannedCountries !== null ? JSON.parse(bannedCountries) : [],
  });

  const [isAddNewCardModalOpen, setIsAddNewCardModalOpen] = useState(false);
  const [isBannedCountriesModalOpen, setIsBannedCountriesModalOpen] =
    useState(false);

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
    sessionStorage.setItem('cards', JSON.stringify(newCards));
    setIsAddNewCardModalOpen(false);
  };

  const handleSetBannedCountries = (bannedCountries: Country[]) => {
    setState({ ...state, bannedCountries });
    sessionStorage.setItem('bannedCountries', JSON.stringify(bannedCountries));
  };

  return (
    <div className={styles.app}>
      <section className={styles.header}>
        <h2>My Cards</h2>
        <div>
          <Button onClick={() => setIsAddNewCardModalOpen(true)}>
            Add New Card
          </Button>

          <Button onClick={() => setIsBannedCountriesModalOpen(true)}>
            Banned Countries
          </Button>
        </div>
      </section>

      <section>
        {state.cards.length === 0 ? (
          <p>No cards added yet.</p>
        ) : (
          <CardsTable
            data={state.cards.map((card) => transformCardRow(card))}
            columns={columns}
          />
        )}
      </section>

      <Modal
        title="Add Credit Cards"
        isOpen={isAddNewCardModalOpen}
        onClose={() => setIsAddNewCardModalOpen(false)}
      >
        <CreditCardForm
          onSubmit={handleCardSubmit}
          cards={state.cards}
          bannedCountries={state.bannedCountries}
        />
      </Modal>

      <Modal
        title="Banned Countries"
        isOpen={isBannedCountriesModalOpen}
        onClose={() => setIsBannedCountriesModalOpen(false)}
      >
        <BannedCountries
          bannedCountries={state.bannedCountries}
          setBannedCountries={(bannedCountries) => {
            handleSetBannedCountries(bannedCountries);
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
