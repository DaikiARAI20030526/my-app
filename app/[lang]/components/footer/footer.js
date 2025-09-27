"use client";

import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* 左側 */}
        <div className={styles.footerLeft}>
          {/* シチズンサイエンスについて */}
          <div className={`${styles.footerBlock} ${styles.citizenscienceBlock}`}>
            <Link href="/about" className={styles.title}>
              シチズンサイエンスについて
            </Link>
            <Link href="/about#citizenscience" className={styles.text}>
              シチズンサイエンスってなに？
            </Link>
            <Link href="/about#examples" className={styles.text}>
              実例でみるシチズンサイエンス
            </Link>
            <Link href="/about#research-area" className={styles.text}>
              当センターの研究領域
            </Link>
          </div>

          {/* 研究業績 */}
          <div className={styles.footerBlock}>
            <Link href="/research" className={styles.title}>
              研究業績
            </Link>
            <Link href="/research" className={styles.text}>
              論文
            </Link>
            <Link href="/conference" className={styles.text}>
              学会発表
            </Link>
            <Link href="/book" className={styles.text}>
              書籍
            </Link>
            <Link href="/award" className={styles.text}>
              受賞
            </Link>
            <Link href="/lecture" className={styles.text}>
              講演
            </Link>
          </div>

          {/* 研究員について */}
          <div className={styles.footerBlock}>
            <Link href="/member" className={styles.title}>
              研究員について
            </Link>
            <Link href="/top#project" className={styles.text}>
              進行中のプロジェクト
            </Link>
            <Link href="/top#news" className={styles.text}>
              お知らせ
            </Link>
          </div>
        </div>

        {/* 右側（連絡先と画像を左右端に配置） */}
        <div className={styles.footerRight}>
          <div className={styles.footerRightText}>
            <p className={styles.text}>〒814-0180</p>
            <p className={styles.text}>福岡県福岡市城南区七隈8丁目19-1</p>
            <p className={styles.text}>
              福岡大学 商学部 経営学科　森田泰暘 研究室内
            </p>
            <p className={styles.text}>
              Tel : 092-871-6631 / Mail : ymorita@fukuoka-u.ac.jp
            </p>
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
