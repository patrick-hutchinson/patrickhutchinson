import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./Footer.module.css";

import { GlobalStateContext } from "assets/context/GlobalStateContext";

export default function Footer({ count }) {
  const { isMobile } = useContext(GlobalStateContext);
  let currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>00 out of 12</div>
      <div className={`${styles.copyright}`}>{`© PH ${currentYear} ${isMobile ? "" : ". All Rights Reserved."} `}</div>
      <div>{`${isMobile ? "" : "Last updated"}`}18 April 2025</div>
    </footer>
  );
}
