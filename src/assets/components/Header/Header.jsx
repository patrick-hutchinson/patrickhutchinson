import React, { useContext } from "react";

import DesktopHeader from "./components/DesktopHeader";
import MobileHeader from "./components/MobileHeader";

import { StateContext } from "assets/context/StateContext";

export default function Header() {
  const { isMobile } = useContext(StateContext);

  let colorModes = [
    { backgroundColor: "#ffffff", fontColor: "#121111" },
    { backgroundColor: "#121111", fontColor: "#D9DAD9" },
  ];

  return isMobile ? <MobileHeader colorModes={colorModes} /> : <DesktopHeader colorModes={colorModes} />;
  return <></>;
}
