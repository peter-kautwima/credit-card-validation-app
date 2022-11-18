import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import CustomButton from "./Components/CustomButton/CustomButton";
import CardValidator from "./Components/CardValidator/CardValidator";
import CardsTable from "./Components/CardsTable/CardsTable";

// Dummy data for CardsTable
const data = [
  {
    id: "1",
    name: "John Doe",
    country: "USA",
    cardNumber: "1234 5678 9012 3456",
    expirationDate: "12/23",
    cvv: "123",
  },
  {
    id: "2",
    name: "James Franco",
    country: "SA",
    cardNumber: "1234 5678 9012 3456",
    expirationDate: "12/33",
    cvv: "123",
  },
  {
    id: "3",
    name: "Luke",
    country: "Oz",
    cardNumber: "1234 5678 9012 3456",
    expirationDate: "11/24",
    cvv: "123",
  },
];

const columns = [
  { accessor: "name", label: "Name" },
  { accessor: "country", label: "Country" },
  { accessor: "cardNumber", label: "Card Number" },
  { accessor: "expirationDate", label: "Expiration Date" },
  { accessor: "cvv", label: "CVV" },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <section>
        <CardValidator />
        <div className="App">
          <CustomButton onClick={() => setCount(count + 1)} className="root">
            Save Card
          </CustomButton>
          <CustomButton onClick={() => setCount(count + 1)} className="root">
            Manage Blacklisted Countries
          </CustomButton>
        </div>
      </section>
      <section>
        <CardsTable data={data} columns={columns} />
      </section>
    </section>
  );
}

export default App;
