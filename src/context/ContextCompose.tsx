import { type PropsWithChildren , type ReactNode, type FC } from "react";

import { ModuleWorkerContextContainer } from "./ModuleWorkerContext";

export const ContextCompose: FC<PropsWithChildren> = ({ children }) => (
  <>
    {[
      ModuleWorkerContextContainer
    ].reduceRight(
      (child: ReactNode, Container: FC<PropsWithChildren>) => (
        <Container>{child}</Container>
      ),
      children,
    )}
  </>
);
