"use client";

import React, { useState, useEffect, useRef, useContext } from "react";

import { DataContext } from "@context/DataContext";

import styles from "./home.module.css";

import Index from "./components/Index";
import StyledLink from "../work/[slug]/components/StyledLink";

import SelectedProjects from "./components/SelectedProjects";
import Introduction from "./components/Introduction";
import Current from "./components/Current";
import ImageGallery from "./components/ImageGallery";
import ServiceNotice from "./components/ServiceNotice";

import randomColorScheme from "@utils/colorSchemes";
import MaskSplitContainer from "@animations/MaskSplitContainer";

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
      slug: item.slug,
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

      <MaskSplitContainer>
        <ImageGallery />
      </MaskSplitContainer>

      <Current ongoing={ongoing} />

      <Index mergedContent={mergedContent} />

      <ServiceNotice />

      <MaskSplitContainer>
        <StyledLink string="HutchinsonPatrick@icloud.com" link="mailto:hutchinsonpatrick@icloud.com" />
      </MaskSplitContainer>
    </div>
  );
}
