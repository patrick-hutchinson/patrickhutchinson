import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import styles from "./ViewList.module.css";
import { renderMedia } from "assets/utils/renderMedia";

import { creditsMapping } from "assets/context/creditsMapping";

import { formatMonth } from "assets/utils/formatMonth";
import { formatYear } from "assets/utils/formatYear";

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
    const minScale = 0.05;
    const hoverZoneHeight = 200; // Total height of the hover zone (7.5 pixels above and below)
    const hoverZoneOffset = hoverZoneHeight / 2;

    // Initialize scales for each project
    targetScales.current = projectsRef.current.map(() => ({ scale: minScale, height: 5 }));

    const animateElements = () => {
      projectsRef.current.forEach((li, liIndex) => {
        const rect = li.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;

        // Define the hover zone
        const hoverZoneTop = centerY - hoverZoneOffset;
        const hoverZoneBottom = centerY + hoverZoneOffset;

        // Calculate distance to the hover zone
        let distance = 0;
        if (mousePosition.current.y < hoverZoneTop) {
          distance = hoverZoneTop - mousePosition.current.y;
        } else if (mousePosition.current.y > hoverZoneBottom) {
          distance = mousePosition.current.y - hoverZoneBottom;
        }

        const maxDistance = 50; // Max distance for scaling effect
        const scale = Math.max(Math.exp(-distance / maxDistance), minScale);

        // Smoothly transition to target scale/height using GSAP
        gsap.to(li, {
          scale: scale,
          height: `${100 * scale}px`,
          duration: 0.3,
          ease: "power2.out",
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
      containerRef?.current?.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [projectsRef, containerRef]);

  // ListItem Component
  let ListItem = ({ project, index }) => {
    return (
      <li className={styles.projectListItem} ref={(el) => (projectsRef.current[index] = el)}>
        {renderMedia(project.thumbnail)}
        <h4>
          {formatMonth(project.month)} {formatYear(project.year)}
        </h4>
        <div className={styles.projectTitle}>{project.name}</div>
        <ul className={styles.categories}>
          {project.categories?.map((category, index) => (
            <li key={index}>{category}, </li>
          ))}
        </ul>
        {/* <ul className={styles.credits}>
          {project.credits &&
            creditsMapping.map(
              ({ key, title }) =>
                project.credits[key] && (
                  <li className={`${styles.credit}`} key={key}>
                    {title}: {project.credits[key].join(", ")}
                  </li>
                )
            )}
        </ul> */}
      </li>
    );
  };

  // Memoize repeated projects to avoid recalculation on each render
  const repeatedProjects = useMemo(
    () => Array.from({ length: maxProjects }, (_, index) => projects[index % projects.length]),
    [projects, maxProjects]
  );

  if (!projects || projects.length === 0) {
    return <p>Error Loading Component</p>; // Or some other loading state or message
  }

  return (
    <ul className={styles.projectList} ref={containerRef}>
      {repeatedProjects.map((project, index) => (
        <Link to={`/work/${project?.slug?.current}`} key={index}>
          <ListItem project={project} index={index} />
        </Link>
      ))}
    </ul>
  );
}

export default React.memo(ListView);
