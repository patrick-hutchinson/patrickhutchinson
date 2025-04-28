import React, { useEffect, useState, useRef, useContext } from "react";

import styles from "../../Selected.module.css";
import { Link } from "react-router-dom";

import { GlobalStateContext } from "assets/context/GlobalStateContext";

import FlipText from "assets/components/Animations/FlipText";
import FauxHeaderSplit from "./components/FauxHeaderSplit";
let colorModes = [
  { backgroundColor: "#DF0002", fontColor: "#121111" },
  { backgroundColor: "#ffffff", fontColor: "#121111" },
  { backgroundColor: "#121111", fontColor: "#D9DAD9" },
];

const handleMode = (color) => {
  document.querySelector(":root").style.setProperty("--background-color", color.backgroundColor);
  document.querySelector(":root").style.setProperty("--font-color", color.fontColor);
};

export default function FauxHeaderDesktop() {
  const { isMobile } = useContext(GlobalStateContext);

  return (
    <div className={styles["faux-header"]}>
      <div className={styles["header-inner"]}>
        <div>
          <Link to="/">
            <span className={styles["menu-item"]}>
              <FlipText string="SELECTED" />
            </span>
          </Link>
          <Link to="/index">
            <span className={styles["menu-item"]}>
              <FlipText string="INDEX" />
            </span>
          </Link>
          <Link to="/services">
            <span className={styles["menu-item"]}>
              <FlipText string="SERVICES" />
            </span>
          </Link>
          <Link to="/public">
            <span className={styles["menu-item"]}>
              <FlipText string="PUBLIC" />
            </span>
          </Link>
        </div>

        <div>
          <div>
            <FlipText
              string={`Patrick Hutchinson (GER) is a graphic designer and front-end developer based in Amsterdam (NED). HE SPECIALIZES ON WEB-, INTERACTION- AND TYPE DESIGN AND MOSTLY USES CODE, VISUAL PROGRAMMING AND ANIMATION-BASED TOOLS TO BUILD HIS WORK.`}
            />
          </div>
          <br />
          <ul className={styles.socials}>
            <li className="link">
              <a href="mailto:hutchinsonpatrick@icloud.com" target="_blank">
                <FlipText string="EMAIl" />
              </a>
            </li>
            <li className="link">
              <a href="https://www.instagram.com/pa.hson/" target="_blank">
                <FlipText string="EMAIl" />
              </a>
            </li>
            <li className="link">
              <a href="https://www.linkedin.com/in/patrick-hutchinson-839226220/">
                <FlipText string="LINKEDIN" />
              </a>
            </li>
            <li className="link">
              <a href="https://github.com/patrick-hutchinson">
                <FlipText string="GITHUB" />
              </a>
            </li>
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
    </div>
  );
}
