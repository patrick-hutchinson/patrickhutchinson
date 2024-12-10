import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import styles from "./ProjectsListView.module.css";
import { renderMedia } from "assets/utils/renderMedia";

import { creditsMapping } from "assets/context/creditsMapping";

import gsap from "gsap";

export default function ProjectsListView({ projects }) {
  const containerRef = useRef();
  const projectsRef = useRef([]);
  const [maxProjects, setMaxProjects] = useState(50); // Max number of projects to display

  // Memoize repeated projects to avoid recalculation on each render
  const repeatedProjects = useMemo(
    () => Array.from({ length: maxProjects }, (_, index) => projects[index % projects.length]),
    [projects, maxProjects]
  );

  useEffect(() => {
    projectsRef.current.forEach((li, liIndex, liArray) => {
      containerRef.current.addEventListener("mousemove", (e) => {
        window.requestAnimationFrame(() => {
          const rect = li.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const distance = Math.abs(e.clientY - centerY);

          const maxDistance = 100; // The maximum distance at which the scaling effect starts to minimize

          let scale = Math.exp(-distance / maxDistance);
          scale = Math.max(scale, 0.05);

          li.style.transform = `scale(${scale})`;
          li.style.height = `${100 * scale}px`;

          // width could also be adjusted dynamically
          // li.style.width = `${(1 + scale) * 100}%`;
        });
      });
    });
  }, []);

  // ListItem Component

  return (
    <ul className={styles.projectList} ref={containerRef}>
      {repeatedProjects.map((project, index) => (
        <Link to={project?.slug?.current}>
          <li
            className={styles.projectListItem}
            key={index}
            index={index}
            ref={(el) => (projectsRef.current[index] = el)}
          >
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
        </Link>
      ))}
    </ul>
  );
}
