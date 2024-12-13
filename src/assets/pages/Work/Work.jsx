import React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import sanityClient from "/src/client.js";

import { GlobalStateContext } from "../../context/GlobalStateContext";

import ViewList from "./components/Views/ViewList/ViewList";
import ViewGrid from "./components/Views/ViewGrid/ViewGrid";
import Filtering from "./components/Filtering/Filtering";
import ViewMenu from "./components/ViewMenu/ViewMenu";

import styles from "./Work.module.css";

import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";
import { creditsMapping } from "assets/context/creditsMapping";
import { renderMedia } from "assets/utils/renderMedia";

export default function Work() {
  const { isMobile } = useContext(GlobalStateContext);
  let [currentView, setCurrentView] = useState("Grid View");

  let [filters, setFilters] = useState(["WebDesign", "Development", "InteractionDesign", "MotionDesign", "Poster", "TypeDesign"]);
  let [activeFilters, setActiveFilters] = useState(filters);

  let [showFiltering, setShowFiltering] = useState(false);

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
      showOnHomepage,
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

  let ProjectPreview = ({ project }) => {
    return (
      <div className={styles.projectContainer} key={project._id}>
        <div className={styles.projectText}>
          <div className={styles.projectHeader}>
            <div>{project.url}</div>
            <div>
              {formatMonth(project.formatMonth)} {formatYear(project.year)}
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
        {renderMedia(project.thumbnail)}
      </div>
    );
  };

  return (
    <section className={styles.workSection}>
      <div className={styles.headerContainer}>
        <h1>WORK</h1>
        <ViewMenu currentView={currentView} setCurrentView={setCurrentView} setShowFiltering={setShowFiltering} />
      </div>
      <Filtering
        filters={filters}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        showFiltering={showFiltering}
      />

      {/* <div className={styles.workDisplay}>
        {projects.map((project, index) => (project.showOnHomepage ? <ProjectPreview project={project} key={index} /> : null))}
      </div> */}

      {currentView === "List View" && <ViewList projects={filteredProjects} />}
      {currentView === "Grid View" && <ViewGrid projects={filteredProjects} />}
    </section>
  );
}
