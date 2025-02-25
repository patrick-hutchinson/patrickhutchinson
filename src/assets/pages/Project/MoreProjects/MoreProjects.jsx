import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./MoreProjects.module.css";
import { getFileSrc } from "../../../utils/getFileSrc";
import { renderMedia } from "../../../utils/renderMedia";

export default function MoreProjects({ projects }) {
  const moreprojectsRef = useRef(null);

  function handlePan(direction) {
    if (direction === "left") {
      moreprojectsRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
    if (direction === "right") {
      moreprojectsRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  }

  let Media = ({ project }) => {
    return project.coverimage && renderMedia(project.coverimage);
  };

  const ProjectList = () => (
    <div className={styles["moreprojects-wrapper"]}>
      <div className={styles["moreprojects"]} ref={moreprojectsRef}>
        {projects.map((project, index) => {
          return (
            <Link to={`/work/${project.slug.current}`} key={index}>
              <Media project={project} />
            </Link>
          );
        })}
      </div>

      <div className={`${styles["navigation-wrapper"]}`}>
        <div className={`${styles.panButton}`} onClick={() => handlePan("left")}>
          <img src="/assets/images/arrow-left.svg" alt="arrow-left" />
        </div>
        <div className={`${styles.panButton}`} onClick={() => handlePan("right")}>
          <img src="/assets/images/arrow-right.svg" alt="arrow-left" />
        </div>
      </div>
    </div>
  );
  return (
    <section>
      <h2>More Projects</h2>
      <ProjectList />
    </section>
  );
}
