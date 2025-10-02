"use client";

import { useRouter, usePathname } from "next/navigation"; // usePathname をインポート
import { useState } from "react";
import styles from "./title.module.css";

export default function Title({ headline }) {
  const router = useRouter();
  const pathname = usePathname(); // pathname を取得
  const [isHovered, setIsHovered] = useState(false);

  // 1. URLから現在の言語を取得
  const segments = pathname.split('/');
  const currentLang = segments[1] || 'jp';

  const handleBackClick = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div className={styles.title}>
      <div className={styles.titleinner_top}></div>
      <div className={styles.titleinner}>
        <div className={styles.titleinner_back}>
          <a
            href="#"
            onClick={handleBackClick}
            className={styles.backLink}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={isHovered ? "/jump2.png" : "/jump.png"}
              alt="戻る"
              className={styles.backImg}
            />
            {/* 2. 言語に応じてテキストを動的に表示 */}
            <span className={styles.backText}>
              {currentLang === 'en' ? 'Back' : 'もどる'}
            </span>
          </a>
        </div>
        <div className={styles.titleinner_title}>{headline}</div>
      </div>
    </div>
  );
}
