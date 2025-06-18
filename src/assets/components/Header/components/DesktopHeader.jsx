import { useEffect, useRef } from "react";
import styles from "../Header.module.css";

import Link from "next/link";

export default function DesktopHeader() {
  let linkRef = useRef(null);

  useEffect(() => {
    const refElement = linkRef.current;
    if (!refElement) return;

    let scrollPos = 0;
    const speed = 1; // pixels per frame
    const interval = 20; // ms

    const scroll = () => {
      scrollPos += speed;
      if (scrollPos >= refElement.scrollWidth / 2) {
        scrollPos = 0;
      }
      refElement.scrollLeft = scrollPos;
    };

    const scrollInterval = setInterval(scroll, interval);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <header id={styles.header}>
      <div className={`${styles["header-inner"]} grid-12`}>
        <div className="col-span-3">
          <Link href="/services">
            <span className={styles["menu-item"]}>Patrick Hutchinson</span>
          </Link>
        </div>

        <div className="col-span-7">
          <span className={styles["menu-item"]}>Selected, </span>

          <span className={styles["menu-item"]}>Index, </span>
          <Link href="/services">
            <span className={styles["menu-item"]}>+ Services</span>
          </Link>
        </div>

        <div className={`${styles["email-button"]} col-span-2`} ref={linkRef}>
          <div className="scroll-text">
            <span>HutchinsonPatrick@icloud.com&nbsp;</span>
            <span>HutchinsonPatrick@icloud.com&nbsp;</span>
          </div>
        </div>
      </div>
      <div className={`${styles["header-announcement"]} col-span-12`}></div>
    </header>
  );
}
