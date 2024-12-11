import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import sanityClient from "/src/client.js";
import { PortableText } from "@portabletext/react";

import ImageTrail from "./components/ImageTrail/ImageTrail";

import styles from "./About.module.css";

export default function About() {
  let aboutRef = useRef(null);
  const [aboutData, setAboutData] = useState();
  const ref = useRef(null); // Reference for the element to observe

  // Directly use the useInView hook here
  const isInView = useInView(ref); // Use useInView directly

  // Fetch data from Sanity
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="about"]{
        biography,
      }`
      )
      .then((data) => setAboutData(data))
      .catch(console.error);
  }, []);

  let [projects, setProjects] = useState();
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="project"]{
      coverimage,
      thumbnail
  }`
      )
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  // Handle loading or error state
  if (!aboutData || aboutData.length === 0) {
    return <p>Error Loading Component</p>;
  }

  if (!projects || projects.length === 0) {
    return <p>Error Loading Component</p>; // Or some other loading state or message
  }

  // Animation variants
  const wordAnimation = {
    hidden: { opacity: 0.2, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Stagger animation for each word
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // Split text into words for individual animation
  const text = aboutData[0]?.biography[0]?.children[0]?.text || ""; // Example: Accessing the first block
  const words = text.split(" ");

  return (
    <section className={styles.aboutSection} ref={aboutRef}>
      <ImageTrail projects={projects} aboutRef={aboutRef} />
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"} // Animate based on viewport visibility
        className={styles.biographyText}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={wordAnimation}
            style={{ display: "inline-block", marginRight: "5px" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
