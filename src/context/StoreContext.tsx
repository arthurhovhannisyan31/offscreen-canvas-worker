import { createContext, memo, type PropsWithChildren } from "react";

import { rootStore, type RootStore } from "../store/store";

export const StoreContext = createContext<RootStore>(rootStore);

export const StoreContextContainer = memo<PropsWithChildren>(({ children }) => {

  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
});

StoreContextContainer.displayName = "StoreContextContainer";
