import React, { useEffect, useState, useRef } from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

import styles from "./Layout.module.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <ReactLenis root>
      <>
        <Header />
        <Outlet />

        <div className={styles.menu}>
          <ul>
            <li>
              <Link to="/">/About</Link>
            </li>
            <li>
              <Link to="/work">/Work</Link>
            </li>
            <li>
              <Link to="/public">/Public</Link>
            </li>
          </ul>
        </div>

        <Footer />
      </>
    </ReactLenis>
  );
}
