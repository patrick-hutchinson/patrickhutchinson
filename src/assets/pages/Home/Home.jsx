import React from "react";
import { useEffect, useState, useRef } from "react";

import Work from "../Work/Work";
import About from "../About/About";
import Opening from "../Opening/Opening";
import News from "../News/News";

export default function Home() {
  return (
    <main>
      {/* <Opening /> */}
      <About />
      <Work />
      <News />
    </main>
  );
}
