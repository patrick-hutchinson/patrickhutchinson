import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./Header.module.css";

export default function Header() {
  let [isVisible, setIsVisible] = React.useState(false);

  function toggleMenu() {
    setIsVisible(!isVisible);
  }

  let Menu = () => (
    <nav className={styles.menu}>
      <ul>
        <li>About</li>
        <li>Work</li>
        <li>News</li>
        <li>Contact</li>
      </ul>
    </nav>
  );

  return (
    <header>
      <div className={styles.logo}>
        <span>PH ×</span>
        <img src="/assets/media/logo.gif" alt="" />
      </div>

      <div className={styles.menuContainer}>
        <div className={`${styles.menuButton} button`} onClick={toggleMenu}>
          MENU
        </div>
        {isVisible && <Menu />}
      </div>
    </header>
  );
}
