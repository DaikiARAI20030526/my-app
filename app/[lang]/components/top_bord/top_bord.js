"use client";
import React from "react";
import styles from "./top_bord.module.css";

export default function TopBord({ bordname, notelink }) {
  return (
    <div className={styles.topBord}>
      <div className={styles.inner}>
        <span className={`${styles.bordname} font-stretched`}>
          {bordname}
        </span>
        <a
          href="https://note.com/csrc"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.notelink} font-stretched`}
        >
          {notelink}
        </a>
      </div>
    </div>
  );
}
