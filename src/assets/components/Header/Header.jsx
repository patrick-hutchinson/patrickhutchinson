import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./Header.module.css";

import { Link } from "react-router-dom";
import { keyBy } from "lodash";

export default function Header() {
  let colorModes = [
    { backgroundColor: "#DF0002", fontColor: "#121111" },
    { backgroundColor: "#D9DAD9", fontColor: "#121111" },
    { backgroundColor: "#121111", fontColor: "#D9DAD9" },
  ];

  const handleMode = (color) => {
    document.querySelector(":root").style.setProperty("--background-color", color.backgroundColor);
    document.querySelector(":root").style.setProperty("--font-color", color.fontColor);
  };
  return (
    <header>
      <div className={styles["header-inner"]}>
        <div>
          <Link to="/">
            <span>SELECTED</span>
          </Link>
          <Link to="/index">
            <span>INDEX</span>
          </Link>
          <Link to="/services">
            <span>SERVICES</span>
          </Link>
          <Link to="/public">
            <span>PUBLIC</span>
          </Link>
        </div>

        <div>
          <div>
            PATRICK HUTCHINSON (GER) IS A GRAPHIC DESIGNER AND FRONT-END DEVELOPER BASED IN AMSTERDAM (NED). HE
            SPECIALIZES ON WEB-, INTERACTION- AND TYPE DESIGN AND MOSTLY USES CODE, VISUAL PROGRAMMING AND
            ANIMATION-BASED TOOLS TO BUILD HIS WORK.
          </div>
          <br />
          <ul className={styles.socials}>
            <li>Email</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>GitHub</li>
          </ul>
        </div>

        <div>
          <ul className="color-selection">
            {colorModes.map((color, index) => {
              return (
                <li onClick={() => handleMode(color)} style={{ background: color.backgroundColor }} key={index}></li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
