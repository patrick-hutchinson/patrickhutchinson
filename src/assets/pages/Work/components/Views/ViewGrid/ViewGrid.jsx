import React, { useState, useEffect, useMemo } from "react";
import { Stage, Container, Sprite } from "@pixi/react";
import { getFileSrc } from "assets/utils/getFileSrc";

export default function ViewGrid({ projects }) {
  if (!projects) return <p>Error Loading Component</p>;

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Create 500 copies of each project image and shuffle them
  const repeatedProjects = useMemo(
    () => shuffleArray(projects.flatMap((project) => Array.from({ length: 200 }, () => project))),
    [projects]
  );

  const [grid, setGrid] = useState({ cols: 0, rows: 0, imageSize: 0 });

  useEffect(() => {
    const updateGrid = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const totalImages = repeatedProjects.length;

      const cols = Math.ceil(Math.sqrt(totalImages * (screenWidth / screenHeight)));
      const rows = Math.ceil(totalImages / cols);
      const imageSize = Math.min(screenWidth / cols, screenHeight / rows);

      setGrid({ cols, rows, imageSize });
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, [repeatedProjects]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} options={{ backgroundColor: 0x0c0c0c }}>
      <Container>
        {repeatedProjects.map((project, index) => {
          const col = index % grid.cols;
          const row = Math.floor(index / grid.cols);

          return (
            <Sprite
              key={index}
              image={getFileSrc(project.coverimage)}
              x={col * grid.imageSize}
              y={row * grid.imageSize}
              width={grid.imageSize}
              height={grid.imageSize}
            />
          );
        })}
      </Container>
    </Stage>
  );
}
