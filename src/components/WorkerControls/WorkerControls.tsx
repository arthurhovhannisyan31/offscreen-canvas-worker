import { observer } from "mobx-react-lite";
import { useContext } from "react";

import { WorkerControlsComponent } from "./WorkerControlsComponent";
import { ModuleWorkerContext } from "../../context";
import { useStore } from "../../hooks/useStore";

export const WorkerControls = observer(() => {
  const { moduleWorker } = useStore();
  const { worker } = useContext(ModuleWorkerContext);

  return(
    <WorkerControlsComponent
      fpsModuleActive={moduleWorker.FpsModuleActive}
      twinsModuleActive={moduleWorker.TwinsModuleActive}
      statusLog={moduleWorker.statusLog}
      worker={worker}
    />
  );
});

WorkerControls.displayName = "WorkerControls";
