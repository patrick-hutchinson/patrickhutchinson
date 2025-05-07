import React, { useState, useEffect, useRef, useContext } from "react";

import FlipText from "assets/components/Animations/FlipText";

import styles from "./Services.module.css";
import { GlobalStateContext } from "assets/context/GlobalStateContext";

export default function Services() {
  let designCompetencies = [
    "FIGMA",
    "XD",
    "FRAMER",
    "ADOBE INDESIGN",
    "ADOBE PHOTOSHOP",
    "ADOBE AFTER EFFECTS",
    "TOUCHDESIGNER",
    "BLENDER",
  ];

  let developmentCompetencies = [
    { title: "Frameworks", competencies: ["NEXT.JS & REACT", "PHP"] },
    { title: "CMS", competencies: ["SANITY", "KIRBY", "SHOPIFY"] },
    { title: "MOTION & INTERACTION", competencies: ["FRAMER MOTION", "GSAP"] },
    { title: "LIBRARIES", competencies: ["THREE.JS", "P5.JS / PROCESSING", "WEBGL"] },
  ];

  let hostingCompetencies = ["VERCEL", "DIGITALOCEAN / CLOUDWAYS"];

  let { isMobile } = useContext(GlobalStateContext);

  return (
    <section className={styles.content}>
      <div className={styles["service-section"]}>
        {isMobile ? (
          <h1 className={styles.title}>
            <span className={styles.count}>
              <FlipText string="01" />
            </span>
            <FlipText string="Design" />
          </h1>
        ) : (
          <h2 className={styles.title}>
            <span className={styles.count}>
              <FlipText string="01" />
            </span>
            <FlipText string="Design" />
          </h2>
        )}
        <ul className={styles.competencies}>
          {designCompetencies.map((competency, index) => {
            return (
              <li key={index}>
                <span className={styles.count}>
                  <FlipText string={`0${index + 1}`} />
                </span>

                <span>
                  <FlipText string={competency} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles["service-section"]}>
        {isMobile ? (
          <h1 className={styles.title}>
            <span className={styles.count}>
              <FlipText string="02" />
            </span>
            <FlipText string="Build" />
          </h1>
        ) : (
          <h2 className={styles.title}>
            <span className={styles.count}>
              <FlipText string="03" />
            </span>
            <FlipText string="Developing" />
          </h2>
        )}

        <div className={styles["competencies-container"]}>
          {developmentCompetencies.map((competencies, index) => {
            return (
              <ul className={styles.competencies} key={index}>
                <FlipText string={competencies.title} />
                {competencies.competencies.map((competency, competencyindex) => (
                  <li key={competencyindex}>
                    <span className={styles.count}>
                      <FlipText string={`0${competencyindex + 1}`} />
                    </span>
                    <span>
                      <FlipText string={competency} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </div>

      <div className={styles["service-section"]}>
        {isMobile ? (
          <h1 className={styles.title}>
            <span className={styles.count}>
              <FlipText string="03" />
            </span>
            <FlipText string="Hosting" />
          </h1>
        ) : (
          <h2 className={styles.title}>
            <span className={styles.count}>
              <FlipText string="03" />
            </span>
            <FlipText string="Hosting and Publishing" />
          </h2>
        )}

        <ul className={styles.competencies}>
          {hostingCompetencies.map((competency, index) => {
            return (
              <li key={index}>
                <span className={styles.count}>
                  <FlipText string={`0${index + 1}`} />
                </span>
                <span>
                  <FlipText string={competency} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
