import { type FC, memo } from "react";

import { PerformanceMonitor, Layout, CanvasContainer, WorkerControls } from "components";

import { useModuleWorkerInit } from "./hooks";
import { isCrossOriginIsolated } from "../../helpers";

import styles from "./App.module.css";
import { useSWRegistration } from "./hooks/useSWRegistration";

export const App: FC = memo(() => {
  useModuleWorkerInit();
  useSWRegistration();

  const crossOriginIsolated = isCrossOriginIsolated();

  if (!crossOriginIsolated){
    console.info("Shared array buffers are not supported. Cannot start fps widget");
  }

  return (
      <Layout>
        <div className={styles.content}>
          <WorkerControls />
          <CanvasContainer />
          {crossOriginIsolated && <PerformanceMonitor />}
        </div>
      </Layout>
  );
});

App.displayName = "App";
