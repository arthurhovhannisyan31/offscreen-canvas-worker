import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";

import { App } from "components/App/App";

import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={"Loading"}>
      <App />
    </Suspense>
  </StrictMode>,
);
