import React from "react";
import { useEffect, useState, useRef } from "react";

import styles from "./ProjectsListView.module.css";
import { renderMedia } from "assets/utils/renderMedia";

export default function ProjectsListView({ projects }) {
  let containerRef = useRef();

  // TO DO:

  // Creation of li and scale assignment happen simulaneously, in order to keep generating li's until the container is full
  // Optimally determined by const

  useEffect(() => {
    let container = containerRef.current;
    let containerHeight = container.getBoundingClientRect().height;
    let totalHeight = 0; // Accumulate height for each item

    container.addEventListener("mousemove", handleMouseMove());

    function handleMouseMove() {}

    container.querySelectorAll(`.${styles.projectListItem}`).forEach((projectListItem, index) => {
      let randomScale = Math.random() * (1 - 0.1) + 0.1; // Random value between 0.1 and 1
      projectListItem.style.transform = `scale(${randomScale})`; // Apply the random scale

      const originalHeight = projectListItem.offsetHeight;
      const scaledHeight = originalHeight * randomScale;

      if (index === 0) {
        projectListItem.style.top = "0px";
      } else {
        projectListItem.style.top = `${totalHeight}px`;
      }

      totalHeight += scaledHeight;

      console.log(containerHeight, containerHeight - totalHeight, "minusHeight");
    });
  }, []);

  const creditsMapping = [
    { key: "clients", title: "Client" },
    { key: "directors", title: "Direction" },
    { key: "creativedirectors", title: "Creative Director" },
    { key: "clientdirectors", title: "Client Director" },
    { key: "designers", title: "Designer" },
    { key: "artists3D", title: "3D Artist" },
    { key: "photographers", title: "Photography" },
  ];

  let ListItem = ({ project }) => {
    return (
      <li className={styles.projectListItem}>
        {/* <div className={styles.marker}></div> */}
        {renderMedia(project.thumbnail)}
        <h4>{project.year}</h4>
        <div className={styles.projectTitle}>{project.name}</div>
        <ul>
          {project.categories?.map((category, index) => {
            return <li key={index}>{category}</li>;
          })}
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
      {projects.map((project, index) => {
        return <ListItem project={project} key={index} />;
      })}
    </ul>
  );
}
