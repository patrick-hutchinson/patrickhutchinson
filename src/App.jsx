import React from "react";

import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Layout from "./assets/components/Layout";
import Project from "assets/pages/Project/Project";

// import Work from "./assets/pages/Work/Work";
import Home from "./assets/pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="work/:slug" element={<Project />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
