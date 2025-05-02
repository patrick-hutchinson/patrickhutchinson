import { useRef } from "react";
import styles from "../Header.module.css";
import { Link } from "react-router-dom";

import FlipText from "assets/components/Animations/FlipText";

export default function MobileHeader({ colorModes }) {
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
    <div>
      <header>
        <div className={styles["header-inner"]}>
          <div>
            <div
              onClick={() => {
                toggleMenu();
              }}
            >
              MENU
            </div>
          </div>

          <div>
            <div>
              <FlipText
                string={`PATRICK HUTCHINSON (GER) IS A GRAPHIC DESIGNER AND FRONT-END DEVELOPER BASED IN AMSTERDAM (NED). `}
              />
            </div>
          </div>

          <div>
            <ul className="color-selection">
              {colorModes.map((color, index) => {
                return (
                  <li
                    onClick={() => handleMode(color)}
                    style={{ background: color.backgroundColor, border: `0.5px solid ${color.fontColor}` }}
                    key={index}
                  ></li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>

      <div ref={expandMenuRef} className={styles.expandMenu}>
        <div className={styles.close} onClick={() => closeMenu()}>
          <h2>X</h2>
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
    </div>
  );
}
