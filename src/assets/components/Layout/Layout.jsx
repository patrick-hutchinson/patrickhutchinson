import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ReactLenis } from "@studio-freight/react-lenis";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <ReactLenis root>
      {!isHome && <Header />}
      {/* <main> */}
      <Outlet />
      {/* </main> */}
      <Footer />
    </ReactLenis>
  );
}
