import { type FC, memo } from "react";

import { PerformanceMonitor, Layout, CanvasContainer } from "components";

import { useModuleWorkerInit } from "./hooks";

import "./App.css";

export const App: FC = memo(() => {
  useModuleWorkerInit();

  return (
    <div className="App">
      <Layout>
        <CanvasContainer />
        <PerformanceMonitor />
      </Layout>
    </div>
  );
});

App.displayName = "App";
