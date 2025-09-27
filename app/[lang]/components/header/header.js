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
  
  // 1. 現在の言語と、言語を除いたベースパスを取得
  const segments = pathname.split('/');
  const currentLang = segments[1] || 'jp'; // 'jp' or 'en'
  const basePath = segments.slice(2).join('/');

  useEffect(() => {
    if (pageTitle && pageTitle.trim().length > 0) {
      setHeaderTitle(pageTitle);
    } else {
      // document.titleはクライアントサイドでのみ利用可能
      setHeaderTitle(document.title);
    }
  }, [pageTitle, pathname]);

  const handleMenuClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // 2. シンプルになったカラーロジック
  const getEffectiveColor = (lang) => {
    if (lang === currentLang) {
      return "#000";
    }
    return hoveredLang === lang ? "#000" : "#e5e5e5";
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topTitleInner}>
          <div className={styles.logoAndArrow}>
            <div className={styles.logoInner}>
              <Link href={`/${currentLang}`}>
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
          <div className={styles.rightSide}>
            <div className={styles.languageSwitch}>
              {/* 3. 動的なリンク先を生成 */}
              <Link href={`/jp/${basePath}`}>
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
              <Link href={`/en/${basePath}`}>
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
                メニュー
              </p>
            </div>
          </div>
        </div>
      </header>
      {showModal && <MenuModal onClose={handleCloseModal} variant="b" />}
    </>
  );
}