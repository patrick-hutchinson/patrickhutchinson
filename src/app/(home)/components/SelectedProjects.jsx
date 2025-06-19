import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import styles from "../home.module.css";

import RenderMedia from "@components/RenderMedia";

import { formatMonth } from "@utils/formatMonth";
import { formatYear } from "@utils/formatYear";

import Image from "next/image";

import randomColorScheme from "@utils/colorSchemes";

import MaskSplitContainer from "@animations/MaskSplitContainer";
import HoverLink from "./HoverLink";

const projectTimer = 4000;
const selectedProjectsCount = 2;

function getRandomProjects(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const SelectedProjects = ({ home, data }) => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [pausedSlots, setPausedSlots] = useState([false, false]);
  const timeoutsRef = useRef([]);

  const [colorScheme, setColorScheme] = useState({ background: "#000", font: "#fff" });

  useEffect(() => {
    setColorScheme(randomColorScheme());
  }, []);

  const [videoHeight, setVideoHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setVideoHeight((window.innerWidth / 2) * 0.56);
    };

    updateHeight(); // set initial value
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

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

  const BlurVideo = ({ medium }) => {
    return (
      <Image
        src={`https://image.mux.com/${medium.playbackId}/thumbnail.jpg?width=500`}
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
    );
  };

  const BlurImage = ({ medium }) => {
    return (
      <Image
        unoptimized
        src={medium.url}
        alt="image"
        // width={medium.width ? medium.width : 800}
        // height={medium.height ? medium.height : 800}
        fill
        // fill
        placeholder="blur"
        blurDataURL={medium.lqip}
        style={{
          objectFit: "cover",
          filter: "blur(13px)",
          zIndex: 0,
          position: "absolute",
          transform: "scale(1.5)",
        }}
      />
    );
  };

  return (
    <div className={`${styles["section"]} ${styles["selected-projects-container"]}`} ref={containerRef}>
      <MaskSplitContainer>
        <div className="col-span-6 grid-6" style={{ background: "#000", color: "#fff", padding: "5px", width: "50%" }}>
          <div className="col-span-2">Selected Projects</div>
          <div className="col-span-4" style={{ opacity: 0.8 }}>
            {`(${home[0].featuredProjects.length} Projects)`}
          </div>
        </div>
      </MaskSplitContainer>

      <div className="grid-12">
        <div className={`${styles["selected-projects-indextracker"]} col-span-12`}>
          {home[0].featuredProjects?.map((_, index) => (
            <MaskSplitContainer key={index}>
              <span
                key={index}
                style={{
                  background: selectedIndexes.includes(index) ? "#eee" : "#fff",
                  color: selectedIndexes.includes(index) ? "#000" : "#000",
                }}
              >
                {index + 1}
              </span>
            </MaskSplitContainer>
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
            <HoverLink>
              <div className={styles["selected-project-header"]}>
                <MaskSplitContainer>
                  <div className={`${styles["selected-project-header-inner"]} hoverlink`}>{project.name}</div>
                </MaskSplitContainer>
                <MaskSplitContainer>
                  <div className={styles["selected-project-header-inner"]}>
                    <span>{formatMonth(project.month)}</span>
                    <span>{formatYear(project.year)}</span>
                  </div>
                </MaskSplitContainer>
              </div>
              <Link href={`/work/${project.slug.current}`}>
                <MaskSplitContainer>
                  <div style={{ height: "680px", position: "relative", overflow: "hidden" }}>
                    {project.coverimage.type === "video" ? (
                      <BlurVideo medium={project.coverimage} />
                    ) : (
                      <BlurImage medium={project.coverimage} />
                    )}
                    <div
                      style={{
                        height: videoHeight + "px",
                        position: "relative",
                        top: "50%",
                        transform: "translateY(-50%) ",
                      }}
                    >
                      <RenderMedia medium={project.coverimage} />
                    </div>
                  </div>
                </MaskSplitContainer>
              </Link>
            </HoverLink>
          </li>
        ))}
      </ul>
      <MaskSplitContainer>
        <div className={styles["selected-projects-footer"]} style={{ background: "#ccc" }}>
          {home[0].featuredProjects.length} of {data.length} projects shown. View all Projects in the{" "}
          <a href="">Index</a>
        </div>
      </MaskSplitContainer>
    </div>
  );
};

export default SelectedProjects;
