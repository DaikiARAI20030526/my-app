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
    memberItem1: "進行中のプロジェクト",
    memberItem2: "お知らせ",
    address1: "〒814-0180",
    address2: "福岡県福岡市城南区七隈8丁目19-1",
    address3: "福岡大学 商学部 経営学科　森田泰暘 研究室内",
    address4: "Tel : 092-871-6631 / Mail : ymorita@fukuoka-u.ac.jp",
  },
  en: {
    aboutTitle: "About Citizen Science",
    aboutItem1: "What is Citizen Science?",
    aboutItem2: "Examples in Practice",
    aboutItem3: "Our Research Area",
    researchTitle: "Research",
    researchItem1: "Papers",
    researchItem2: "Conferences",
    researchItem3: "Books",
    researchItem4: "Awards",
    researchItem5: "Lectures",
    memberTitle: "About Members",
    memberItem1: "Ongoing Projects",
    memberItem2: "News",
    address1: "814-0180",
    address2: "8-19-1 Nanakuma, Jonan-ku, Fukuoka-shi, Fukuoka",
    address3: "c/o Yasuaki Morita's Office, Faculty of Commerce, Fukuoka University",
    address4: "Tel : +81-92-871-6631 / Mail : ymorita@fukuoka-u.ac.jp",
  },
};

export default function Footer() {
  // 2. 現在の言語をURLから取得
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentLang = segments[1] || 'jp';
  const t = content[currentLang] || content.jp;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* 左側 */}
        <div className={styles.footerLeft}>
          {/* シチズンサイエンスについて */}
          <div className={`${styles.footerBlock} ${styles.citizenscienceBlock}`}>
            {/* 3. hrefとテキストを動的に設定 */}
            <Link href={`/${currentLang}/about`} className={styles.title}>
              {t.aboutTitle}
            </Link>
            <Link href={`/${currentLang}/about#citizenscience`} className={styles.text}>
              {t.aboutItem1}
            </Link>
            <Link href={`/${currentLang}/about#examples`} className={styles.text}>
              {t.aboutItem2}
            </Link>
            <Link href={`/${currentLang}/about#research-area`} className={styles.text}>
              {t.aboutItem3}
            </Link>
          </div>

          {/* 研究業績 */}
          <div className={styles.footerBlock}>
            <Link href={`/${currentLang}/research`} className={styles.title}>
              {t.researchTitle}
            </Link>
            <Link href={`/${currentLang}/research`} className={styles.text}>
              {t.researchItem1}
            </Link>
            <Link href={`/${currentLang}/conference`} className={styles.text}>
              {t.researchItem2}
            </Link>
            <Link href={`/${currentLang}/book`} className={styles.text}>
              {t.researchItem3}
            </Link>
            <Link href={`/${currentLang}/award`} className={styles.text}>
              {t.researchItem4}
            </Link>
            <Link href={`/${currentLang}/lecture`} className={styles.text}>
              {t.researchItem5}
            </Link>
          </div>

          {/* 研究員について */}
          <div className={styles.footerBlock}>
            <Link href={`/${currentLang}/member`} className={styles.title}>
              {t.memberTitle}
            </Link>
            <Link href={`/${currentLang}#project`} className={styles.text}>
              {t.memberItem1}
            </Link>
            <Link href={`/${currentLang}#news`} className={styles.text}>
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
            <Link href="https://note.com/csrc">
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
