"use client";

import React from 'react';
import styles from './carousel.module.css';

const Carousel = ({ currentIndex, setCurrentIndex }) => {
  const images = [
    '/about_1.webp',
    '/about_2.png',
    '/about_3.jpg',
    '/about_4.webp',
    '/about_5.jpg',
  ];

  // 「前へ」ボタンを押したときの処理
  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  };

  // 「次へ」ボタンを押したときの処理
  const goToNext = () => {
    setCurrentIndex(
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className={styles.carouselContainer}>
      {/* 画像表示部分 */}
      <div className={styles.carousel}>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className={styles.image}
        />
      </div>

      {/* コントロール部分 */}
      <div className={styles.controls}>
        {/* 左の矢印ボタン */}
        <button
          onClick={goToPrevious}
          className={`${styles.arrowButton} ${styles.arrowLeft}`}
        >
          ←
        </button>

        {/* 中央の写真番号 */}
        <div className={styles.photoNumber}>
          {currentIndex + 1} / {images.length}
        </div>

        {/* 右の矢印ボタン */}
        <button
          onClick={goToNext}
          className={`${styles.arrowButton} ${styles.arrowRight}`}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Carousel;
