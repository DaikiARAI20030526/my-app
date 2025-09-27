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

  // 1. 現在の言語と、言語を除いたベースパスを取得
  const segments = pathname.split('/');
  const currentLang = segments[1] || 'jp'; // 'jp' or 'en'
  const basePath = segments.slice(2).join('/');

  // 2. シンプルになったカラーロジック
  const getEffectiveColor = (lang) => {
    // 現在表示している言語は常に黒
    if (lang === currentLang) {
      return "#000";
    }
    // 表示していない言語は、ホバー時に黒
    return hoveredLang === lang ? "#000" : "#e5e5e5";
  };

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  return (
    <>
      <div className={styles.top_title}>
        <div className={styles.top_title_inner}>
          {/* ロゴのリンク先を現在の言語のトップに設定 */}
          <div className={styles.logo_inner}>
            <Link href={`/${currentLang}`}>
              <img src="/B-h-L-E.png" alt="アイコン" />
            </Link>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.languageSwitch}>
              {/* 3. 動的なリンク先を生成 */}
              <Link href={`/jp/${basePath}`} className={styles.langLink}>
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
              <Link href={`/en/${basePath}`} className={styles.langLink}>
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
              メニュー
            </p>
          </div>
        </div>
      </div>
      {menuOpen && <MenuModal onClose={() => setMenuOpen(false)} />}
    </>
  );
}