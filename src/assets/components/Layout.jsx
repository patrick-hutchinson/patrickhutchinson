import React, { useEffect, useState, useRef } from "react";

import { Outlet, useLocation } from "react-router-dom";
// import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout() {
  return (
    // <ReactLenis root>
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
    // </ReactLenis>
  );
}
