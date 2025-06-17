"use client";

import React, { useState, useEffect, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";
import { StateContext } from "assets/context/StateContext";

import styles from "./home.module.css";

import Index from "./components/Index";
import StyledLink from "../work/[slug]/components/StyledLink";

import SelectedProjects from "./components/SelectedProjects";
import Introduction from "./components/Introduction";
import Current from "./components/Current";
import randomColorScheme from "../../assets/utils/colorSchemes";

export default function Home() {
  const { data } = useContext(DataContext);
  const { home } = useContext(DataContext);
  const { news } = useContext(DataContext);
  const { experience } = useContext(DataContext);
  const { ongoing } = useContext(DataContext);

  const [colorScheme, setColorScheme] = useState({ background: "#000", font: "#fff" });

  useEffect(() => {
    setColorScheme(randomColorScheme());
  }, []);

  if (!data || !home || !news || !experience || !ongoing) return <div>Loading...</div>;

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

  return (
    <div className={styles.content}>
      <Introduction />

      <SelectedProjects home={home} data={data} />

      {/* <ImageGallery /> */}

      <Current ongoing={ongoing} />

      <Index mergedContent={mergedContent} />

      <div>
        <div className="col-span-6 grid-6" style={{ background: "#000", color: "#fff", padding: "5px", width: "50%" }}>
          <div className="col-span-2">Approach and Services</div>
          {/* <div className="col-span-4" style={{ opacity: 0.8 }}>
            {`(${ongoing.length} Projects)`}
          </div> */}
        </div>
        <div className={styles["running-notice"]}>
          <p>
            Looking for details about tools, workflow, or included services? <br />
            This <a href="#">roadmap</a> outlines each step, including relevant competencies and software used. For any
            further inquiries, feel free to reach out via email.
          </p>
        </div>
      </div>

      <div
        className={styles["email-slider"]}
        style={{
          background: colorScheme.background,
          color: colorScheme.font,
        }}
      >
        <StyledLink string="HutchinsonPatrick@icloud.com" link="mailto:hutchinsonpatrick@icloud.com" />
      </div>
    </div>
  );
}
