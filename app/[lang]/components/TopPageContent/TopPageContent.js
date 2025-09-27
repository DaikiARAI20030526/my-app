"use client";

import React, { useState } from "react";
import CanvasArt from "../canvasart/canvasart";
import ArtName from "../artname/artname";
import styles from "./TopPageContent.module.css";

export default function TopPageContent() {
  // 状態として、groupNumber, rssCount, dotsCount を管理
  const [groupNumber, setGroupNumber] = useState(null);
  const [rssCount, setRssCount] = useState(0);
  const [dotsCount, setDotsCount] = useState(0);

  // CanvasArt からグループ番号と dotsCount を通知するコールバック
  const handleGroupChange = (newGroup, newDotsCount) => {
    setGroupNumber(newGroup);
    setDotsCount(newDotsCount);
  };

  // CanvasArt から RSS 配列の長さを通知するコールバック
  const handleRssCount = (count) => {
    setRssCount(count);
  };

  return (
    <div className={styles.topPageContent}>
      {/* CanvasArt を通常のブロック要素として配置 */}
      <div className={styles.canvasArtWrapper}>
        <CanvasArt onGroupChange={handleGroupChange} onRssCount={handleRssCount} />
      </div>

      {/* groupNumber が取得できたら ArtName を表示 */}
      {groupNumber !== null && (
        <div className={styles.artNameWrapper}>
          <ArtName
            groupNumber={groupNumber}
            rssCount={rssCount}
            dotsCount={dotsCount}
          />
        </div>
      )}
    </div>
  );
}
