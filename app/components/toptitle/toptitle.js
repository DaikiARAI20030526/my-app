"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuModal from "../menumodal/menumodal"; // MenuModal のパスは適宜調整してください
import styles from "./toptitle.module.css";

export default function TopTitle() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  // hoveredLang: "jp" | "en" | null
  const [hoveredLang, setHoveredLang] = useState(null);
  // メニュー表示状態の管理
  const [menuOpen, setMenuOpen] = useState(false);

  const getEffectiveColor = (lang) => {
    if (isEnglish) {
      if (lang === "jp") {
        return hoveredLang === "jp" ? "#000" : "#e5e5e5";
      } else {
        return hoveredLang === "jp" ? "#e5e5e5" : "#000";
      }
    } else {
      if (lang === "jp") {
        return hoveredLang === "en" ? "#e5e5e5" : "#000";
      } else {
        return hoveredLang === "en" ? "#000" : "#e5e5e5";
      }
    }
  };

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  return (
    <>
      <div className={styles.top_title}>
        <div className={styles.top_title_inner}>
          {/* 左: ロゴ（トップへリンク） */}
          <div className={styles.logo_inner}>
            <Link href="/top">
              <img src="/B-h-L-E.png" alt="アイコン" />
            </Link>
          </div>

          {/* 右: 言語切り替え + メニュー */}
          <div className={styles.rightSide}>
            <div className={styles.languageSwitch}>
              <Link href="/jp" className={styles.langLink}>
                <p
                  className={styles.langText}
                  style={{
                    fontSize: "12px",
                    color: getEffectiveColor("jp"),
                    margin: 0,
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                  onMouseEnter={() => setHoveredLang("jp")}
                  onMouseLeave={() => setHoveredLang(null)}
                >
                  JP
                </p>
              </Link>
              <span className={styles.langSlash}>/</span>
              <Link href="/en" className={styles.langLink}>
                <p
                  className={styles.langText}
                  style={{
                    fontSize: "12px",
                    color: getEffectiveColor("en"),
                    margin: 0,
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                  onMouseEnter={() => setHoveredLang("en")}
                  onMouseLeave={() => setHoveredLang(null)}
                >
                  EN
                </p>
              </Link>
            </div>
            <p
              className={styles.menuTrigger}
              onClick={handleMenuClick}
            >
              メニュー
            </p>
          </div>
        </div>
      </div>
      {menuOpen && <MenuModal onClose={() => setMenuOpen(false)} />}
    </>
  );
}
