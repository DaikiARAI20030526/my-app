"use client";

import React from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import styles from "./menumodal.module.css";

// テキストを多言語で定義
const content = {
  jp: {
    top: "トップ",
    about: "シチズンサイエンスについて",
    research: "研究実績",
    member: "研究メンバーについて",
    ongoingProjects: "進行中のプロジェクト",
    news: "お知らせ",
    whatIsCS: "シチズンサイエンスってなに？",
    csExamples: "実例で見るシチズンサイエンス",
    ourResearch: "当センターの研究領域",
    papers: "論文",
    conference: "学会発表",
    books: "書籍",
    awards: "受賞",
    lectures: "講演など",
  },
  en: {
    top: "Top",
    about: "About Citizen Science",
    research: "Research",
    member: "Members",
    ongoingProjects: "Ongoing Projects",
    news: "News",
    whatIsCS: "What is Citizen Science?",
    csExamples: "Examples in Practice",
    ourResearch: "Our Research Area",
    papers: "Papers",
    conference: "Conferences",
    books: "Books",
    awards: "Awards",
    lectures: "Lectures, etc.",
  },
};

export default function MenuModal({ onClose, variant = "a" }) {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split('/');
  const currentLang = segments[1] || 'jp';
  const basePath = segments.slice(2).join('/');
  const t = content[currentLang] || content.jp;

  const isActive = (href) => {
    const [path] = href.split("#");
    return path === pathname;
  };

  const modalInnerClass =
    variant === "b" ? styles.modalInnerVariantB : styles.modalInner;

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLangSwitch = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  return createPortal(
    <div className={styles.modalContainer}>
      <div className={modalInnerClass}>
        <div className={styles.modalMenu}>
          <div className={styles.menuLeft}>
            {/* 左カラム */}
            <div className={styles.leftColum2}>
              <Link
                href={`/${currentLang}`}
                className={`${styles.menuLinkLeft} ${
                  isActive(`/${currentLang}`) ? styles.active : ""
                }`}
                onClick={onClose}
              >
                {t.top}
              </Link>
              <Link
                href={`/${currentLang}/about`}
                className={`${styles.menuLinkLeft} ${
                  isActive(`/${currentLang}/about`) ? styles.active : ""
                }`}
                style={{ marginTop: "10px" }}
                onClick={onClose}
              >
                {t.about}
              </Link>
              <Link
                href={`/${currentLang}/research`}
                className={`${styles.menuLinkLeft} ${
                  isActive(`/${currentLang}/research`) ? styles.active : ""
                }`}
                style={{ marginTop: "46px" }}
                onClick={onClose}
              >
                {t.research}
              </Link>
              <Link
                href={`/${currentLang}/member`}
                className={`${styles.menuLinkLeft} ${
                  isActive(`/${currentLang}/member`) ? styles.active : ""
                }`}
                style={{ marginTop: "119px" }}
                onClick={onClose}
              >
                {t.member}
              </Link>
            </div>

            {/* 右カラム */}
            <div className={styles.menuRight}>
              <div className={styles.rightColum1}>
                <div className={styles.rightGroupC}>
                  <Link href={`/${currentLang}#project`}>
                    <p
                      className={styles.menuTextLeft}
                      onClick={() => {
                        onClose();
                        setTimeout(() => scrollToAnchor("project"), 100);
                      }}
                    >
                      {t.ongoingProjects}
                    </p>
                  </Link>
                  <Link href={`/${currentLang}#news`}>
                    <p
                      className={styles.menuTextLeft}
                      onClick={() => {
                        onClose();
                        setTimeout(() => scrollToAnchor("news"), 100);
                      }}
                    >
                      {t.news}
                    </p>
                  </Link>
                </div>
                {/* ▼▼▼ ここから変更 ▼▼▼ */}
                <div className={styles.rightGroupA}>
                  <Link href={`/${currentLang}/about#citizenscience`}><p className={styles.menuTextLeft} onClick={onClose}>{t.whatIsCS}</p></Link>
                  {/* currentLangが'en'でない場合のみ、csExamplesを表示 */}
                  {currentLang !== 'en' && (
                    <Link href={`/${currentLang}/about#examples`}><p className={styles.menuTextLeft} onClick={onClose}>{t.csExamples}</p></Link>
                  )}
                  <Link href={`/${currentLang}/about#research-area`}><p className={styles.menuTextLeft} onClick={onClose}>{t.ourResearch}</p></Link>
                </div>
                {/* ▲▲▲ ここまで変更 ▲▲▲ */}

                <div className={styles.rightGroupB}>
                  <Link href={`/${currentLang}/research`}><p className={`${styles.menuTextLeft} ${isActive(`/${currentLang}/research`) ? styles.active : ""}`} onClick={onClose}>{t.papers}</p></Link>
                  <Link href={`/${currentLang}/conference`}><p className={`${styles.menuTextLeft} ${isActive(`/${currentLang}/conference`) ? styles.active : ""}`} onClick={onClose}>{t.conference}</p></Link>
                  <Link href={`/${currentLang}/book`}><p className={`${styles.menuTextLeft} ${isActive(`/${currentLang}/book`) ? styles.active : ""}`} onClick={onClose}>{t.books}</p></Link>
                  <Link href={`/${currentLang}/award`}><p className={`${styles.menuTextLeft} ${isActive(`/${currentLang}/award`) ? styles.active : ""}`} onClick={onClose}>{t.awards}</p></Link>
                  <Link href={`/${currentLang}/lecture`}><p className={`${styles.menuTextLeft} ${isActive(`/${currentLang}/lecture`) ? styles.active : ""}`} onClick={onClose}>{t.lectures}</p></Link>
                </div>
              </div>

              {/* 言語スイッチ */}
              <div className={styles.rightColum2}>
                <div className={styles.rightcolumn2_top} style={{ gap: currentLang === 'en' ? '72.8px' : '50px' }}>
                  <div className={styles.modalLangSwitch}>
                    <a
                      href={`/jp/${basePath}`}
                      className={`${styles.langLink} ${
                        currentLang === "jp" ? styles.activeLang : ""
                      }`}
                      onClick={(e) => handleLangSwitch(e, `/jp/${basePath}`)}
                    >
                      <p className={styles.langText}>JP</p>
                    </a>
                    <span className={styles.langSlash}>/</span>
                    <a
                      href={`/en/${basePath}`}
                      className={`${styles.langLink} ${
                        currentLang === "en" ? styles.activeLang : ""
                      }`}
                      onClick={(e) => handleLangSwitch(e, `/en/${basePath}`)}
                    >
                      <p className={styles.langText}>EN</p>
                    </a>
                  </div>
                  <img
                    src="/back.png"
                    alt="Back"
                    className={styles.backIcon}
                    onClick={onClose}
                  />
                </div>
                <div className={styles.rightcolumn2_under}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalCanvas}></div>
      </div>
    </div>,
    document.body
  );
}

