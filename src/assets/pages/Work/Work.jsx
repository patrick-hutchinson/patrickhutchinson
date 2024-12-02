import React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import styles from "./Work.module.css";

import ProjectNavigation from "./components/ProjectNavigation/ProjectNavigation";

import { GlobalStateContext } from "../../context/GlobalStateContext";
import { renderMedia } from "../../utils/renderMedia";

import sanityClient from "/src/client.js";

export default function Work() {
  const { isMobile } = useContext(GlobalStateContext);

  let [projects, setProjects] = useState();
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="project"]{
      coverimage,
  }`
      )
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  if (!projects || projects.length === 0) {
    return <p>Error Loading Component</p>; // Or some other loading state or message
  }

  let MediaDisplay = () => {
    return <div className={styles.mediaDisplay}>{projects.map((project) => renderMedia(project.coverimage))}</div>;
  };

  return (
    <section className={styles.work}>
      <h1>Work</h1>
      <MediaDisplay />
      {/* {!isMobile && <ProjectNavigation projects={projects} />} */}
    </section>
  );
}
