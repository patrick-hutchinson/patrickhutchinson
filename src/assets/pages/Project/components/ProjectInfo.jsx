import React from "react";

import styles from "../Project.module.css";
import Categories from "assets/components/Categories/Categories";

import { creditsMapping } from "assets/utils/creditsMapping";

import FlipText from "assets/components/Animations/FlipText";

export default function ProjectInfo({ project }) {
  return (
    <div className={styles.projectText}>
      <div className={styles.projectInfo}>
        <ul className={styles.categories}>
          <div className={styles["section-header"]}>
            <FlipText string="Involvement" />
          </div>
          <Categories project={project} />
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
  );
}
