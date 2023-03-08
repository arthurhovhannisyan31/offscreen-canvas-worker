import { useContext } from "react";

import type { RootStore } from "../store/store";

import { StoreContext } from "../context/StoreContext";

export const useStore = (): RootStore => useContext(StoreContext);
