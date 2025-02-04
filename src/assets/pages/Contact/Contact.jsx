import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./Contact.module.css";

export default function Contact() {
  useEffect(() => {}, []);

  function handleMouseMove(e) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    const adjustedx = e.clientX - left;
    const adjustedy = e.clientY - top;

    const x1 = adjustedx / width;
    const y1 = adjustedy / height;

    const gridrows = `${y1 * 100}% ${(1 - y1) * 100}%`;
    const gridcolumns = `${x1 * 100}% ${(1 - x1) * 100}%`;

    console.log(gridrows);

    e.currentTarget.style.gridTemplateRows = gridrows;
    e.currentTarget.style.gridTemplateColumns = gridcolumns;
  }

  function handleMouseEnter(e, position) {
    let container = e.currentTarget.parentElement;
    if (position == 1) {
      container.style.gridTemplateRows = "80% 20%";
      container.style.gridTemplateColumns = "80% 20%";
    }
    if (position == 2) {
      container.style.gridTemplateRows = "80% 20%";
      container.style.gridTemplateColumns = "20% 80%";
    }
    if (position == 3) {
      container.style.gridTemplateRows = "20% 80%";
      container.style.gridTemplateColumns = "80% 20%";
    }
    if (position == 4) {
      container.style.gridTemplateRows = "20% 80%";
      container.style.gridTemplateColumns = "20% 80%";
    }
  }

  return (
    <div className={styles.contactwrapper}>
      <div onMouseEnter={(e) => handleMouseEnter(e, 1)}>
        <a href="https://www.instagram.com/pa.hson/" target="_blank">
          <img src="/assets/media/instagram.png" alt="Instagram" />
        </a>
      </div>
      <div onMouseEnter={(e) => handleMouseEnter(e, 2)}>
        <a href="https://www.linkedin.com/in/patrick-hutchinson-839226220/" target="_blank">
          <img src="/assets/media/linkedin.png" alt="LinkedIn" />
        </a>
      </div>
      <div onMouseEnter={(e) => handleMouseEnter(e, 3)}>
        <a href="mailto:hutchinsonpatrick@icloud.com" target="_blank">
          <img src="/assets/media/email.png" alt="Email" />
        </a>
      </div>
      <div onMouseEnter={(e) => handleMouseEnter(e, 4)}>
        <a href="">
          <img src="/assets/media/phone.png" alt="Phone" />
        </a>
      </div>
    </div>
  );
}
