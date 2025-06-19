import { useState } from "react";
import randomColorScheme from "@utils/colorSchemes";

const HoverLink = ({ children }) => {
  const [colorScheme, setColorScheme] = useState({ background: "#fff", font: "#000" });

  function handleMouseEnter(e) {
    const newColorScheme = randomColorScheme();
    setColorScheme(newColorScheme);

    e.currentTarget.querySelectorAll(".hoverlink").forEach((item) => {
      item.style.background = newColorScheme.background;
      item.style.color = newColorScheme.font;
    });
  }

  function handleMouseLeave(e) {
    e.currentTarget.querySelectorAll(".hoverlink").forEach((item) => {
      item.style.background = "#fff";
      item.style.color = "#000";
    });
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="linkcontainer">
      {children}
    </div>
  );
};

export default HoverLink;
