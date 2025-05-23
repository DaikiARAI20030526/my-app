"use client";
import React from "react";
import styles from "./projectcard.module.css";

export default function ProjectCard({ date, title, imageUrl, link }) {
  // API から渡された日付文字列を Date オブジェクトに変換
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);

  // 日本語形式に変換（曜日は不要）
  // 数字部分は13px、"年"・"月"・"日"は11px
  const displayDate = (
    <>
      <span style={{ fontSize: "13px" }}>{year}</span>
      <span style={{ fontSize: "11px" }}>年</span>
      <span style={{ fontSize: "13px" }}>{month}</span>
      <span style={{ fontSize: "11px" }}>月</span>
      <span style={{ fontSize: "13px" }}>{day}</span>
      <span style={{ fontSize: "11px" }}>日</span>
    </>
  );

  // タイトルの先頭8文字を削除
  const modifiedTitle = title.substring(8);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.projectcard_link}
    >
      <div className={styles.projectcard}>
        <div className={styles.cardinner}>
          {/* テキスト要素を左側に配置 */}
          <div className={styles.cardinner_left}>
            <div className={styles.date}>{displayDate}</div>
            <div className={styles.title}>{modifiedTitle}</div>
          </div>
          {/* 画像を右側に配置 */}
          <div className={styles.cardinner_right}>
            <img src={imageUrl} alt="media:thumbnail" />
          </div>
        </div>
        <div className={styles.line}></div>
      </div>
    </a>
  );
}
