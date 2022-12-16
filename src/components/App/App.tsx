import { type FC, memo } from "react";

import { CanvasContainer } from "components/CanvasContainer/CanvasContainer";
import { Layout } from "components/Layout/Layout";

import "./App.css";
import diceIcon from "./assets/dice.svg";

export const App: FC = memo(() => {
  return (
    <div className="App">
      <Layout>
        <img src={diceIcon} className="logo speed0" alt="dice icon" />
        <img src={diceIcon} className="logo speed1" alt="dice icon" />
        <img src={diceIcon} className="logo speed2" alt="dice icon" />
        <img src={diceIcon} className="logo speed3" alt="dice icon" />
        <img src={diceIcon} className="logo speed4" alt="dice icon" />
        <h1>Offscreen canvas worker</h1>
        <CanvasContainer />
      </Layout>
    </div>
  );
});

App.displayName = "App";
