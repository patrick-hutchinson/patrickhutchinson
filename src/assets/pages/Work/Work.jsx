import React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import styles from "./Work.module.css";

import { GlobalStateContext } from "../../context/GlobalStateContext";

import ViewList from "./components/Views/ViewList/ViewList";
import View3D from "./components/Views/View3D/View3D";

import Filtering from "./components/Filtering/Filtering";
import ViewMenu from "./components/ViewMenu/ViewMenu";

import sanityClient from "/src/client.js";

export default function Work() {
  const { isMobile } = useContext(GlobalStateContext);
  let [currentView, setCurrentView] = useState("List View");

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
      credits,
      slug
  }`
      )
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  // Early return if Projects is undefined
  if (!projects || projects.length === 0) {
    return <p>Error Loading Component</p>; // Or some other loading state or message
  }

  return (
    <section className={styles.workSection}>
      <ViewMenu currentView={currentView} setCurrentView={setCurrentView} />
      <Filtering />
      {currentView == "List View" && <ViewList projects={projects} />}
      {currentView == "3D View" && <View3D projects={projects} />}
    </section>
  );
}
