import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "./Layout/Layout";
import Project from "assets/pages/Project/Project";
import Public from "assets/pages/Public/Public";
import Selected from "assets/pages/Selected/Selected";
import Index from "assets/pages/Index/Index";
import Services from "assets/pages/Services/Services";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Selected />}></Route>
        <Route path=":slug" element={<Project />}></Route>
        <Route path="public" element={<Public />}></Route>
        <Route path="services" element={<Services />}></Route>
        <Route path="index" element={<Index />}></Route>
      </Route>
    </Routes>
  );
}

export default AnimatedRoutes;
