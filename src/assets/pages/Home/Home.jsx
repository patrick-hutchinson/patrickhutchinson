import React from "react";
import { useEffect, useState, useRef } from "react";

import sanityClient from "/src/client.js";
import { useNavigate } from "react-router-dom";

import styles from "./Home.module.css";

import { Link } from "react-router-dom";

import About from "./components/About/About";
import Type from "./components/Type/Type";
import Contact from "../Contact/Contact";
import Public from "./components/Public/Public";
import WorkPreview from "./components/WorkPreview/WorkPreview";
import Loading from "assets/components/Loading/Loading";

export default function Home() {
  let parentRef = useRef();
  const navigate = useNavigate();
  const [work, setWork] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "home"]{
          public[]->{_id, name, year, thumbnail, month, url, imagegallery}
        }`
      )
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{
          coverimage,
          thumbnail,
          url
        }`
      )
      .then((fetchedData) => {
        setWork(fetchedData);
      })
      .catch(console.error);
  }, []);

  // Early return if Projects is undefined
  if (!data) return <Loading />;

  return (
    <main>
      <div className={styles.wrapper}>
        <section className={styles.about}>
          <About />
        </section>

        <section className={styles.work} ref={parentRef}>
          <Link to="/work">
            <h5>Work</h5> <br />
            <WorkPreview parentRef={parentRef} data={work} />
            {/* <ImageTrail parentRef={parentRef} data={work} /> */}
          </Link>
        </section>

        <section className={styles.type}>
          <h5>Type Design</h5> <br />
          <Type />
        </section>

        <section className={styles.public}>
          <Link to="/public">
            <h5>Public</h5> <br />
            <Public data={data[0].public} />
          </Link>
        </section>

        <section></section>
        <section></section>
        <section></section>
        <section></section>

        <section className={styles.contact}>
          {/* <h5>Contact</h5> <br /> */}
          <Contact />
        </section>
      </div>
    </main>
  );
}
