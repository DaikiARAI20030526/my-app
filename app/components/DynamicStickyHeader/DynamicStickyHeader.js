"use client";

import React, { useState, useEffect } from "react";
import Header from "../header/header";
import styles from "./dynamicStickyHeader.module.css";

// デフォルト値 [] を設定
export default function DynamicStickyHeader({ titleArray = [] }) {
  const [currentTitle, setCurrentTitle] = useState(titleArray[0] || "");
  const [showHeader, setShowHeader] = useState(false);
  const achievementThreshold = 370; // ヘッダー表示切替のスクロール閾値
  const headerHeight = 90;          // ヘッダーの高さ
  const threshold = headerHeight + 70; // 切り替え基準＝160px

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY >= achievementThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [achievementThreshold]);

  useEffect(() => {
    const handleTitleUpdate = () => {
      const titleElements = document.querySelectorAll(".dynamicTitle");
      let activeTitle = "";
      let smallestDiff = Infinity;
      titleElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          const diff = threshold - rect.top;
          if (diff < smallestDiff) {
            smallestDiff = diff;
            activeTitle = el.textContent.trim();
          }
        }
      });
      setCurrentTitle(activeTitle);
    };

    window.addEventListener("scroll", handleTitleUpdate);
    handleTitleUpdate();
    return () => window.removeEventListener("scroll", handleTitleUpdate);
  }, [threshold]);

  return (
    <div className={`${styles.headerWrapper} ${showHeader ? styles.slideDown : styles.slideUp}`}>
      <Header pageTitle={currentTitle} />
    </div>
  );
}
