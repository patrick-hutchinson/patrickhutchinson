import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./Footer.module.css";

export default function Footer() {
  let currentYear = new Date().getFullYear();

  return (
    <footer>
      <button className={`${styles.externalLink} button`}>
        <div className="button-front">Made by PH×35°</div>
        <div className="button-back">
          <div className="button-back-inner"></div>
        </div>
      </button>
      <p className={`${styles.copyright}`}>{`PH×35° ${currentYear} 🌡️ All Rights Reserved. `}</p>
    </footer>
  );
}
