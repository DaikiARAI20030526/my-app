"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./footer.module.css";

// 1. 全てのテキストを言語ごとに定義
const content = {
  jp: {
    aboutTitle: "シチズンサイエンスについて",
    aboutItem1: "シチズンサイエンスってなに？",
    aboutItem2: "実例でみるシチズンサイエンス",
    aboutItem3: "当センターの研究領域",
    researchTitle: "研究業績",
    researchItem1: "論文",
    researchItem2: "学会発表",
    researchItem3: "書籍",
    researchItem4: "受賞",
    researchItem5: "講演",
    memberTitle: "研究員について",
    memberItem1: "お知らせ",
    memberItem2: "進行中のプロジェクト",
    address1: "〒814-0180",
    address2: "福岡県福岡市城南区七隈8丁目19-1",
    address3: "福岡大学 商学部 経営学科　森田泰暘 研究室内",
    address4: "Tel : 092-871-6631 / Mail : ymorita@fukuoka-u.ac.jp",
  },
  en: {
    aboutTitle: "About Citizen Science",
    aboutItem1: "What is Citizen Science?",
    aboutItem2: "Examples in Practice",
    aboutItem3: "Research Area of Our Center",
    researchTitle: "Research",
    researchItem1: "Papers",
    researchItem2: "Conferences",
    researchItem3: "Books",
    researchItem4: "Awards",
    researchItem5: "Lectures",
    memberTitle: "About Research Members",
    memberItem1: "News",
    memberItem2: "Ongoing Projects",
    address1: "814-0180",
    address2: "8-19-1 Nanakuma, Jonan-ku, Fukuoka-shi, Fukuoka",
    address3: "c/o Yasuaki Morita's Office, Faculty of Commerce, Fukuoka University",
    address4: "Tel : +81-92-871-6631 / Mail : ymorita@fukuoka-u.ac.jp",
  },
};

export default function Footer() {
  const pathname = usePathname();
  
  // ▼▼▼ 修正箇所 1: 言語判定とプレフィックスの設定 ▼▼▼
  // URLが /en で始まっているかで判定
  const isEnglish = pathname.startsWith('/en');
  const currentLang = isEnglish ? 'en' : 'jp';

  // リンクの頭につける文字
  // 英語なら "/en", 日本語なら "" (空文字) にする
  const prefix = isEnglish ? '/en' : '';
  
  const t = content[currentLang] || content.jp;

  // ▼▼▼ 修正箇所 2: リンク生成部分を ${prefix} を使う形に変更 ▼▼▼
  const aboutItems = isEnglish
    ? [ // 英語ページの場合
        { label: t.aboutItem1, href: `${prefix}/about#citizenscience` },
        { label: t.aboutItem3, href: `${prefix}/about#researcharea` },
      ]
    : [ // 日本語ページの場合
        { label: t.aboutItem1, href: `${prefix}/about#citizenscience` },
        { label: t.aboutItem2, href: `${prefix}/about#examples` },
        { label: t.aboutItem3, href: `${prefix}/about#researcharea` },
      ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* 左側 */}
        <div className={styles.footerLeft}>
          {/* シチズンサイエンスについて */}
          <div className={`${styles.footerBlock} ${styles.citizenscienceBlock}`}>
            <Link href={`${prefix}/about`} className={styles.title}>
              {t.aboutTitle}
            </Link>
            {aboutItems.map((item) => (
              <Link key={item.href} href={item.href} className={styles.text}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* 研究業績 */}
          <div className={styles.footerBlock}>
            <Link href={`${prefix}/research`} className={styles.title}>
              {t.researchTitle}
            </Link>
            <Link href={`${prefix}/research`} className={styles.text}>
              {t.researchItem1}
            </Link>
            <Link href={`${prefix}/conference`} className={styles.text}>
              {t.researchItem2}
            </Link>
            <Link href={`${prefix}/book`} className={styles.text}>
              {t.researchItem3}
            </Link>
            <Link href={`${prefix}/award`} className={styles.text}>
              {t.researchItem4}
            </Link>
            <Link href={`${prefix}/lecture`} className={styles.text}>
              {t.researchItem5}
            </Link>
          </div>

          {/* 研究員について */}
          <div className={styles.footerBlock}>
            <Link href={`${prefix}/member`} className={styles.title}>
              {t.memberTitle}
            </Link>
            {/* トップページへのアンカーリンク */}
            {/* prefixが空の場合は "/#news"、英語の場合は "/en/#news" となる */}
            <Link href={`${prefix}/#news`} className={styles.text}>
              {t.memberItem1}
            </Link>
            <Link href={`${prefix}/#project`} className={styles.text}>
              {t.memberItem2}
            </Link>
          </div>
        </div>

        {/* 右側 */}
        <div className={styles.footerRight}>
          <div className={styles.footerRightText}>
            <p className={styles.text}>{t.address1}</p>
            <p className={styles.text}>{t.address2}</p>
            <p className={styles.text}>{t.address3}</p>
            <p className={styles.text}>{t.address4}</p>
          </div>
          <div className={styles.imageContainer}>
            <Link href="https://note.com/csrc" target="_blank" rel="noopener noreferrer">
              <img
                src="/icon.png"
                alt="アイコン"
                className={styles.iconImage}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.footerinner_under}>
        <p className={styles.copyRight}>
          COPYRIGHT © FUKUOKA UNIVERSITY. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}