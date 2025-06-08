import React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";

import styles from "./Project.module.css";

import ProjectInfo from "./components/ProjectInfo";
import Gallery from "./components/Gallery";
import StyledLink from "./components/StyledLink";
import MoreProjects from "./components/MoreProjects";
import MaskSplitImage from "assets/components/Animations/MaskSplitImage";
import ProjectHeader from "./components/ProjectHeader";

import { motion } from "framer-motion";

import { getFileSrc } from "assets/utils/getFileSrc";
import randomColorScheme from "assets/utils/colorSchemes";

export default function Project() {
  const { slug } = useParams();
  const { data } = useContext(DataContext);

  if (!data || !slug) return;

  const project = data.find((projectfound) => projectfound.slug?.current === slug);

  useEffect(() => {
    const container = document.querySelector(".projectContainer");
    if (!container) return;

    const scheme = randomColorScheme();
    container.style.setProperty("--randomBackgroundColor", scheme.background);
    container.style.setProperty("--randomFontColor", scheme.font);
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <div className={styles.projectContainer}>
        <ProjectHeader project={project} />

        <MaskSplitImage source={getFileSrc(project.thumbnail)} />

        <ProjectInfo project={project} />

        {project.gridStructure && <Gallery project={project} />}

        {project.url && <StyledLink project={project} data={data} />}

        <MoreProjects projects={data} />
      </div>
    </main>
  );
}
