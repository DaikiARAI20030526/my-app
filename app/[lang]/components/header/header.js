"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import MenuModal from "../menumodal/menumodal";
import styles from "./header.module.css";

export default function Header({ pageTitle }) {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  const [showModal, setShowModal] = useState(false);
  const [hoveredLang, setHoveredLang] = useState(null);
  const [headerTitle, setHeaderTitle] = useState("");

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
    if (isEnglish) {
      return lang === "jp"
        ? hoveredLang === "jp" ? "#000" : "#e5e5e5"
        : hoveredLang === "jp" ? "#e5e5e5" : "#000";
    } else {
      return lang === "jp"
        ? hoveredLang === "en" ? "#e5e5e5" : "#000"
        : hoveredLang === "en" ? "#000" : "#e5e5e5";
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topTitleInner}>
          <div className={styles.logoAndArrow}>
            <div className={styles.logoInner}>
              <Link href="/top">
                <img
                  src="/B-vertical-J.png"
                  alt="アイコン"
                  className={styles.logoImg}
                />
              </Link>
            </div>
            {/* arrowImg は削除 */}
          </div>
          <div className={styles.headerTitle}>
            <p>{headerTitle}</p>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.languageSwitch}>
              <Link href="/jp">
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
              <Link href="/en">
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
