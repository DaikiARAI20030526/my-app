"use client";

import React from "react";
import styles from "./artname.module.css";

export default function ArtName({ groupNumber, rssCount, dotsCount }) {
  // 1〜9グループ分のアート名テキストを定義（例としてサンプルテキスト）
  const artNames = [
    { title: "鳥獣戯画 CHOU JUGIGA" },
    { title: "シチズンサイエンス研究センター CSRC" },
    { title: "日本 JAPAN" },
    { title: "鳥獣戯画 CHOU JUGIGA" },
    { title: "鳥獣戯画 CHOU JUGIGA" },
    { title: "鳥獣戯画 CHOU JUGIGA" },
    { title: "鳥獣戯画 CHOU JUGIGA" },
    { title: "シチズンサイエンス研究センター CSRC" },
    { title: "福岡県 FUKUOKA" },
  ];

  // groupNumber が1〜9でなければデフォルトで1を使用
  const index = groupNumber >= 1 && groupNumber <= 9 ? groupNumber - 1 : 0;
  const { title } = artNames[index];

  // rssCount と dotsCount が未定義の場合は 0 を使用
  const effectiveRssCount = rssCount !== undefined ? rssCount : 0;
  const effectiveDotsCount = dotsCount !== undefined ? dotsCount : 0;

  return (
    <div className={styles.artNameContainer}>
      <p className={styles.titleText}>{title}</p>
      <p className={styles.subtitleText}>
        {effectiveRssCount}/{effectiveDotsCount}
      </p>
    </div>
  );
}
