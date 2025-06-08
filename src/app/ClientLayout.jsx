"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "@studio-freight/react-lenis";

import Header from "assets/components/Header/Header";
import Footer from "assets/components/Footer/Footer";

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

  return (
    <ReactLenis root>
      <StateProvider>
        <DataProvider>
          <Header />

          <AnimatePresence mode="wait">{shouldAnimate ? <AnimatedRoute /> : <StaticRoute />}</AnimatePresence>

          <Footer />
        </DataProvider>
      </StateProvider>
    </ReactLenis>
  );
}
