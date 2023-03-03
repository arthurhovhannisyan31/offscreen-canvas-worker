import { type FC, memo } from "react";

import { PerformanceMonitor, Layout, CanvasContainer } from "components";

import { useModuleWorkerInit } from "./hooks";
import { isCrossOriginIsolated } from "../../helpers";

import "./App.css";

export const App: FC = memo(() => {
  useModuleWorkerInit();

  const crossOriginIsolated = isCrossOriginIsolated();

  if (!crossOriginIsolated){
    console.info("Shared array buffers are not supported. Cannot start fps widget");
  }

  return (
    <div className="App">
      <Layout>
        <CanvasContainer />
        {crossOriginIsolated && <PerformanceMonitor />}
      </Layout>
    </div>
  );
});

App.displayName = "App";
