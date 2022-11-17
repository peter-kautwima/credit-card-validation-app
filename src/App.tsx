import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import CustomButton from "./Components/Button/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CustomButton
        label="Click me"
        onClick={() => setCount(count + 1)}
        className="root"
      >
        {console.log("Button clicked")}
      </CustomButton>
    </div>
  );
}

export default App;
