import clsx from "clsx";
import { memo } from "react";

import diceIcon from "./assets/dice.svg";

import styles from "./Dices.module.css";

export const Dices = memo(() => {
  return(
      <div>
        <div>
          <img src={diceIcon} className={clsx(styles.logo, styles.speed0)} alt="dice icon" />
          <img src={diceIcon} className={clsx(styles.logo, styles.speed1)} alt="dice icon" />
          <img src={diceIcon} className={clsx(styles.logo, styles.speed2)} alt="dice icon" />
          <img src={diceIcon} className={clsx(styles.logo, styles.speed3)} alt="dice icon" />
          <img src={diceIcon} className={clsx(styles.logo, styles.speed4)} alt="dice icon" />
        </div>
        <span>neh, just svg with styles</span>
      </div>
  );
});

Dices.displayName = "Dices";
