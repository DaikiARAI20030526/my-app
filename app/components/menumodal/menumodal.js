// MenuModal.jsx

"use client";

import React from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import styles from "./menumodal.module.css";

export default function MenuModal({ onClose, variant = "a" }) {
  const pathname = usePathname();

  // 「#」以降を除いたパス同士を比較してメニューリンクのアクティブ判定
  const isActive = (href) => {
    const [path] = href.split("#");
    return path === pathname;
  };

  // 現在の言語が "en" かどうかを判定
  const isLangActive = (lang) => {
    if (lang === "en") {
      // Path が "/en" で始まるものを英語ページとみなす
      return pathname.startsWith("/en");
    }
    // それ以外はすべて日本語ページ
    return !pathname.startsWith("/en");
  };

  const modalInnerClass =
    variant === "b" ? styles.modalInnerVariantB : styles.modalInner;

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return createPortal(
    <div className={styles.modalContainer}>
      <div className={modalInnerClass}>

        {/* --- modalMenu --- */}
        <div className={styles.modalMenu}>
          <div className={styles.menuLeft}>

            {/* 左カラム */}
            <div className={styles.leftColum2}>
              <a
                href="/top"
                className={`${styles.menuLinkLeft} ${
                  isActive("/top") ? styles.active : ""
                }`}
              >
                トップ
              </a>
              <a
                href="/about"
                className={`${styles.menuLinkLeft} ${
                  isActive("/about") ? styles.active : ""
                }`}
                style={{ marginTop: "10px" }}
              >
                シチズンサイエンスについて
              </a>
              <a
                href="/research"
                className={`${styles.menuLinkLeft} ${
                  isActive("/research") ? styles.active : ""
                }`}
                style={{ marginTop: "46px" }}
              >
                研究実績
              </a>
              <a
                href="/member"
                className={`${styles.menuLinkLeft} ${
                  isActive("/member") ? styles.active : ""
                }`}
                style={{ marginTop: "119px" }}
              >
                研究メンバーについて
              </a>
            </div>

            {/* 右カラム */}
            <div className={styles.menuRight}>
              <div className={styles.rightColum1}>

                <div className={styles.rightGroupC}>
                  <Link href="/top#project">
                    <p
                      className={`${styles.menuTextLeft} ${
                        isActive("/top#project") ? styles.active : ""
                      }`}
                      onClick={() => {
                        onClose();
                        setTimeout(() => scrollToAnchor("project"), 100);
                      }}
                    >
                      進行中のプロジェクト
                    </p>
                  </Link>
                  <Link href="/top#news">
                    <p
                      className={`${styles.menuTextLeft} ${
                        isActive("/top#news") ? styles.active : ""
                      }`}
                      onClick={() => {
                        onClose();
                        setTimeout(() => scrollToAnchor("news"), 100);
                      }}
                    >
                      お知らせ
                    </p>
                  </Link>
                </div>

                <div className={styles.rightGroupA}>
                  <Link href="/about#citizenscience">
                    <p
                      className={`${styles.menuTextLeft} ${
                        isActive("/about#citizenscience")
                          ? styles.active
                          : ""
                      }`}
                      onClick={onClose}
                    >
                      シチズンサイエンスってなに？
                    </p>
                  </Link>
                  <Link href="/about#examples">
                    <p
                      className={`${styles.menuTextLeft} ${
                        isActive("/about#examples") ? styles.active : ""
                      }`}
                      onClick={onClose}
                    >
                      実例で見るシチズンサイエンス
                    </p>
                  </Link>
                  <Link href="/about#research-area">
                    <p
                      className={`${styles.menuTextLeft} ${
                        isActive("/about#research-area")
                          ? styles.active
                          : ""
                      }`}
                      onClick={onClose}
                    >
                      当センターの研究領域
                    </p>
                  </Link>
                </div>

                <div className={styles.rightGroupB}>
                  <Link href="/research">
                    <p
                      className={`${styles.menuTextLeft} ${
                        isActive("/research") ? styles.active : ""
                      }`}
                      onClick={onClose}
                    >
                      論文
                    </p>
                  </Link>
                  <Link href="/conference">
                    <p
                      className={`${styles.menuTextLeft} ${
                        isActive("/conference") ? styles.active : ""
                      }`}
                      onClick={onClose}
                    >
                      学会発表
                    </p>
                  </Link>
                  <Link href="/book">
                    <p
                      className={`${styles.menuTextLeft} ${
                        isActive("/book") ? styles.active : ""
                      }`}
                      onClick={onClose}
                    >
                      書籍
                    </p>
                  </Link>
                  <Link href="/award">
                    <p
                      className={`${styles.menuTextLeft} ${
                        isActive("/award") ? styles.active : ""
                      }`}
                      onClick={onClose}
                    >
                      受賞
                    </p>
                  </Link>
                  <Link href="/lecture">
                    <p
                      className={`${styles.menuTextLeft} ${
                        isActive("/lecture") ? styles.active : ""
                      }`}
                      onClick={onClose}
                    >
                      講演など
                    </p>
                  </Link>
                </div>

              </div>

              {/* 言語スイッチ */}
              <div className={styles.rightColum2}>
                <div className={styles.rightcolumn2_top}>
                  <div className={styles.modalLangSwitch}>
                    <Link
                      href="/jp"
                      className={`${styles.langLink} ${
                        isLangActive("jp") ? styles.activeLang : ""
                      }`}
                    >
                      <p className={styles.langText} onClick={onClose}>
                        JP
                      </p>
                    </Link>
                    <span className={styles.langSlash}>/</span>
                    <Link
                      href="/en"
                      className={`${styles.langLink} ${
                        isLangActive("en") ? styles.activeLang : ""
                      }`}
                    >
                      <p className={styles.langText} onClick={onClose}>
                        EN
                      </p>
                    </Link>
                  </div>
                  <img
                    src="/back.png"
                    alt="Back"
                    className={styles.backIcon}
                    onClick={onClose}
                  />
                </div>
                <div className={styles.rightcolumn2_under}>
                  {/* 下部コンテンツ */}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* modalCanvas 部分 */}
        <div className={styles.modalCanvas}>
          <a>ここに</a>
        </div>

      </div>
    </div>,
    document.body
  );
}
