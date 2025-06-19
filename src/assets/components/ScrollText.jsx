import { useRef, useEffect, useState } from "react";
import randomColorScheme from "@utils/colorSchemes";

const ScrollText = ({ string, fontSize }) => {
  const linkRef = useRef();
  const [colorScheme, setColorScheme] = useState({ background: "#000", font: "#fff" });

  useEffect(() => {
    setColorScheme(randomColorScheme());
  }, []);

  useEffect(() => {
    const container = linkRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth / 2;
    let scrollPos = 0;
    const speed = 5;
    const interval = 20;

    const scroll = () => {
      scrollPos += speed;
      if (scrollPos >= scrollWidth) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
    };

    const scrollInterval = setInterval(scroll, interval);
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div
      className="scroll-text-container"
      ref={linkRef}
      style={{
        background: colorScheme.background,
        color: colorScheme.font,
        fontSize: `var(--font-size-${fontSize})`,
      }}
    >
      <div className="scroll-text">
        {Array(8)
          .fill(string)
          .map((msg, i) => (
            <span key={i}>{msg}</span>
          ))}
      </div>
    </div>
  );
};

export default ScrollText;
