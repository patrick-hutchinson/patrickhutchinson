import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./Header.module.css";

import { Link } from "react-router-dom";

export default function Header() {
  let [isVisible, setIsVisible] = React.useState(false);

  function toggleMenu() {
    setIsVisible(!isVisible);
  }

  let Menu = () => (
    <nav className={styles.menu}>
      <ul>
        <Link to="/">
          <li>About</li>
        </Link>
        <Link to="/">
          <li>Work</li>
        </Link>
        <Link to="/">
          <li>News</li>
        </Link>
        <Link to="/">
          <li>Contact</li>
        </Link>
      </ul>
    </nav>
  );

  return (
    <header>
      <Link to="/" className={styles.logo}>
        <button className={`${styles.externalLink} button`}>
          <div className={`button-front ${styles["button-front"]}`}>
            <span>PH ×</span>
            <img src="/assets/media/logo.gif" alt="" />
          </div>
          <div className="button-back">
            <div className="button-back-inner"></div>
          </div>
        </button>
      </Link>

      <div className={styles.menuContainer}>
        <button className={`${styles.externalLink} button`} onClick={toggleMenu}>
          <div className="button-front">MENU</div>
          <div className="button-back">
            <div className="button-back-inner"></div>
          </div>
        </button>
        {isVisible && <Menu />}
      </div>
    </header>
  );
}
