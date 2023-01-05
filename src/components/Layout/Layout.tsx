import { memo } from "react";

import type { LayoutProps } from "./Layout.types";

import styles from "./Layout.module.css";

export const Layout = memo<LayoutProps>(({ children }) => {
  return(
    <div className={styles.container}>
      <header className={styles.infoBlock}>
        <span className={styles.info}>header</span>
      </header>
      <main className={styles.mainContent}>
        {children}
      </main>
      <footer className={styles.infoBlock}>
        <span className={styles.info}>footer</span>
      </footer>
    </div>
  );
});

Layout.displayName = "Layout";
