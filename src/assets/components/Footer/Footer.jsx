import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./Footer.module.css";

export default function Footer({ count }) {
  let currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>00 out of 12</div>
      <div className={`${styles.copyright}`}>{`PH ${currentYear}. All Rights Reserved. `}</div>
      <div>Last updated 18 April 2025</div>
    </footer>
  );
}
