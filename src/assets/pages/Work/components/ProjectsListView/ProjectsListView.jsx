import React, { useState, useRef, useEffect, useMemo } from "react";

import styles from "./ProjectsListView.module.css";
import { renderMedia } from "assets/utils/renderMedia";

import { creditsMapping } from "assets/context/creditsMapping";

export default function ProjectsListView({ projects }) {
  const containerRef = useRef();
  const [maxProjects, setMaxProjects] = useState(50); // Max number of projects to display

  // Memoize repeated projects to avoid recalculation on each render
  const repeatedProjects = useMemo(
    () => Array.from({ length: maxProjects }, (_, index) => projects[index % projects.length]),
    [projects, maxProjects]
  );

  useEffect(() => {
    const containerHeight = containerRef.current.getBoundingClientRect().height;
    const desiredHeight = containerHeight / maxProjects;

    const listItemHeight = document.querySelector(`.${styles.projectListItem}`).getBoundingClientRect().height;
    const listItemScaleFactor = 1 / (listItemHeight / desiredHeight);
  }, [maxProjects]);

  // Use requestAnimationFrame to limit the number of calculations per frame
  const handleMouseMove = (e) => {
    window.requestAnimationFrame(() => {
      containerRef.current.querySelectorAll(`.${styles.projectListItem}`).forEach((listItem) => {
        const rect = listItem.getBoundingClientRect();

        const centerY = rect.top + rect.height / 2;
        const distance = Math.abs(e.clientY - centerY);

        const maxDistance = 20; // The maximum distance at which the scaling effect starts to minimize

        // Exponential decay scale calculation: the scale decreases more rapidly with distance
        let scale = Math.exp(-distance / maxDistance);

        // Ensure the scale doesn't go below 0.0864
        scale = Math.max(scale, 0.0864);

        // Apply the scale to the listItem
        listItem.style.transform = `scale(${scale})`;
      });
    });
  };

  useEffect(() => {
    const handle = (e) => handleMouseMove(e);
    containerRef.current.addEventListener("mousemove", handle);
    return () => containerRef.current.removeEventListener("mousemove", handle);
  }, []);

  // ListItem Component
  const ListItem = ({ project, index }) => {
    const listItemStyles = {
      base: {
        transform: "scale(0.0864)",
        top: `${index * 6.35}px`,
      },
    };
    return (
      <li className={styles.projectListItem} key={index} style={{ ...listItemStyles.base }}>
        {renderMedia(project.thumbnail)}
        <h4>{project.year}</h4>
        <div className={styles.projectTitle}>{project.name}</div>
        <ul>
          {project.categories?.map((category, i) => (
            <li key={i}>{category}</li>
          ))}
        </ul>
        <ul className={styles["credits-inhouse"]}>
          {project.creditsInhouse &&
            creditsMapping.map(
              ({ key, title }) =>
                project.creditsInhouse[key] && (
                  <li className={`${styles.credit}`} key={key}>
                    {title}: <br />
                    {project.creditsInhouse[key].join(", ")}
                    <br />
                    <br />
                  </li>
                )
            )}
        </ul>
      </li>
    );
  };

  return (
    <ul className={styles.projectList} ref={containerRef}>
      {repeatedProjects.map((project, index) => (
        <ListItem project={project} index={index} key={index} />
      ))}
    </ul>
  );
}
