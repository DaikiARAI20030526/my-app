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
  
  // ▼▼▼ 修正箇所 1：言語とパスの判定ロジックを変更 ▼▼▼
  // URLが '/en' で始まるかどうかで現在の言語を判定
  const isEnglish = pathname.startsWith('/en');
  const currentLang = isEnglish ? 'en' : 'jp';

  // 言語プレフィックス(/en や /jp)を除去した「純粋なパス」を抽出
  // 例: "/en/about" -> "about", "/about" -> "about", "/" -> ""
  const basePath = pathname
    .replace(/^\/en/, '') // 先頭の /en を削除
    .replace(/^\/jp/, '') // 念のため /jp があっても削除（移行期間用）
    .replace(/^\//, '');  // 先頭に残ったスラッシュを削除
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
              {/* ▼▼▼ 修正箇所 2：ロゴのリンク先修正（日本語ならルートへ） ▼▼▼ */}
              <Link href={currentLang === 'en' ? '/en' : '/'}>
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
              {/* ▼▼▼ 修正箇所 3：JPリンクから /jp を削除（ルート相対にする） ▼▼▼ */}
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
              {/* ▼▼▼ 修正箇所 4：ENリンクは /en をつける ▼▼▼ */}
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