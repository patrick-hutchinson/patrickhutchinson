import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "./Layout/Layout";
import About from "assets/pages/About/About";
import Work from "assets/pages/Work/Work";
import Public from "assets/pages/Public/Public";
import Project from "assets/pages/Project/Project";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route index element={<About />}></Route>
          <Route path="work" element={<Work />}></Route>
          <Route path="work/:slug" element={<Project />}></Route>
          <Route path="public" element={<Public />}></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
