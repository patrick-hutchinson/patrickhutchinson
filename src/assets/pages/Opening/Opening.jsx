import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./Opening.module.css";

export default function Opening() {
  return (
    <section className={styles.openingSection}>
      {/* <video autoPlay muted playsInline loop>
        <source src="assets/media/opening.mp4" alt="" />
      </video> */}
      <img src="assets/media/opening.jpg" alt="" />
    </section>
  );
}
