import React, { useState, useRef, useEffect, useMemo } from "react";

import { renderMedia } from "assets/utils/renderMedia";

import styles from "./ViewGrid.module.css";
import { creditsMapping } from "assets/context/creditsMapping";

export default function ViewGrid({ projects }) {
  let parentRef = useRef();
  let [years, setYears] = useState([2025, 2024, 2023, 2022, "Other"]);

  let ListItem = ({ project, index }) => {
    return (
      <div className={styles.projectPreview} key={index}>
        <div className={styles.titleContainer}>
          <div>{project.url}</div>
          <div>{project.year}</div>
        </div>
        {/* <div className={styles.infoRow}>
          <ul>
            {project.categories?.map((category) => {
              return <li>{category}</li>;
            })}
          </ul>
          <ul className={styles.credits}>
            {project.credits &&
              creditsMapping.map(
                ({ key, title }) =>
                  project.credits[key] && (
                    <li className={`${styles.credit}`} key={key}>
                      {title}: {project.credits[key].join(", ")}
                    </li>
                  )
              )}
          </ul>
        </div> */}
        {renderMedia(project.thumbnail)}
      </div>
    );
  };

  // Early return if data is undefined or empty
  if (!projects || projects.length === 0) {
    return <p>Error Loading Component</p>;
  }

  return (
    <div className={styles.projectList} ref={parentRef}>
      {years.map((year, index) => (
        <div className={`${styles[`column-${index + 1}`]} ${styles.column}`} key={index}>
          <div>{year}</div>
          {projects
            .filter((project) => project.year === year)
            .map((project, index) => (
              <ListItem key={index} project={project} />
            ))}
        </div>
      ))}
    </div>
  );
}
