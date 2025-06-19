import React from "react";

import styles from "../project.module.css";
import Categories from "@components/Categories/Categories";

import { creditsMapping } from "@utils/creditsMapping";

import FlipText from "@components/Animations/FlipText";

export default function ProjectInfo({ project }) {
  return (
    <div>
      <div style={{ background: "#000", width: "50%", padding: "5px", color: "#fff" }}>Project Info:</div>
      <div className={styles.projectText}>
        <div className={styles.projectInfo}>
          <ul className={styles.categories}>
            <div className={styles["section-header"]}>
              <FlipText string="Involvement" />
            </div>
            <div className="projectpage-container">
              <Categories project={project} />
            </div>
          </ul>

          {/* Credits */}
          <ul className={styles.credits}>
            <div className={styles["section-header"]}>
              <FlipText string="Credits" />
            </div>
            {project.credits &&
              creditsMapping.map(
                ({ key, title }) =>
                  project.credits[key] && (
                    <div className={`${styles.creditcontainer} `} key={key}>
                      <div className={styles[`creditcount_${project.credits[key].length}`]}>
                        <li className={`${styles.credit}`}>
                          <FlipText string={`${title}:`} />
                        </li>
                        <li>
                          {project.credits[key].map((item, index) => (
                            <React.Fragment key={index}>
                              <FlipText string={item} />
                              {index !== project.credits[key].length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </li>
                      </div>
                    </div>
                  )
              )}
          </ul>
        </div>
      </div>
    </div>
  );
}
