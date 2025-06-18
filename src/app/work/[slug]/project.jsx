"use client";

import { useEffect, useState, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";

import styles from "./project.module.css";

import ProjectInfo from "./components/ProjectInfo";
import Gallery from "./components/Gallery";
import StyledLink from "./components/StyledLink";
import MoreProjects from "./components/MoreProjects";
import MaskSplitImage from "assets/components/Animations/MaskSplitImage";
import ProjectHeader from "./components/ProjectHeader";

import RenderMedia from "@utils/renderMedia";
import { motion } from "framer-motion";

import randomColorScheme from "assets/utils/colorSchemes";

export default function Project({ slug }) {
  const containerRef = useRef(null);
  const { data } = useContext(DataContext);

  useEffect(() => {
    if (!containerRef.current) return;

    const scheme = randomColorScheme();
    containerRef.current.style.setProperty("--randomBackgroundColor", scheme.background);
    containerRef.current.style.setProperty("--randomFontColor", scheme.font);
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data || !slug) return;
  const project = data.find((projectfound) => projectfound.slug?.current === slug);

  console.log("project:", project);

  return (
    <main>
      <div className={styles.projectContainer} ref={containerRef}>
        <ProjectHeader project={project} />

        {/* <MaskSplitImage source={getFileSrc(project.thumbnail)} /> */}

        <RenderMedia medium={project.coverimage} />

        <ProjectInfo project={project} />

        {project.gridStructure && <Gallery project={project} />}

        {project.url && <StyledLink project={project} data={data} />}

        <MoreProjects projects={data} />
      </div>
    </main>
  );
}
