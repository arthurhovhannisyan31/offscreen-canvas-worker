import { type PropsWithChildren , type ReactNode, type FC } from "react";

import { ModuleWorkerContextContainer } from "./ModuleWorkerContext";
import { StoreContextContainer } from "./StoreContext";

export const ContextCompose: FC<PropsWithChildren> = ({ children }) => (
  <>
    {[
      ModuleWorkerContextContainer,
      StoreContextContainer
    ].reduceRight(
      (child: ReactNode, Container: FC<PropsWithChildren>) => (
        <Container>{child}</Container>
      ),
      children,
    )}
  </>
);
