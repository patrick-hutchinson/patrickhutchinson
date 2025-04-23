import React, { useState, useEffect, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";
import { getFileSrc } from "assets/utils/getFileSrc";

import MaskSplitImage from "assets/components/Animations/MaskSplitImage";

import styles from "./Selected.module.css";
import FlipText from "assets/components/Animations/FlipText";

import { Link } from "react-router-dom";
import Categories from "assets/components/Categories/Categories";
import ImageTrail from "assets/components/ImageTrail/ImageTrail";
import FauxHeader from "./components/FauxHeader";
import MaskSplitText from "assets/components/Animations/MaskSplitText";

export default function Selected() {
  const { data } = useContext(DataContext);
  if (!data) return;

  return (
    <div className={styles.content}>
      <div className={styles["image-trail"]}>
        <div className={styles["splash-wrapper"]}>
          {/* <img src="/assets/media/Hallo.svg" alt="Hallo!" /> */}
          <div className="splash">
            <MaskSplitText string="Hallo!" />
          </div>
        </div>

        <ImageTrail />
      </div>

      <main>
        <FauxHeader />

        {data.map((project, index) => {
          return (
            <Link to={`/work/${project.slug.current}`} key={index}>
              <div key={index} className={styles.project}>
                <div className={styles["project-info"]}>
                  <FlipText string={`0${index + 1}`} />
                  <FlipText string={project.name} />
                  <FlipText string={`${project.year}`} />

                  <ul className={styles.categories}>
                    <Categories project={project} />
                  </ul>
                </div>

                <div className={styles.coverimage}>
                  {project.thumbnail && <MaskSplitImage source={getFileSrc(project.thumbnail)} />}
                </div>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
}
