import React, { useState, useEffect, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";
import { getFileSrc } from "assets/utils/getFileSrc";

import MaskSplitImage from "assets/components/Animations/MaskSplitImage";

import styles from "./Selected.module.css";
import FlipText from "assets/components/Animations/FlipText";

import { Link } from "react-router-dom";
import Categories from "assets/components/Categories/Categories";

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

      {isMobile ? <FauxHeaderMobile /> : <FauxHeaderDesktop />}

      {/* <h1 className={styles["container-title"]}>
          <FlipText string="Work" />
        </h1> */}

      <div>
        {home[0].featuredProjects.map((project, index) => {
          const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
          return (
            <div key={index} className={styles.project}>
              <Link to={`/${project.slug.current}`} key={index}>
                <div className={styles.coverimage}>
                  {!isMobile && project.coverimage && <MaskSplitImage source={getFileSrc(project.coverimage)} />}
                  {isMobile && project.coverimage_mobile && (
                    <MaskSplitImage source={getFileSrc(project.coverimage_mobile)} />
                  )}
                </div>
              </Link>
              <div className={styles["project-info"]} style={{ color: project.textcolor?.value }}>
                <span className={styles.name}>
                  <FlipText string={project.name} />
                </span>

                <span>
                  <FlipText string={`${formatMonth(project.month)}`} />
                  <FlipText string={`${formatYear(project.year)}`} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles["page-footer"]}>
        <div className={styles.title}>Reach Out!</div>

        <div className={styles["footer-wrapper"]}>
          <ul className={styles["footer-menu"]}>
            <Link to="selected">SELECTED</Link>
            <Link to="index">INDEX</Link>
            <Link to="services">SERVICES</Link>
            <Link to="public">PUBLIC</Link>
          </ul>

          <p>For typeface inquiries, please contact me via email!</p>

          <div>
            Shout out:
            <ul>
              <li>samuelsalminen.com</li>
              <li>laradautun.xyz</li>
              <li>mariarivgonzalez.framer.website</li>
              <li>ambermeekel.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
