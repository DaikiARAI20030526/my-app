// ex.js
"use client";
import React, { useState } from 'react';
import Carousel from './carousel';  // 先ほどのカルーセルコンポーネント
import Introduction from './introduction';          // 上記のテキスト表示コンポーネント
import styles from './ex.module.css';

const ex = () => {
    // 現在表示している写真のインデックスを管理する state を作成
    const [currentIndex, setCurrentIndex] = useState(0);
  
    return (
      <div className={styles.pageContainer}>
        <div className={styles.left}>
          {/* currentIndex を props として渡す */}
          <Introduction currentIndex={currentIndex} />
        </div>
        <div className={styles.right}>
          {/* currentIndex と setCurrentIndex を props として渡す */}
          <Carousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        </div>
      </div>
    );
  };
  
  export default ex;