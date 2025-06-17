import { useRef, useEffect, useState } from "react";
import styles from "../home.module.css";
import randomColorScheme from "../../../assets/utils/colorSchemes";

export default function Current({ ongoing }) {
  const linkRef = useRef();
  const [colorScheme, setColorScheme] = useState({ background: "#000", font: "#fff" });

  useEffect(() => {
    setColorScheme(randomColorScheme());
  }, []);

  useEffect(() => {
    const container = linkRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth / 2;
    let scrollPos = 0;
    const speed = 1;
    const interval = 20;

    const scroll = () => {
      scrollPos += speed;
      if (scrollPos >= scrollWidth) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
    };

    const scrollInterval = setInterval(scroll, interval);
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className={styles["section-container"]}>
      <div className={styles["section"]} style={{ marginTop: "30px" }}>
        <div className="col-span-6 grid-6" style={{ background: "#000", color: "#fff", padding: "5px", width: "50%" }}>
          <div className="col-span-2">Ongoing Projects</div>
          <div className="col-span-4" style={{ opacity: 0.8 }}>
            {`(${ongoing.length} Projects)`}
          </div>
        </div>

        <div
          className={styles["availability--container"]}
          ref={linkRef}
          style={{
            background: colorScheme.background,
            color: colorScheme.font,
          }}
        >
          <div className="scroll-text">
            {Array(16)
              .fill("Currently open for commissions! ")
              .map((msg, i) => (
                <span key={i}>{msg}</span>
              ))}
          </div>
        </div>

        <div className={styles["running-notice"]}>
          <p>
            Current collaborations and clients include small to medium-scale artists and studios, local production, and
            cultural institutions. <br />
            Here’s what’s on the agenda.
          </p>

          <div className={styles["upcoming-container"]}>
            <ul className={styles["upcoming"]}>
              {ongoing.map((ongoingProject) => (
                <li key={ongoingProject.name}>
                  <span>Project</span>
                  <span>{ongoingProject.projectType}</span>
                  <span>{ongoingProject.name}</span>
                  <span>{ongoingProject.location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div style={{ background: "#ccc", width: "100vw", height: "30px" }}></div>
    </div>
  );
}
