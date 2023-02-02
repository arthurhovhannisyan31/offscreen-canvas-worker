import { type FC, memo } from "react";

import { FPSMonitor, Layout, Dices, CanvasContainer } from "components";

import { useModuleWorkerInit } from "./hooks";

import "./App.css";

export const App: FC = memo(() => {
  useModuleWorkerInit();

  return (
    <div className="App">
      <Layout>
        <Dices />
        <CanvasContainer />
        <FPSMonitor />
      </Layout>
    </div>
  );
});

App.displayName = "App";
