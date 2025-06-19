"use client";

import { useEffect, useState, useRef, useContext } from "react";

import { DataContext } from "@context/DataContext";

import styles from "./project.module.css";

import ProjectInfo from "./components/ProjectInfo";
import Gallery from "./components/Gallery";
import StyledLink from "./components/StyledLink";
import MoreProjects from "./components/MoreProjects";
import MaskSplitContainer from "@animations/MaskSplitContainer";
import ProjectHeader from "./components/ProjectHeader";

import RenderMedia from "@components/RenderMedia";
import { motion } from "framer-motion";

import randomColorScheme from "@utils/colorSchemes";

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
    <div className={styles.projectContainer} ref={containerRef}>
      <MaskSplitContainer>
        <ProjectHeader project={project} />
      </MaskSplitContainer>

      <MaskSplitContainer>
        <RenderMedia medium={project.coverimage} />
      </MaskSplitContainer>

      <MaskSplitContainer>
        <ProjectInfo project={project} />
      </MaskSplitContainer>

      {project.gridStructure && <Gallery project={project} />}

      <MaskSplitContainer>{project.url && <StyledLink string={project.url} link={project.url} />}</MaskSplitContainer>

      <MoreProjects projects={data} />
    </div>
  );
}
