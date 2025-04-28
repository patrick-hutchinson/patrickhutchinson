import React, { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "./Layout/Layout";
import Work from "assets/pages/Index/Index";
import Public from "assets/pages/Public/Public";
import Selected from "assets/pages/Selected/Selected";
import Index from "assets/pages/Index/Index";
import Services from "assets/pages/Services/Services";
// import Project from "assets/pages/Project/Project";
const Project = lazy(() => import("assets/pages/Project/Project"));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route index element={<Selected />}></Route>
          <Route path="work" element={<Work />}></Route>
          <Route path="work/:slug" element={<Project />}></Route>
          <Route path="public" element={<Public />}></Route>
          <Route path="services" element={<Services />}></Route>
          <Route path="index" element={<Index />}></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
