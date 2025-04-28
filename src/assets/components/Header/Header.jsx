import React, { useContext } from "react";

import DesktopHeader from "./components/DesktopHeader";
import MobileHeader from "./components/MobileHeader";

import { GlobalStateContext } from "assets/context/GlobalStateContext";

export default function Header() {
  const { isMobile } = useContext(GlobalStateContext);

  console.log(isMobile, "isMobile?");

  let colorModes = [
    { backgroundColor: "#DF0002", fontColor: "#121111" },
    { backgroundColor: "#ffffff", fontColor: "#121111" },
    { backgroundColor: "#121111", fontColor: "#D9DAD9" },
  ];

  return isMobile ? <MobileHeader colorModes={colorModes} /> : <DesktopHeader colorModes={colorModes} />;
}
