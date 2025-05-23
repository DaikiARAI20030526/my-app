"use client";

import React from "react";
import styles from "./newscard.module.css";

export default function Newscard({ date, title, link }) {
  // Date オブジェクトに変換（受け取る date は "Sun, 02 Mar 2025 17:58:48 +0900" 等）
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);

  // 数字部分を1px大きく、"年", "月", "日" を1px小さく表示する
  const displayDate = (
    <>
      <span style={{ fontSize: "13px" }} className="font-stretched">{year}</span>
      <span style={{ fontSize: "11px" }} className="font-stretched">年</span>
      <span style={{ fontSize: "13px" }} className="font-stretched">{month}</span>
      <span style={{ fontSize: "11px" }} className="font-stretched">月</span>
      <span style={{ fontSize: "13px" }} className="font-stretched">{day}</span>
      <span style={{ fontSize: "11px" }} className="font-stretched">日</span>
    </>
  );

  // タイトルの先頭5文字を削除
  const modifiedTitle = title.substring(5);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.newscard}
    >
      <div className={styles.newscard_inner}>
        <div className={styles.newscard_inner_left}>
          <div className={styles.newscard_inner_left_date}>{displayDate}</div>
          <div className={`${styles.newscard_inner_left_title} font-stretched`}>
            {modifiedTitle}
          </div>
        </div>
      </div>
      <div className={styles._line}></div>
    </a>
  );
}
