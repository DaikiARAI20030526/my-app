"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./title.module.css";

export default function Title({ headline }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

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
            <span className={styles.backText}>もどる</span>
          </a>
        </div>
        <div className={styles.titleinner_title}>{headline}</div>
      </div>
    </div>
  );
}
