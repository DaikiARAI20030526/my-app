"use client";

import React, { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのみポータルをレンダリングするためのフラグ
  useEffect(() => {
    setMounted(true);
  }, []);

  // ▼▼▼ 修正箇所 1：言語判定とパス抽出ロジック ▼▼▼
  // URLが /en で始まっているかで判定
  const isEnglish = pathname.startsWith('/en');
  const currentLang = isEnglish ? 'en' : 'jp';

  // 言語プレフィックス(/en や /jp)を除去した「純粋なパス」を抽出
  const basePath = pathname
    .replace(/^\/en(\/|$)/, '')
    .replace(/^\/jp(\/|$)/, '')
    .replace(/^\//, '');

  // リンクの頭につける文字 (/en または 空文字)
  const prefix = isEnglish ? '/en' : '';
  const t = content[currentLang] || content.jp;
  // ▲▲▲ 修正箇所 1 終了 ▲▲▲


  // アクティブ判定ロジックも修正
  const isActive = (targetPath) => {
    // targetPath (例: "/about") と 現在のpathname (例: "/about") を比較
    // 言語プレフィックス込みのpathnameと、生成したリンク先が一致するか
    const currentPath = pathname.split('#')[0]; // #以降を無視
    const target = targetPath.split('#')[0];
    
    // 完全一致、またはトップページ("/")の判定
    if (target === '/' && currentPath === '/') return true;
    if (target === '/en' && currentPath === '/en') return true;
    
    // それ以外は一致するかどうか
    return currentPath === target;
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
    // 言語切り替え後はモーダルを閉じる
    onClose(); 
  };

  // SSR時のエラー回避のため、マウント前は何も表示しない
  if (!mounted) return null;

  return createPortal(
    <div className={styles.modalContainer}>
      <div className={modalInnerClass}>
        <div className={styles.modalMenu}>
          <div className={styles.menuLeft}>
            {/* 左カラム */}
            <div className={styles.leftColum2}>
              <Link
                href={prefix || '/'}
                className={`${styles.menuLinkLeft} ${
                  isActive(prefix || '/') ? styles.active : ""
                }`}
                onClick={onClose}
              >
                {t.top}
              </Link>
              <Link
                href={`${prefix}/about`}
                className={`${styles.menuLinkLeft} ${
                  isActive(`${prefix}/about`) ? styles.active : ""
                }`}
                style={{ marginTop: "10px" }}
                onClick={onClose}
              >
                {t.about}
              </Link>
              <Link
                href={`${prefix}/research`}
                className={`${styles.menuLinkLeft} ${
                  isActive(`${prefix}/research`) ? styles.active : ""
                }`}
                style={{ marginTop: "46px" }}
                onClick={onClose}
              >
                {t.research}
              </Link>
              <Link
                href={`${prefix}/member`}
                className={`${styles.menuLinkLeft} ${
                  isActive(`${prefix}/member`) ? styles.active : ""
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
                  <Link href={`${prefix}/#project`}>
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
                  <Link href={`${prefix}/#news`}>
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
                <div className={styles.rightGroupA}>
                  <Link href={`${prefix}/about#citizenscience`}><p className={styles.menuTextLeft} onClick={onClose}>{t.whatIsCS}</p></Link>
                  {/* currentLangが'en'でない場合のみ、csExamplesを表示 */}
                  {currentLang !== 'en' && (
                    <Link href={`${prefix}/about#examples`}><p className={styles.menuTextLeft} onClick={onClose}>{t.csExamples}</p></Link>
                  )}
                  <Link href={`${prefix}/about#research-area`}><p className={styles.menuTextLeft} onClick={onClose}>{t.ourResearch}</p></Link>
                </div>

                <div 
                  className={`${styles.rightGroupB} ${currentLang === 'en' ? styles.rightGroupB_en : ''}`}
                >
                  <Link href={`${prefix}/research`}><p className={`${styles.menuTextLeft} ${isActive(`${prefix}/research`) ? styles.active : ""}`} onClick={onClose}>{t.papers}</p></Link>
                  <Link href={`${prefix}/conference`}><p className={`${styles.menuTextLeft} ${isActive(`${prefix}/conference`) ? styles.active : ""}`} onClick={onClose}>{t.conference}</p></Link>
                  <Link href={`${prefix}/book`}><p className={`${styles.menuTextLeft} ${isActive(`${prefix}/book`) ? styles.active : ""}`} onClick={onClose}>{t.books}</p></Link>
                  <Link href={`${prefix}/award`}><p className={`${styles.menuTextLeft} ${isActive(`${prefix}/award`) ? styles.active : ""}`} onClick={onClose}>{t.awards}</p></Link>
                  <Link href={`${prefix}/lecture`}><p className={`${styles.menuTextLeft} ${isActive(`${prefix}/lecture`) ? styles.active : ""}`} onClick={onClose}>{t.lectures}</p></Link>
                </div>

              </div>

              {/* 言語スイッチ */}
              <div className={styles.rightColum2}>
                <div className={styles.rightcolumn2_top} style={{ gap: currentLang === 'en' ? '72.8px' : '50px' }}>
                  <div className={styles.modalLangSwitch}>
                    {/* ▼▼▼ 修正箇所 2：言語切り替えボタンのパス修正 ▼▼▼ */}
                    <a
                      href={basePath ? `/${basePath}` : '/'}
                      className={`${styles.langLink} ${
                        currentLang === "jp" ? styles.activeLang : ""
                      }`}
                      onClick={(e) => handleLangSwitch(e, basePath ? `/${basePath}` : '/')}
                    >
                      <p className={styles.langText}>JP</p>
                    </a>
                    <span className={styles.langSlash}>/</span>
                    <a
                      href={basePath ? `/en/${basePath}` : '/en'}
                      className={`${styles.langLink} ${
                        currentLang === "en" ? styles.activeLang : ""
                      }`}
                      onClick={(e) => handleLangSwitch(e, basePath ? `/en/${basePath}` : '/en')}
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