import React, { useState, useEffect, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";
import { getFileSrc } from "assets/utils/getFileSrc";

import MaskSplitImage from "assets/components/Animations/MaskSplitImage";

import styles from "./Selected.module.css";
import FlipText from "assets/components/Animations/FlipText";

import { Link } from "react-router-dom";
import Categories from "assets/components/Categories/Categories";
import ImageTrail from "assets/components/ImageTrail/ImageTrail";
import FauxHeaderDesktop from "./components/FauxHeader/FauxHeaderDesktop";
import MaskSplitText from "assets/components/Animations/MaskSplitText";
import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";

import SplashSplitText from "./components/SplashSplitText";

import FauxHeaderMobile from "./components/FauxHeader/FauxHeaderMobile";
import { GlobalStateContext } from "assets/context/GlobalStateContext";

export default function Selected() {
  const { data } = useContext(DataContext);
  const { isMobile } = useContext(GlobalStateContext);
  const { home } = useContext(DataContext);
  if (!data || !home) return;

  let thumbnails = data.map((project) => project.thumbnail);

  let colorSchemes = [
    { background: "#bfff31", font: "1c1e69" }, // vetted
    { background: "#eeff5a", font: "#121111" }, // vetted
    { background: "#BBBDD3", font: "#6EFF5E" }, // vetted
    { background: "#5B7D36", font: "#4EF1EA" }, // vetted
    { background: "#CBC5FF", font: "#BF770E" }, // vetted
    { background: "#100F0F", font: "#FD3863" }, // vetted
    { background: "#515054", font: "#BFBFBF" }, // vetted
    { background: "#C0C4C1", font: "#D8F74D" }, // vetted
    { background: "#DC3A2D", font: "#0C1F7E" }, // vetted
  ];

  return (
    <div className={styles.content}>
      <div className={styles["splash-wrapper"]}>
        <div className="splash">
          <SplashSplitText string="Hallo!" thumbnails={thumbnails} />
        </div>
      </div>

      <main>
        {isMobile ? <FauxHeaderMobile /> : <FauxHeaderDesktop />}

        {/* <h1 className={styles["container-title"]}>
          <FlipText string="Work" />
        </h1> */}

        <div>
          {home[0].featuredProjects.map((project, index) => {
            const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
            return (
              <div key={index} className={styles.project}>
                {/* <div
                  className={styles["project-info"]}
                  style={{ background: randomScheme.background, color: randomScheme.font }}
                >
                  <h2 className={styles.index}>
                    <FlipText string={`0${index + 1}`} />
                  </h2>

                  <span className={styles.name}>
                    <FlipText string={project.name} />
                    <br />
                    <span>
                      <FlipText string={`${formatMonth(project.month)}`} />
                      <FlipText string={`${formatYear(project.year)}`} />
                    </span>
                  </span>
                  <span className={styles.year}>
                    <FlipText string={`${project.year}`} />
                  </span>

                  <ul className={styles.categories}>
                    <Categories project={project} />
                  </ul>
                </div> */}
                <Link to={`/work/${project.slug.current}`} key={index}>
                  <div className={styles.coverimage}>
                    {project.coverimage && <MaskSplitImage source={getFileSrc(project.coverimage)} />}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
