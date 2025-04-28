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
import Thumbnail from "assets/components/Animations/Thumbnail";

import FauxHeaderMobile from "./components/FauxHeader/FauxHeaderMobile";
import { GlobalStateContext } from "assets/context/GlobalStateContext";

export default function Selected() {
  const { data } = useContext(DataContext);
  const { isMobile } = useContext(GlobalStateContext);
  if (!data) return;

  return (
    <div className={styles.content}>
      <div className={styles["image-trail"]}>
        <div className={styles["splash-wrapper"]}>
          <div className="splash">
            <MaskSplitText string="Hallo!" />
          </div>
        </div>

        <ImageTrail />
      </div>

      <main>
        {isMobile ? <FauxHeaderMobile /> : <FauxHeaderDesktop />}

        <div>
          {data.map((project, index) => {
            return (
              <div key={index} className={styles.project}>
                <div className={styles["project-info"]}>
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
                </div>
                <Link to={`/work/${project.slug.current}`} key={index}>
                  <div className={styles.coverimage}>
                    {project.thumbnail && <MaskSplitImage source={getFileSrc(project.thumbnail)} />}
                  </div>
                </Link>
                {project.imagegallery?.map((image, imageindex) => {
                  return <Thumbnail source={getFileSrc(image, { width: 30 })} key={imageindex} />;
                })}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
