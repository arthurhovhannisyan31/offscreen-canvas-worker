import { memo } from "react";

import type { LayoutProps } from "./Layout.types"

export const Layout = memo<LayoutProps>(({children}) => {
  return(
      <article>
        <header>
          <p>header</p>
        </header>
        <main>
          {children}
        </main>
        <footer>
          <p>footer</p>
        </footer>
      </article>
  )
})

Layout.displayName = "Layout"
