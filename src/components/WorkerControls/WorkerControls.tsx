import { observer } from "mobx-react-lite";

import { WorkerControlsComponent } from "./WorkerControlsComponent";
import { useStore } from "../../hooks/useStore";

export const WorkerControls = observer(() => {
  const { moduleWorker } = useStore();

  return(
    <WorkerControlsComponent
      fpsModuleActive={moduleWorker.FpsModuleActive}
      twinsModuleActive={moduleWorker.TwinsModuleActive}
      setModuleWorkerStatus={moduleWorker.setModuleStatus}
      toggleAllWorkers={moduleWorker.toggleAllWorkers}
    />
  );
});

WorkerControls.displayName = "WorkerControls";
