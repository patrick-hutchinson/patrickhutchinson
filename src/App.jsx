import React from "react";

import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Layout from "./assets/components/Layout";
import Project from "assets/pages/Project/Project";

import About from "./assets/pages/About/About";
import Home from "./assets/pages/Home/Home";
import News from "assets/pages/News/News";
import Work from "assets/pages/Work/Work";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<About />}></Route>
          {/* <Route path="about" element={<About />}></Route> */}
          <Route path="work" element={<Work />}></Route>
          <Route path="work/:slug" element={<Project />}></Route>
          <Route path="public" element={<News />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
