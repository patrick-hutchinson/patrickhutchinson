import styles from "../Header.module.css";

import Link from "next/link";

export default function DesktopHeader({ colorModes }) {
  const handleMode = (color) => {
    document.querySelector(":root").style.setProperty("--background-color", color.backgroundColor);
    document.querySelector(":root").style.setProperty("--font-color", color.fontColor);
  };

  return (
    <header id="header">
      <div className={styles["header-inner"]}>
        <div>
          <Link href="/">
            <span className={styles["menu-item"]}>SELECTED</span>
          </Link>
          <Link href="/index">
            <span className={styles["menu-item"]}>INDEX</span>
          </Link>
          <Link href="/services">
            <span className={styles["menu-item"]}>SERVICES</span>
          </Link>
          <Link href="/public">
            <span className={styles["menu-item"]}>PUBLIC</span>
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
            <li className="link">
              <a href="mailto:hutchinsonpatrick@icloud.com" target="_blank">
                Email
              </a>
            </li>
            <li className="link">
              <a href="https://www.instagram.com/pa.hson/" target="_blank">
                Instagram
              </a>
            </li>
            <li className="link">
              <a href="https://www.linkedin.com/in/patrick-hutchinson-839226220/">LinkedIn</a>
            </li>
            <li className="link">
              <a href="https://github.com/patrick-hutchinson">GitHub</a>
            </li>
          </ul>
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
  );
}
