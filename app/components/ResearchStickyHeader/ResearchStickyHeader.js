"use client";

import React, { useState, useEffect } from "react";
import Header from "../header/header";
import styles from "./researchStickyHeader.module.css";

export default function ResearchStickyHeader({ pageTitles, subtitleIds }) {
  // 初期タイトルは配列の最初の要素
  const [currentTitle, setCurrentTitle] = useState(pageTitles[0] || "");
  const [showHeader, setShowHeader] = useState(false);
  const headerHeight = 90; // ヘッダーの高さ

  // スクロール位置に応じた header の表示切替
  useEffect(() => {
    const handleScroll = () => {
      // TopPageContent を囲む要素の下端を閾値とする
      const topPageContent = document.getElementById("topPageContent");
      let threshold = 370; // デフォルト値
      if (topPageContent) {
        threshold = topPageContent.offsetTop + topPageContent.offsetHeight;
      }
      if (window.scrollY >= threshold) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);

  // スクロールイベントで、最後に通過した Subtitle のタイトルを更新する
  useEffect(() => {
    const handleTitleUpdate = () => {
      let activeIdx = 0;
      subtitleIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          // 要素の位置（上端）
          const elementTop = el.offsetTop;
          // ヘッダーの高さを差し引いた位置までスクロールした場合、その要素は通過済みとみなす
          if (window.pageYOffset >= elementTop - headerHeight) {
            activeIdx = idx;
          }
        }
      });
      setCurrentTitle(pageTitles[activeIdx]);
    };

    window.addEventListener("scroll", handleTitleUpdate);
    handleTitleUpdate();
    return () => window.removeEventListener("scroll", handleTitleUpdate);
  }, [pageTitles, subtitleIds, headerHeight]);

  return (
    <div className={`${styles.headerWrapper} ${showHeader ? styles.slideDown : styles.slideUp}`}>
      <Header pageTitle={currentTitle} />
    </div>
  );
}
