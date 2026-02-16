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

  // ▼▼▼ 修正箇所 1: 言語判定とパス抽出ロジック ▼▼▼
  // URLが /en で始まっているかで判定
  const isEnglish = pathname.startsWith('/en');
  const currentLang = isEnglish ? 'en' : 'jp';

  // /en や /jp を取り除いた純粋なパスを抽出
  // (例: "/en/about" -> "about", "/about" -> "about")
  const basePath = pathname
    .replace(/^\/en(\/|$)/, '') // /en または /en/ を削除
    .replace(/^\/jp(\/|$)/, '') // /jp または /jp/ を削除
    .replace(/^\//, '');        // 先頭に残ったスラッシュを削除
  // ▲▲▲ 修正箇所 1 終了 ▲▲▲

  const getEffectiveColor = (lang) => {
    if (lang === currentLang) {
      return "#000";
    }
    return hoveredLang === lang ? "#000" : "#d4d5d6";
  };

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  return (
    <>
      <div className={styles.top_title}>
        <div className={styles.top_title_inner}>
          <div className={styles.logo_inner}>
            {/* ▼▼▼ 修正箇所 2: ロゴリンク先修正 (日本語ならルートへ) ▼▼▼ */}
            <Link href={isEnglish ? '/en' : '/'}>
              <img src="/B-h-L-E.png" alt="アイコン" />
            </Link>
          </div>

          <div 
            className={styles.rightSide} 
            style={{ gap: currentLang === 'en' ? '72.8px' : '50px' }}
          >
            <div className={styles.languageSwitch}>
              {/* ▼▼▼ 修正箇所 3: JPリンク修正 (/jpなし) ▼▼▼ */}
              <Link 
                href={basePath ? `/${basePath}` : '/'} 
                className={styles.langLink} 
                scroll={false}
              >
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
              {/* ▼▼▼ 修正箇所 4: ENリンク修正 (/enあり) ▼▼▼ */}
              <Link 
                href={basePath ? `/en/${basePath}` : '/en'} 
                className={styles.langLink} 
                scroll={false}
              >
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