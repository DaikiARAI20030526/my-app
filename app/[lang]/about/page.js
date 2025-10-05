"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import '../../globals.css';
import ResearchStickyHeader from "../components/ResearchStickyHeader/ResearchStickyHeader";
import Subtitle from "../components/subtitle/subtitle";
import Ex from "../components/ex/ex";
import styles from "./page.module.css";

const content = {
  jp: {
    title1: "シチズンサイエンスってなに？",
    title2: "実例でみるシチズンサイエンス",
    title3: "当センターの研究領域",
    section1_text: [
      "シチズンサイエンス（市民科学）とは、研究者などの専門家と市民が協力して行う科学的な研究活動を意味します。この活動は、専門家が主導する場合もあれば、市民が主体となって進める場合もあり、その形態は多様です。1990年代に概念として確立されて以降、科学的な知見の創出や地域課題の解決など、幅広い目的で展開されています。",
      "シチズンサイエンスの対象となる学問領域は、自然科学から人文・社会科学まで多岐にわたります。たとえば、生物の生態調査や天体観測といった自然科学分野だけでなく、地域の歴史調査や社会問題に関する研究など、人文・社会科学分野でも活発に行われています。近年では、デジタル技術の発展により、オンラインを通じた参加も可能になり、より多様な形での市民参加が実現しています。",
      "シチズンサイエンスへの市民の関わり方には様々なレベルがあります。市民がデータ収集や分類に協力する形態（貢献型）が一般的ですが、それにとどまらず、研究テーマの設定や方法の検討、データ分析、さらには成果の公開まで、研究プロセス全体に市民が深く関与する形態（協働型・共創型）も増えています。さらに、市民だけで自主的に研究活動を行う独立型も、シチズンサイエンスの重要な形態として認識されています。",
      "このように、地域や企業との連携を基盤としながら、実践的な課題解決と理論的な研究の両面から、シチズンサイエンスの発展に寄与することを目指しています。"
    ],
    // ▼▼▼ section3_text を段落ごとの配列に変更 ▼▼▼
    section3_text: [
        "シチズンサイエンス研究センターは、市民と研究者の協働による知的生産に関する研究を推進し、市民の研究参加を支援する方法の創出と支援基盤の構築を通じて、シチズンサイエンスの発展に寄与することを目的としています。私たちは、職業研究者に限らず、様々なひとが自身の好奇心を活かして研究活動や探究活動に取り組める社会の実現を目指しています。",
        "当センターは、商学部に設置された研究組織として、シチズンサイエンスにおけるマネジメントとマーケティングの課題解決に重点を置いた研究を展開しています。シチズンサイエンスの実践において、効果的な広報戦略の立案、研究者・行政・企業等との連携構築、プロジェクトマネジメント、持続可能な資金調達モデルの確立など、運営面での課題が数多く存在します。",
        "また、当センターでは多様な分野で活躍するシチズンサイエンティストや研究者を客員研究員として迎え、学際的な研究活動を推進しています。市民主体の研究実践者として豊富な経験を持つシチズンサイエンティストとともに、コミュニティマネジメント、科学教育、プラットフォーム開発、老年学など、幅広い分野の専門家との協働を通じて、シチズンサイエンスの可能性を多角的に探究しています。"
    ]
  },
  en: {
    title1: "What is Citizen Science?",
    title2: "Citizen Science in Practice",
    title3: "Research Areas of Our Center",
    section1_text: [
        "Citizen science is scientific research conducted through collaboration between professional researchers and members of the public. Projects can take many forms; some are led by experts, while others are initiated and driven by participants themselves. Since the concept was established in the 1990s, it has been applied to a wide range of goals, from generating new scientific knowledge to solving local community problems.",
        "Citizen science spans a wide range of academic fields, from the natural sciences to the humanities and social sciences. While common in the natural sciences—for example, in wildlife monitoring and astronomical observation—it is also actively applied in the humanities and social sciences, with projects on local history and social issues. Recent advances in digital technology have also enabled online participation, opening the door to even more diverse forms of public engagement.",
        "Public involvement in Citizen Science also varies in depth. The contributory model, in which participants assist with tasks such as data collection and classification, is common. However, more collaborative and co-creative models—where participants take part in setting research questions, designing methods, analyzing data, and even publishing results—are increasingly widespread. In addition, independent initiatives, where participants organize and conduct research autonomously, represent another vital approach within Citizen Science.",
        "Through these diverse approaches, Citizen Science aims to advance both practical problem-solving and theoretical research, grounded in collaboration with local communities and industry."
    ],
    // ▼▼▼ section3_text を段落ごとの配列に変更 ▼▼▼
    section3_text: [
        "The Citizen Science Research Center at Fukuoka University's Faculty of Commerce aims to advance the field of Citizen Science. We do this by promoting research on collaborative knowledge creation between the public and researchers, and developing methods and infrastructure to support public participation in research. Our vision is a society where anyone, not just professional researchers, can pursue their curiosity through research and inquiry.",
        "As a research organization within the Faculty of Commerce, our center focuses on addressing the management and marketing challenges inherent in Citizen Science. The practice of Citizen Science involves numerous operational hurdles, and our research addresses these, including: developing effective outreach strategies, building partnerships with academic, government, and corporate sectors, ensuring strong project management, and establishing sustainable funding models.",
        "Additionally, our center fosters interdisciplinary research by welcoming Citizen Scientists and professional researchers from diverse fields as visiting fellows. We collaborate with experienced citizen-led research practitioners and experts in fields such as community management, science education, platform development, and gerontology. Together, we explore the full potential of Citizen Science from multiple perspectives."
    ]
  },
};

export default function AboutPage() {
  const params = useParams();
  const lang = params.lang || 'jp';
  const t = content[lang] || content['jp'];

  const pageTitles = lang === 'en' 
    ? [t.title1, t.title3] 
    : [t.title1, t.title2, t.title3];
    
  const subtitleIds = lang === 'en' 
    ? ["subtitle1", "subtitle3"] 
    : ["subtitle1", "subtitle2", "subtitle3"];

  return (
    <main>
      <ResearchStickyHeader
        pageTitles={pageTitles}
        subtitleIds={subtitleIds}
      />

      <div id="citizenscience" className={styles.anchorSection}>
        <Subtitle title={t.title1} id="subtitle1" />
        <div className={`${styles.text1} font-stretched`}>
          {t.section1_text.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
          <div className={styles.line}></div>
        </div>
      </div>

      {lang !== 'en' && (
        <div id="examples" className={styles.anchorSection}>
          <Subtitle title={t.title2} id="subtitle2" />
          <div className={`${styles.text1} font-stretched`}>
            <Ex />
            <div className={styles.line}></div>
          </div>
        </div>
      )}

      <div id="researcharea" className={styles.anchorSection}>
        <Subtitle title={t.title3} id="subtitle3" />
        {/* ▼▼▼ レンダリング方法を <p> タグでのマッピングに変更 ▼▼▼ */}
        <div className={`${styles.text2} font-stretched`}>
          {t.section3_text.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
          <div className={styles.line2}></div>
        </div>
      </div>
    </main>
  );
}