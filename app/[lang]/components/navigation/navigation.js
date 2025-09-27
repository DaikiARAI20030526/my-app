"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./navigation.module.css";

// 改行を反映させるヘルパー関数（text が undefined の場合は空文字列を使用）
function formatTextWithLineBreaks(text) {
  return (text || "").split("\n").map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index !== array.length - 1 && <br />}
    </React.Fragment>
  ));
}

export default function Navigation({
  navicopy,
  naviname,
  naviexplanation,
  link,
  imagePath,
  imageHoverPath,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={link} legacyBehavior>
      <a
        className={styles.navigation}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.navigation_inner}>
          <div className={styles.navigation_text_container}>
            <div className={styles.navigation_copy_div}>
              {/* navicopy にも font-stretched を追加 */}
              <span className={`${styles.navigation_copy} font-stretched`}>
                {navicopy}
              </span>
            </div>
            <div className={styles.navigation_main_div}>
              <div className={styles.navigation_text_info}>
                {/* naviname にも font-stretched を追加 */}
                <div className={`${styles.navigation_name} font-stretched`}>
                  {naviname}
                </div>
                {/* naviexplanation にも font-stretched を追加 */}
                <span className={`${styles.navigation_explanation} font-stretched`}>
                  {formatTextWithLineBreaks(naviexplanation)}
                </span>
              </div>
              {imagePath && imageHoverPath && (
                <div className={styles.navigation_image_div}>
                  <img
                    src={isHovered ? imageHoverPath : imagePath}
                    alt="Navigation icon"
                    className={styles.navigation_img}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles._line} />
      </a>
    </Link>
  );
}
