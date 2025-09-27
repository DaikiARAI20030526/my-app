// "use client";

import React from 'react';
import '../../../globals.css';
import ResearchStickyHeader from "../components/ResearchStickyHeader/ResearchStickyHeader";
import Subtitle from "../components/subtitle/subtitle";
import Ex from "../components/ex/ex";
import styles from "./page.module.css";

// Next.js で ISR を使う場合の再生成時間
export const revalidate = 60;

// 1. 言語ごとのテキストを定義
const content = {
  jp: {
    title1: "シチズンサイエンスってなに？",
    title2: "実例でみるシチズンサイエンス",
    title3: "当センターの研究領域",
    section1_text: "シチズンサイエンス（市民科学）とは、研究者などの専門家と市民が協力して行う科学的な研究活動を意味します...",
    section3_text: "シチズンサイエンス研究センターは、市民と研究者の協働による知的生産に関する研究を推進し...",
  },
  en: {
    title1: "What is Citizen Science?",
    title2: "Citizen Science in Practice",
    title3: "Our Research Area",
    section1_text: "Citizen science refers to scientific research activities conducted in collaboration with experts such as researchers and citizens...",
    section3_text: "The Citizen Science Research Center aims to contribute to the development of citizen science...",
  },
};

// 2. ページのpropsで `params` を受け取る
export default function AboutPage({ params: { lang } }) {
  // 3. URLの言語パラメータ（jp or en）に応じてテキストを選択
  const t = content[lang] || content['jp']; // langが存在しない場合は日本語をデフォルトに

  return (
    <main>
      <ResearchStickyHeader
        pageTitles={[t.title1, t.title2, t.title3]}
        subtitleIds={["subtitle1", "subtitle2", "subtitle3"]}
      />

      {/* --- 1つ目のセクション --- */}
      <div id="citizenscience" className={styles.anchorSection}>
        <Subtitle title={t.title1} id="subtitle1" />
        <div className={`${styles.text1} font-stretched`}>
          {/* 4. 選択された言語のテキストを表示 */}
          {t.section1_text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
          <div className={styles.line}></div>
        </div>
      </div>

      {/* --- 2つ目のセクション --- */}
      <div id="examples" className={styles.anchorSection}>
        <Subtitle title={t.title2} id="subtitle2" />
        <div className={`${styles.text1} font-stretched`}>
          <Ex />
          <div className={styles.line}></div>
        </div>
      </div>

      {/* --- 3つ目のセクション --- */}
      <div id="researcharea" className={styles.anchorSection}>
        <Subtitle title={t.title3} id="subtitle3" />
        <div className={`${styles.text2} font-stretched`}>
          {t.section3_text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
          <div className={styles.line2}></div>
        </div>
      </div>
    </main>
  );
}