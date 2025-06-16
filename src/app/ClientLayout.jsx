"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "@studio-freight/react-lenis";

import Header from "assets/components/Header/Header";
import Footer from "assets/components/Footer/Footer";
import Grid from "assets/components/Grid";

import { AnimatePresence } from "framer-motion";

import { StateProvider } from "assets/context/StateContext";
import { DataProvider } from "assets/context/DataContext";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const prevPath = useRef(pathname);

  const shouldAnimate = prevPath.current !== pathname;

  useEffect(() => {
    prevPath.current = pathname;
  }, [pathname]);

  let AnimatedRoute = () => {
    return (
      <div id="root" key={pathname}>
        {children}
      </div>
    );
  };

  let StaticRoute = () => {
    return <div id="root">{children}</div>;
  };

  // useEffect(() => {
  //   const colors = [
  //     { r: 204, g: 204, b: 204 }, // #ccc
  //     { r: 82, g: 122, b: 253 }, // #527afd
  //     { r: 17, g: 235, b: 136 }, // #11eb88
  //     { r: 202, g: 127, b: 253 }, // #ca7ffd
  //   ];

  //   const totalDuration = 60000; // 60 seconds
  //   const transitionPct = 0.03;
  //   const stepPct = (1 - transitionPct * colors.length) / colors.length; // ~0.22
  //   const transitionTime = totalDuration * transitionPct;
  //   const holdTime = totalDuration * stepPct;

  //   function lerp(a, b, t) {
  //     return Math.round(a + (b - a) * t);
  //   }

  //   function animateColor(from, to, duration, callback) {
  //     const start = performance.now();

  //     function step(now) {
  //       const t = Math.min((now - start) / duration, 1);
  //       const r = lerp(from.r, to.r, t);
  //       const g = lerp(from.g, to.g, t);
  //       const b = lerp(from.b, to.b, t);
  //       document.documentElement.style.setProperty("--animated-background-color", `rgb(${r}, ${g}, ${b})`);
  //       if (t < 1) {
  //         requestAnimationFrame(step);
  //       } else {
  //         callback?.();
  //       }
  //     }

  //     requestAnimationFrame(step);
  //   }

  //   let index = 0;
  //   function cycle() {
  //     const current = colors[index];
  //     const nextIndex = (index + 1) % colors.length;
  //     const next = colors[nextIndex];

  //     // Hold current color
  //     document.documentElement.style.setProperty(
  //       "--animated-background-color",
  //       `rgb(${current.r}, ${current.g}, ${current.b})`
  //     );

  //     setTimeout(() => {
  //       // Animate to next color
  //       animateColor(current, next, transitionTime, () => {
  //         index = nextIndex;
  //         cycle();
  //       });
  //     }, holdTime);
  //   }

  //   cycle();
  // }, []);

  return (
    <ReactLenis root>
      <StateProvider>
        <DataProvider>
          <Header />
          <Grid />

          <AnimatePresence mode="wait">{shouldAnimate ? <AnimatedRoute /> : <StaticRoute />}</AnimatePresence>

          <Footer />
        </DataProvider>
      </StateProvider>
    </ReactLenis>
  );
}
