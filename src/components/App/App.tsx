import { type FC, memo } from "react";

import { CanvasContainer } from "components/CanvasContainer/CanvasContainer";
import { Dices } from "components/Dices/Dices";
import { Layout } from "components/Layout/Layout";

import "./App.css";

export const App: FC = memo(() => {
  return (
    <div className="App">
      <Layout>
        <Dices />
        <CanvasContainer />
      </Layout>
    </div>
  );
});

App.displayName = "App";
