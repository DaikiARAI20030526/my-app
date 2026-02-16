"use client";

import { useRouter, usePathname } from "next/navigation";
import styles from "./title.module.css";

export default function Title({ headline }) {
  const router = useRouter();
  const pathname = usePathname();

  // URLから現在の言語を取得（/en スタートかどうかで判定）
  const isEnglish = pathname.startsWith('/en');
  
  const handleBackClick = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div className={styles.title}>
      {/* 必要であれば titleinner_top を残す */}
      <div className={styles.titleinner_top}></div>
      
      <div className={styles.titleinner}>
        <div className={styles.titleinner_back}>
          <a
            href="#"
            onClick={handleBackClick}
            className={styles.backLink}
          >
            {/* 画像は1枚固定。ホバー時の色はCSSで制御します */}
            <img
              src="/jump.png" 
              alt="戻る"
              className={styles.backImg}
            />
            <span className={styles.backText}>
              {isEnglish ? 'Back' : 'もどる'}
            </span>
          </a>
        </div>
        <div className={styles.titleinner_title}>{headline}</div>
      </div>
    </div>
  );
}