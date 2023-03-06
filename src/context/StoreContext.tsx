import { createContext, memo, type PropsWithChildren, useState, useCallback } from "react";

import { rootStore, type RootStore } from "../store/store";

interface StoreContextState {
  store: RootStore;
  setStore: (store: RootStore) => void;
}

const storeContextStateInitValue: StoreContextState = {
  store: rootStore,
  setStore: () => null
};

export const StoreContext = createContext<StoreContextState>(storeContextStateInitValue);

export const StoreContextContainer = memo<PropsWithChildren>(({ children }) => {
  const [store, setStore] = useState(rootStore);

  const handleSetStore = useCallback((store: RootStore) => {
    setStore(store);
  }, []);

  const storeContextStateValue: StoreContextState = {
    store: store,
    setStore: handleSetStore
  };

  return (
    <StoreContext.Provider value={storeContextStateValue}>
      {children}
    </StoreContext.Provider>
  );
});

StoreContextContainer.displayName = "StoreContextContainer";
