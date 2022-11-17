import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import CustomButton from "./Components/Button/Button";
import CardValidator from "./Components/CardValidator/CardValidator";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <section>
        <CardValidator />
        <div className="App">
          <CustomButton
            label="Save Card"
            onClick={() => setCount(count + 1)}
            className="root"
          >
            {console.log("Button clicked")}
          </CustomButton>
          <CustomButton
            label="Manage Blacklisted Countries"
            onClick={() => setCount(count + 1)}
            className="root"
          >
            {console.log("Button clicked")}
          </CustomButton>
        </div>
      </section>
      <section></section>
    </section>
  );
}

export default App;
