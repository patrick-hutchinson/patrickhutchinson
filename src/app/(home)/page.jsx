"use client";

import React, { useState, useEffect, useRef, useContext } from "react";

import { DataContext } from "assets/context/DataContext";
import { StateContext } from "assets/context/StateContext";

import styles from "./Home.module.css";

export default function Home() {
  const { data } = useContext(DataContext);
  const { isMobile } = useContext(StateContext);
  const { home } = useContext(DataContext);
  if (!data || !home) return;

  return <div className={styles.content}></div>;
}
