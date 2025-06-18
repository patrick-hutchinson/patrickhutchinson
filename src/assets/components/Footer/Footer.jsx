import React, { useContext } from "react";

import styles from "./Footer.module.css";

import { StateContext } from "@context/StateContext";

export default function Footer() {
  const { isMobile } = useContext(StateContext);
  let currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        For typeface inquiries, please contact me via <a href="mailto:hutchinsonpatrick@icloud.com">email</a>!
      </p>

      <div className={styles["footer-inner"]}>
        <div className={`${styles.copyright}`}>© PH All Rights Reserved.</div>

        <div>
          <div>
            Veldbiesweg 14 <br /> 1033PM Amsterdam
          </div>
          <div>VAT Number: NL642937278B01</div>
        </div>
        <ul>
          <li>
            <a href="https://instagram.com/pa.hson" target="_blank">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/patrick-hutchinson-839226220/" target="_blank">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="mailto:hutchinsonpatrick@icloud.com" target="_blank">
              Email
            </a>
          </li>
        </ul>
        <div>Designed and Developed by Patrick Hutchinson</div>
        <div>Last updated 18 April 2025</div>
      </div>
    </footer>
  );
}
