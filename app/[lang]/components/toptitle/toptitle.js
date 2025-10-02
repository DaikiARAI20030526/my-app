"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuModal from "../menumodal/menumodal";
import styles from "./toptitle.module.css";

export default function TopTitle() {
  const pathname = usePathname();
  const [hoveredLang, setHoveredLang] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const segments = pathname.split('/');
  const currentLang = segments[1] || 'jp';
  const basePath = segments.slice(2).join('/');

  const getEffectiveColor = (lang) => {
    if (lang === currentLang) {
      return "#000";
    }
    return hoveredLang === lang ? "#000" : "#e5e5e5";
  };

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  return (
    <>
      <div className={styles.top_title}>
        <div className={styles.top_title_inner}>
          <div className={styles.logo_inner}>
            <Link href={`/${currentLang}`}>
              <img src="/B-h-L-E.png" alt="アイコン" />
            </Link>
          </div>

          <div 
            className={styles.rightSide} 
            style={{ gap: currentLang === 'en' ? '72.8px' : '50px' }}
          >
            <div className={styles.languageSwitch}>
              {/* ▼▼▼ ここに scroll={false} を追加 ▼▼▼ */}
              <Link href={`/jp/${basePath}`} className={styles.langLink} scroll={false}>
                <p
                  className={styles.langText}
                  style={{
                    fontSize: "12px",
                    color: getEffectiveColor("jp"),
                    margin: 0,
                  }}
                  onMouseEnter={() => setHoveredLang("jp")}
                  onMouseLeave={() => setHoveredLang(null)}
                >
                  JP
                </p>
              </Link>
              <span className={styles.langSlash}>/</span>
              {/* ▼▼▼ ここに scroll={false} を追加 ▼▼▼ */}
              <Link href={`/en/${basePath}`} className={styles.langLink} scroll={false}>
                <p
                  className={styles.langText}
                  style={{
                    fontSize: "12px",
                    color: getEffectiveColor("en"),
                    margin: 0,
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
              {currentLang === 'en' ? 'Menu' : 'メニュー'}
            </p>
          </div>
        </div>
      </div>
      {menuOpen && <MenuModal onClose={() => setMenuOpen(false)} />}
    </>
  );
}
