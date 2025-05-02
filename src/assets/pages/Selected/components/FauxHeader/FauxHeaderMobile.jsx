import { useRef } from "react";
import styles from "../../Selected.module.css";
import { Link } from "react-router-dom";

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

export default function FauxHeaderMobile() {
  let expandMenuRef = useRef(null);

  const handleMode = (color) => {
    document.querySelector(":root").style.setProperty("--background-color", color.backgroundColor);
    document.querySelector(":root").style.setProperty("--font-color", color.fontColor);
  };

  function toggleMenu() {
    expandMenuRef.current.classList.add(`${styles.expanded}`);
  }
  function closeMenu() {
    expandMenuRef.current.classList.remove(`${styles.expanded}`);
  }

  return (
    <>
      <div className={styles["faux-header"]}>
        <div className={styles["header-inner"]}>
          <div>
            <div
              onClick={() => {
                toggleMenu();
              }}
              className={styles["menu-button"]}
            >
              <img src="/assets/media/menu.svg" alt="" />
            </div>
          </div>

          <div>
            <div>
              <FlipText
                string={`Patrick Hutchinson (GER) is a graphic designer and front-end developer based in Amsterdam (NED).`}
              />

              <FauxHeaderSplit
                string={`HE SPECIALIZES ON WEB-, INTERACTION- AND TYPE DESIGN AND MOSTLY USES CODE, VISUAL PROGRAMMING AND ANIMATION-BASED TOOLS TO BUILD HIS WORK.`}
              />
            </div>
            <br />
            <ul className={styles.socials}>
              <li className="link">
                <a href="mailto:hutchinsonpatrick@icloud.com" target="_blank">
                  <FauxHeaderSplit string="MAIL" />
                </a>
              </li>
              <li className="link">
                <a href="https://www.instagram.com/pa.hson/" target="_blank">
                  <FauxHeaderSplit string="IG" />
                </a>
              </li>
              <li className="link">
                <a href="https://www.linkedin.com/in/patrick-hutchinson-839226220/">
                  <FauxHeaderSplit string="LINKEDIN" />
                </a>
              </li>
              <li className="link">
                <a href="https://github.com/patrick-hutchinson">
                  <FauxHeaderSplit string="Git" />
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

      <div ref={expandMenuRef} className={styles.expandMenu}>
        <div className={styles.close} onClick={() => closeMenu()}>
          X
        </div>

        <Link to="/" onClick={() => closeMenu()}>
          <h2>
            <span className={styles["menu-item"]}>Selected</span>
          </h2>
        </Link>
        <Link to="/index" onClick={() => closeMenu()}>
          <h2>
            <span className={styles["menu-item"]}>Index</span>
          </h2>
        </Link>

        <Link to="/services" onClick={() => closeMenu()}>
          <h2>
            <span className={styles["menu-item"]}>Services</span>
          </h2>
        </Link>

        <Link to="/public" onClick={() => closeMenu()}>
          <h2>
            <span className={styles["menu-item"]}>Public</span>
          </h2>
        </Link>
      </div>
    </>
  );
}
