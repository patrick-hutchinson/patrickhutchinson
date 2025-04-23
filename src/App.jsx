import React, { useState } from "react";

import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "assets/context/DataContext";
import "./App.css";

import AnimatedRoutes from "assets/components/AnimatedRoutes";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AnimatedRoutes />
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
