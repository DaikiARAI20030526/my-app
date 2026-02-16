"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import MenuModal from "../menumodal/menumodal";
import styles from "./header.module.css";

export default function Header({ pageTitle }) {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [hoveredLang, setHoveredLang] = useState(null);
  const [headerTitle, setHeaderTitle] = useState("");
  
  // ▼▼▼ 修正箇所 1：言語判定とパス抽出ロジックの整理 ▼▼▼
  
  // 1. 言語判定: URLが /en で始まっているかどうか
  const isEnglish = pathname.startsWith('/en');
  const currentLang = isEnglish ? 'en' : 'jp';

  // 2. パス抽出: URLから言語部分(/enや/jp)を取り除いた「ページ部分」を取得
  // 正規表現の意味: 行頭(^)にある /en または /jp に続き、スラッシュ(/)か行末($)が来るものだけを削除
  // これにより /entertainment などの誤判定を防ぎます
  const basePath = pathname
    .replace(/^\/en(\/|$)/, '') // /en/ または /en を削除
    .replace(/^\/jp(\/|$)/, '') // /jp/ または /jp を削除
    .replace(/^\//, '');        // 先頭に残ったスラッシュがあれば削除

  // ▲▲▲ 修正箇所 1 終了 ▲▲▲

  useEffect(() => {
    if (pageTitle && pageTitle.trim().length > 0) {
      setHeaderTitle(pageTitle);
    } else {
      setHeaderTitle(document.title);
    }
  }, [pageTitle, pathname]);

  const handleMenuClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const getEffectiveColor = (lang) => {
    if (lang === currentLang) {
      return "#000";
    }
    return hoveredLang === lang ? "#000" : "#d4d5d6";
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topTitleInner}>
          <div className={styles.logoAndArrow}>
            <div className={styles.logoInner}>
              {/* ▼▼▼ 修正箇所 2：ロゴのリンク先 (英語なら/en、日本語なら/) ▼▼▼ */}
              <Link href={isEnglish ? '/en' : '/'}>
                <img
                  src="/B-vertical-J.png"
                  alt="アイコン"
                  className={styles.logoImg}
                />
              </Link>
            </div>
          </div>
          <div className={styles.headerTitle}>
            <p>{headerTitle}</p>
          </div>
          <div 
            className={styles.rightSide} 
            style={{ gap: currentLang === 'en' ? '72.7px' : '50px' }}
          >
            <div className={styles.languageSwitch}>
              {/* ▼▼▼ 修正箇所 3：JPボタン (常に /basePath または / へ) ▼▼▼ */}
              <Link href={basePath ? `/${basePath}` : '/'}>
                <p
                  className={styles.langText}
                  style={{ color: getEffectiveColor("jp") }}
                  onMouseEnter={() => setHoveredLang("jp")}
                  onMouseLeave={() => setHoveredLang(null)}
                >
                  JP
                </p>
              </Link>
              <span className={styles.langSlash}>/</span>
              {/* ▼▼▼ 修正箇所 4：ENボタン (常に /en/basePath または /en へ) ▼▼▼ */}
              <Link href={basePath ? `/en/${basePath}` : '/en'}>
                <p
                  className={styles.langText}
                  style={{ color: getEffectiveColor("en") }}
                  onMouseEnter={() => setHoveredLang("en")}
                  onMouseLeave={() => setHoveredLang(null)}
                >
                  EN
                </p>
              </Link>
            </div>
            <div className={styles.menuContainer}>
              <p className={styles.menuText} onClick={handleMenuClick}>
                {currentLang === 'en' ? 'Menu' : 'メニュー'}
              </p>
            </div>
          </div>
        </div>
      </header>
      {showModal && <MenuModal onClose={handleCloseModal} variant="b" />}
    </>
  );
}