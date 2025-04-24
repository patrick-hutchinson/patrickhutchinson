import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";

import { DataContext } from "assets/context/DataContext";

import styles from "./Project.module.css";

import ProjectInfo from "./components/ProjectInfo";
import Gallery from "./components/Gallery";
import StyledLink from "./components/StyledLink";
import MoreProjects from "./components/MoreProjects";
import MaskSplitImage from "assets/components/Animations/MaskSplitImage";
import ProjectHeader from "./components/ProjectHeader";

import { getFileSrc } from "assets/utils/getFileSrc";
import randomColorScheme from "assets/utils/colorSchemes";

import { motion } from "framer-motion";

export default function Project() {
  const { slug } = useParams();
  const { data } = useContext(DataContext);

  if (!data) return;

  const project = data.find((projectfound) => projectfound.slug?.current === slug);

  document.querySelector(":root").style.setProperty("--randomBackgroundColor", randomColorScheme().background);
  document.querySelector(":root").style.setProperty("--randomFontColor", randomColorScheme().font);

  return (
    <main>
      <motion.div className={styles.projectContainer}>
        <ProjectHeader project={project} />

        <MaskSplitImage source={getFileSrc(project.thumbnail)} />

        <ProjectInfo project={project} />

        {project.gridStructure && <Gallery project={project} />}

        <StyledLink project={project} data={data} />

        <MoreProjects projects={data} />
      </motion.div>
    </main>
  );
}
