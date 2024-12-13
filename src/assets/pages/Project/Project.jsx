import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import styles from "./Project.module.css";

import sanityClient from "/src/client.js";

import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";
import { creditsMapping } from "assets/context/creditsMapping";

import { renderMedia } from "assets/utils/renderMedia";

export default function Project() {
  let [projects, setProjects] = useState();
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="project"]{
        _id,
      name,
      coverimage,
      thumbnail,
      month,
      year, 
      url,
      categories,
      credits,
      slug
  }`
      )
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  const { slug } = useParams();

  // Early return if Projects is undefined
  if (!projects || projects.length === 0) {
    return <p>Error Loading Component</p>; // Or some other loading state or message
  }

  const project = projects.find((project) => project.slug.current === slug);

  return (
    <div className={styles.projectContainer}>
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

      <div className={styles["project-footer"]}>
        <a href={`https://${project.url}`} target="_blank">
          <button className={`externalLink button`}>
            <div className="button-front">Visit Website ↗</div>
            <div className="button-back">
              <div className="button-back-inner"></div>
            </div>
          </button>
        </a>
      </div>
    </div>
  );
}
