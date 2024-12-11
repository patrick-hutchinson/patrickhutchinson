import React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import sanityClient from "/src/client.js";

import { GlobalStateContext } from "../../context/GlobalStateContext";

import ViewList from "./components/Views/ViewList/ViewList";
import View3D from "./components/Views/View3D/View3D";
import Filtering from "./components/Filtering/Filtering";
import ViewMenu from "./components/ViewMenu/ViewMenu";

import styles from "./Work.module.css";

export default function Work() {
  const { isMobile } = useContext(GlobalStateContext);
  let [currentView, setCurrentView] = useState("3D View");

  let [filters, setFilters] = useState(["WebDesign", "Development", "InteractionDesign", "MotionDesign", "Poster", "TypeDesign"]);
  let [activeFilters, setActiveFilters] = useState(filters);

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

  const filteredProjects = projects.filter((project) => {
    // Check if any category of the project is in the activeFilters
    return project.categories?.some((category) => activeFilters.includes(category));
  });

  return (
    <section className={styles.workSection}>
      <ViewMenu currentView={currentView} setCurrentView={setCurrentView} />
      <Filtering filters={filters} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
      {currentView == "List View" && <ViewList projects={filteredProjects} />}
      {currentView == "3D View" && <View3D projects={filteredProjects} />}
    </section>
  );
}
