import { useState } from "react";
import diceIcon from "./assets/dice.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <img src={diceIcon} className="logo speed0" alt="dice icon" />
      <img src={diceIcon} className="logo speed1" alt="dice icon" />
      <img src={diceIcon} className="logo speed2" alt="dice icon" />
      <img src={diceIcon} className="logo speed3" alt="dice icon" />
      <img src={diceIcon} className="logo speed4" alt="dice icon" />
      <h1>Offscreen canvas worker</h1>
    </div>
  );
}

export default App;
