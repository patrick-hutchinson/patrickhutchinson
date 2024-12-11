import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import styles from "./ViewList.module.css";
import { renderMedia } from "assets/utils/renderMedia";

import { creditsMapping } from "assets/context/creditsMapping";

import { gsap } from "gsap";

function ListView({ projects }) {
  const containerRef = useRef();
  const projectsRef = useRef([]);
  const [maxProjects, setMaxProjects] = useState(70); // Max number of projects to display

  const targetScales = useRef([]);

  const mousePosition = useRef({ x: 0, y: 0 }); // Track mouse position
  const handleMouseMove = (e) => {
    mousePosition.current = { x: e.clientX, y: e.clientY }; // Update mouse position
  };

  // Scaling Effect
  useEffect(() => {
    // Initialize scales for each project
    targetScales.current = projectsRef.current.map(() => ({ scale: 0.05, height: 5 }));

    const animateElements = () => {
      projectsRef.current.forEach((li, liIndex) => {
        const rect = li.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const distance = Math.abs(mousePosition.current.y - centerY);

        const maxDistance = 100; // Max distance for scaling effect
        const scale = Math.max(Math.exp(-distance / maxDistance), 0.05);

        // Smoothly transition to target scale/height using GSAP
        gsap.to(li, {
          scale,
          height: `${100 * scale}px`,
          duration: 0.3, // Adjust duration for smoothness
          ease: "power2.out", // Smooth easing
        });
      });

      // Request the next frame
      requestAnimationFrame(animateElements);
    };

    // Add mousemove event listener to track mouse position
    containerRef.current.addEventListener("mousemove", handleMouseMove);

    // Start the animation loop
    const animationId = requestAnimationFrame(animateElements);

    // Cleanup on unmount
    return () => {
      containerRef.current.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [projectsRef, containerRef]);

  // ListItem Component
  let ListItem = ({ project, index }) => {
    return (
      <li className={styles.projectListItem} key={index} index={index} ref={(el) => (projectsRef.current[index] = el)}>
        {renderMedia(project.thumbnail)}
        <h4>{project.year}</h4>
        <div className={styles.projectTitle}>{project.name}</div>
        <ul>
          {project.categories?.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
        <ul className={styles["credits-inhouse"]}>
          {project.credits &&
            creditsMapping.map(
              ({ key, title }) =>
                project.credits[key] && (
                  <li className={`${styles.credit}`} key={key}>
                    {title}: <br />
                    {project.credits[key].join(", ")}
                    <br />
                    <br />
                  </li>
                )
            )}
        </ul>
      </li>
    );
  };

  // Memoize repeated projects to avoid recalculation on each render
  const repeatedProjects = useMemo(
    () => Array.from({ length: maxProjects }, (_, index) => projects[index % projects.length]),
    [projects, maxProjects]
  );

  return (
    <ul className={styles.projectList} ref={containerRef}>
      {repeatedProjects.map((project, index) => (
        <Link to={project?.slug?.current} key={index}>
          <ListItem project={project} index={index} />
        </Link>
      ))}
    </ul>
  );
}

export default React.memo(ListView);
