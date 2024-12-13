import React, { useState, useRef, useEffect, useMemo } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { renderMedia } from "assets/utils/renderMedia";

import styles from "./ViewGrid.module.css";
import { creditsMapping } from "assets/context/creditsMapping";

import { Link } from "react-router-dom";

import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";

export default function ViewGrid({ projects }) {
  let parentRef = useRef();
  const projectsRef = useRef([]);

  let [years, setYears] = useState([2025, 2024, 2023, 2022, 2021, "Older"]);

  let ListItem = ({ project, uniqueIndex }) => {
    return (
      <div className={styles.project} ref={(el) => (projectsRef.current[uniqueIndex] = el)}>
        <div className={styles.projectText}>
          <div className={styles.projectHeader}>
            <div>{project.url}</div>
            <div>
              {formatMonth(project.month)} {formatYear(project.year)}
            </div>
          </div>
          <div className={styles.projectInfo}>
            <ul className={styles.categories}>
              {project.categories?.map((category, index) => {
                const isLast = index === project.categories.length - 1;
                return (
                  <li key={index}>
                    {category}
                    {!isLast && ","}&nbsp;
                  </li>
                );
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
          </div>
        </div>
        {renderMedia(project.coverimage)}
      </div>
    );
  };

  useGSAP(() => {
    if (projectsRef.current.length > 0) {
      console.log(projectsRef.current); // This will log all the elements in the projectsRef array

      gsap.from(projectsRef.current, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [projectsRef.current]); // Re-run animation when projects changes

  // Early return if data is undefined or empty
  if (!projects || projects.length === 0) {
    return <p>Error Loading Component</p>;
  }

  return (
    <div className={styles.projectList} ref={parentRef}>
      {years.map((year, columnIndex) => (
        <div className={`${styles[`column-${columnIndex + 1}`]} ${styles.column}`} key={columnIndex}>
          <div className={styles.yearHeader}>{year}</div>
          {projects
            .filter((project) => project.year === year)
            .map((project, projectIndex) => {
              // Unique integer generation to assign to Refs
              const uniqueIndex = columnIndex * 100 + projectIndex;
              return (
                <Link to={`/work/${project?.slug?.current}`} key={uniqueIndex}>
                  <ListItem key={uniqueIndex} project={project} uniqueIndex={uniqueIndex} />
                </Link>
              );
            })}
        </div>
      ))}
    </div>
  );
}
