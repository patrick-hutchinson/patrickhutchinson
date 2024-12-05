import React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import styles from "./Work.module.css";

import ProjectNavigation from "./components/ProjectNavigation/ProjectNavigation";

import { GlobalStateContext } from "../../context/GlobalStateContext";
import { renderMedia } from "../../utils/renderMedia";

import ProjectsListView from "./components/ProjectsListView/ProjectsListView";
import CarousellView from "./components/CarousellView/CarousellView";

import sanityClient from "/src/client.js";

export default function Work() {
  let workSectionRef = useRef();
  const { isMobile } = useContext(GlobalStateContext);

  let [view, setView] = useState("List View");

  let [projects, setProjects] = useState();
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="project"]{
      name,
      thumbnail,
      year,
      url,
      categories,
      creditsInhouse
  }`
      )
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  if (!projects || projects.length === 0) {
    return <p>Error Loading Component</p>; // Or some other loading state or message
  }

  let ViewMenu = () => {
    return (
      <ul>
        <li onClick={(e) => handleView(e.currentTarget)}>3D View</li>
        <li onClick={(e) => handleView(e.currentTarget)}>List View</li>
      </ul>
    );
  };

  function handleView(target) {
    setView(target.textContent);
  }

  return (
    <section className={styles.workSection} ref={workSectionRef}>
      {/* <h1>Work</h1> */}
      {/* <ViewMenu /> */}
      {view == "List View" && <ProjectsListView projects={projects} />}
      {view == "3D View" && <CarousellView projects={projects} />}
    </section>
  );
}
