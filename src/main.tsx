import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";

import { App } from "components/App/App";

import { ContextCompose } from "./context";
import "./workers";

import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ContextCompose>
      <Suspense fallback={"Loading"}>
        <App />
      </Suspense>
    </ContextCompose>
  </StrictMode>,
);
