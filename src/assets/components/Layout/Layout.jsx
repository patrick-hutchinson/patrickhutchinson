import React from "react";
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { ReactLenis } from "@studio-freight/react-lenis";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { AnimatePresence } from "framer-motion";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const outlet = useOutlet();

  return (
    <ReactLenis root>
      {!isHome && <Header />}

      <AnimatePresence mode="wait">
        <div key={location.pathname}>{outlet}</div>
      </AnimatePresence>

      <Footer />
    </ReactLenis>
  );
}
