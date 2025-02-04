import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./Header.module.css";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" className={styles.logo}>
        <button className={`${styles.externalLink} button`}>
          <div className={`button-front ${styles["button-front"]}`}>
            <span>PH ×</span>
          </div>
          <div className="button-back">
            <div className="button-back-inner"></div>
          </div>
        </button>
      </Link>
      <button className="button">
        <div className={`button-front ${styles["button-front"]}`}>
          <span>MENU</span>
        </div>
        <div className="button-back">
          <div className="button-back-inner"></div>
        </div>
      </button>
    </header>
  );
}
