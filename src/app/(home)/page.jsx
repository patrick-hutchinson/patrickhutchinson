"use client";

import React, { useState, useEffect, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";
import { StateContext } from "assets/context/StateContext";

import styles from "./home.module.css";

import Index from "./components/Index";
import StyledLink from "../work/[slug]/components/StyledLink";

import ImageTrail from "../../assets/components/ImageTrail/ImageTrail";

import SelectedProjects from "./components/SelectedProjects";

export default function Home() {
  const { isMobile } = useContext(StateContext);

  const { data } = useContext(DataContext);
  const { home } = useContext(DataContext);
  const { news } = useContext(DataContext);
  const { experience } = useContext(DataContext);
  const { ongoing } = useContext(DataContext);

  let currentYear = new Date().getFullYear();

  if (!data || !home || !news || !experience || !ongoing) return <div>Loading...</div>;

  useEffect(() => {
    console.log(data.length, "data:");
  }, [data]);

  const normalize = (items, type, image) =>
    items.map((item) => ({
      type,
      name: item.name,
      year: item.year,
      month: item.month,
      categories: item.categories,
      thumbnail: item[image],
      original: item,
    }));

  const mergedContent = [
    ...normalize(data, "project", "coverimage"),
    ...normalize(news, "announcement", "thumbnail"),
    ...normalize(experience, "experience", "thumbnail"),
  ];

  let Current = () => (
    <div className={styles["section-container"]}>
      <div className={styles["section"]}>
        <div className={styles["running-notice"]}>
          <div className="col-span-6 grid-6" style={{ background: "#000", color: "#fff", padding: "5px" }}>
            <div className="col-span-2">Selected Projects</div>
            <div className="col-span-4" style={{ opacity: 0.8 }}>
              {`(${home[0].featuredProjects.length} Projects)`}
            </div>
          </div>
          <p>
            Current collaborations and clients include small to medium-scale artists and studios, local production, and
            cultural institutions. <br />
            Here’s what’s on the agenda.
          </p>

          <div className={styles["upcoming-container"]}>
            <div className={styles["availability--container"]}>
              <span>Currently open for commissions!</span>
            </div>
            <ul className={styles["upcoming"]}>
              {ongoing.map((ongoingProject) => (
                <li>
                  <span>{ongoingProject.projectType}</span>
                  <span>{ongoingProject.name}</span>
                  <span>{ongoingProject.location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.content}>
      <div>
        <div style={{ background: "#000", width: "50%", padding: "5px", color: "#fff" }}>Introduction:</div>
        <div className="grid-12">
          <p className={`${styles["running-notice"]} col-span-10`}>
            Patrick Hutchinson (GER) is a graphic designer and front-end developer based in Amsterdam (NED). He
            specializes in web-, interaction- and type design and mostly uses code, visual programming, and
            animation-based tools to build his work.
          </p>
          <div className="col-span-2" style={{ marginTop: "25px" }}>
            <ul>
              <li>
                <a href="">Instagram</a>
              </li>
              <li>
                <a href="">LinkedIn</a>
              </li>
              <li>
                <a href="">Email</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <SelectedProjects home={home} data={data} />

      <Current />

      <div className={styles["imagetrail-section-container"]}>
        <span className={styles["section-header"]}>
          <span>Image Gallery</span>
        </span>
        <div className={styles["imagetrail-container"]}>
          <div className={styles["running-notice"]}>Swipe the Container!</div>
          <ImageTrail />
        </div>
      </div>

      <Index mergedContent={mergedContent} />

      <div className={styles["running-notice"]}>
        <p>
          Looking for details about tools, workflow, or included services? This roadmap outlines each step, including
          relevant competencies and software used. For any further inquiries, feel free to reach out via email.
        </p>
      </div>

      <div className={styles["email-slider"]}>
        <StyledLink string="HutchinsonPatrick@icloud.com" link="mailto:hutchinsonpatrick@icloud.com" />
      </div>
    </div>
  );
}
