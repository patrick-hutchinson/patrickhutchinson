import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import styles from "../home.module.css";

import RenderMedia from "../../../assets/utils/renderMedia";

import { formatMonth } from "../../../assets/utils/formatMonth";
import { formatYear } from "../../../assets/utils/formatYear";

import Image from "next/image";

import randomColorScheme from "../../../assets/utils/colorSchemes";

const projectTimer = 4000;
const selectedProjectsCount = 2;

function getRandomProjects(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const scheme = randomColorScheme();

const SelectedProjects = ({ home, data }) => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [pausedSlots, setPausedSlots] = useState([false, false]);
  const timeoutsRef = useRef([]);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!home?.[0]?.featuredProjects?.length) return;

    const initialize = () => {
      const initial = getRandomProjects(home[0].featuredProjects, selectedProjectsCount);
      setSelectedProjects(initial);

      initial.forEach((_, index) => {
        timeoutsRef.current[index] = setTimeout(function tick() {
          if (!pausedSlots[index]) updateProjectAtIndex(index);
          timeoutsRef.current[index] = setTimeout(tick, projectTimer);
        }, projectTimer);
      });
    };

    const updateProjectAtIndex = (index) => {
      setSelectedProjects((prev) => {
        const available = home[0].featuredProjects.filter(
          (p) => !prev.some((proj) => proj.slug.current === p.slug.current)
        );
        const newProject =
          available[Math.floor(Math.random() * available.length)] ||
          home[0].featuredProjects[Math.floor(Math.random() * home[0].featuredProjects.length)];

        const updated = [...prev];
        updated[index] = newProject;
        return updated;
      });
    };

    initialize();

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [home]);

  const selectedIndexes = selectedProjects.map((project) =>
    home[0].featuredProjects.findIndex((p) => p.slug.current === project.slug?.current)
  );

  const handleMouseEnter = (index) => {
    setPausedSlots((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  const handleMouseLeave = (index) => {
    setPausedSlots((prev) => {
      const copy = [...prev];
      copy[index] = false;
      return copy;
    });
  };

  //   containerRef.current.style.setProperty("--randomBackgroundColor", scheme.background);
  //   containerRef.current.style.setProperty("--randomFontColor", scheme.font);

  return (
    <div className={`${styles["section"]} ${styles["selected-projects-container"]}`} ref={containerRef}>
      <div className={`grid-12`}>
        <div className="col-span-6 grid-6" style={{ background: "#000", color: "#fff", padding: "5px" }}>
          <div className="col-span-2">Selected Projects</div>
          <div className="col-span-4" style={{ opacity: 0.8 }}>
            {`(${home[0].featuredProjects.length} Projects)`}
          </div>
        </div>
      </div>

      <div className="grid-12">
        <div className={`${styles["selected-projects-indextracker"]} col-span-12`}>
          {home[0].featuredProjects?.map((_, index) => (
            <span
              key={index}
              style={{
                background: selectedIndexes.includes(index) ? scheme.background : "#fff",
                color: selectedIndexes.includes(index) ? scheme.font : "#000",
              }}
              // className={`col-span-${12 / home[0].featuredProjects?.length}`}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
      <ul className={styles["selected-projects"]}>
        {selectedProjects.map((project, index) => (
          <li
            key={index}
            className={styles["selected-project"]}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className={styles["selected-project-header"]}>
              <div>{project.name}</div>
              <div>
                <span>{formatMonth(project.month)}</span>
                <span>{formatYear(project.year)}</span>
              </div>
            </div>
            <Link href={`/work/${project.slug.current}`}>
              <div
                className={styles["blur-container"]}
                style={{ height: "680px", position: "relative", overflow: "hidden" }}
              >
                <Image
                  src={`https://image.mux.com/${project.coverimage.playbackId}/thumbnail.jpg?width=500`}
                  fill
                  alt="placeholder image"
                  unoptimized
                  style={{
                    objectFit: "cover",
                    filter: "blur(13px)",
                    zIndex: 0,
                    position: "absolute",
                    transform: "scale(1.5)",
                  }}
                />
                <div
                  style={{
                    height: (window.innerWidth / 2) * 0.56 + "px",
                    position: "relative",
                    top: "50%",
                    transform: "translateY(-50%) ",
                  }}
                >
                  <RenderMedia medium={project.coverimage} />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles["selected-projects-footer"]} style={{ background: "#ccc" }}>
        {home[0].featuredProjects.length} of {data.length} projects shown. View all Projects in the <a href="">Index</a>
      </div>
    </div>
  );
};

export default SelectedProjects;
