import { useRef } from "react";
import styles from "../Header.module.css";
import Link from "next/link";

import MaskSplitText from "@animations/MaskSplitText";

export default function MobileHeader() {
  let expandMenuRef = useRef(null);

  function toggleMenu() {
    expandMenuRef.current.classList.add(`${styles.expanded}`);
  }
  function closeMenu() {
    expandMenuRef.current.classList.remove(`${styles.expanded}`);
  }

  return (
    <div>
      <header id="header">
        <div className={styles["header-inner"]}>
          <div>
            <div
              onClick={() => {
                toggleMenu();
              }}
            >
              MENU
            </div>
          </div>

          <div>
            <div>
              <MaskSplitText>
                <p>PATRICK HUTCHINSON (GER) IS A GRAPHIC DESIGNER AND FRONT-END DEVELOPER BASED IN AMSTERDAM (NED).</p>
              </MaskSplitText>
            </div>
          </div>
        </div>
      </header>

      <div ref={expandMenuRef} className={styles.expandMenu}>
        <div className={styles.close} onClick={() => closeMenu()}>
          <h2>X</h2>
        </div>
        <Link href="/" onClick={() => closeMenu()}>
          <h2>
            <span className={styles["menu-item"]}>Selected</span>
          </h2>
        </Link>
        <Link href="/index" onClick={() => closeMenu()}>
          <h2>
            <span className={styles["menu-item"]}>Index</span>
          </h2>
        </Link>
        <Link href="/services" onClick={() => closeMenu()}>
          <h2>
            <span className={styles["menu-item"]}>Services</span>
          </h2>
        </Link>
        <Link href="/public" onClick={() => closeMenu()}>
          <h2>
            <span className={styles["menu-item"]}>Public</span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
