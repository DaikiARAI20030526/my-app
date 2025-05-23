// "use client";

import '../globals.css';  // グローバルCSSの読み込み
import ResearchStickyHeader from "../components/ResearchStickyHeader/ResearchStickyHeader";
import Subtitle from "../components/subtitle/subtitle";
import Ex from "../components/ex/ex";
import styles from "./page.module.css";

// Next.js で ISR を使う場合の再生成時間
export const revalidate = 60;

export default function AboutPage() {
  // それぞれの Subtitle に対応するタイトル文字列を定義
  const title1 = "シチズンサイエンスってなに？";
  const title2 = "実例でみるシチズンサイエンス";
  const title3 = "当センターの研究領域";

  return (
    <main>
      {/* ResearchStickyHeader に複数のタイトルと、各 subtitle の id を配列で渡す */}
      <ResearchStickyHeader
        pageTitles={[title1, title2, title3]}
        subtitleIds={["subtitle1", "subtitle2", "subtitle3"]}
      />

      {/* --- 1つ目のセクション --- */}
      <div id="citizenscience" className={styles.anchorSection}>
        {/* Subtitle コンポーネントに title と id を指定 */}
        <Subtitle title={title1} id="subtitle1" />
        <div className={`${styles.text1} font-stretched`}>
          シチズンサイエンス（市民科学）とは、研究者などの専門家と市民が協力して行う科学的な研究活動を意味します。この活動は、専門家が主導する場合もあれば、市民が主体となって進める場合もあり、その形態は多様です。1990年代に概念として確立されて以降、科学的な知見の創出や地域課題の解決など、幅広い目的で展開されています.<br/><br/>
          シチズンサイエンスの対象となる学問領域は、自然科学から人文・社会科学まで多岐にわたります。たとえば、生物の生態調査や天体観測といった自然科学分野だけでなく、地域の歴史調査や社会問題に関する研究など、人文・社会科学分野でも活発に行われています。近年では、デジタル技術の発展により、オンラインを通じた参加も可能になり、より多様な形での市民参加が実現しています.<br/><br/>
          シチズンサイエンスへの市民の関わり方には様々なレベルがあります。市民がデータ収集や分類に協力する形態（貢献型）が一般的ですが、それにとどまらず、研究テーマの設定や方法の検討、データ分析、さらには成果の公開まで、研究プロセス全体に市民が深く関与する形態（協働型・共創型）も増えています。さらに、市民だけで自主的に研究活動を行う独立型も、シチズンサイエンスの重要な形態として認識されています.<br/><br/>
          このように、地域や企業との連携を基盤としながら、実践的な課題解決と理論的な研究の両面から、シチズンサイエンスの発展に寄与することを目指しています.<br/><br/>
          <div className={styles.line}></div>
        </div>
      </div>

      {/* --- 2つ目のセクション --- */}
      <div id="examples" className={styles.anchorSection}>
        <Subtitle title={title2} id="subtitle2" />
        <div className={`${styles.text1} font-stretched`}>
          <Ex />
          <div className={styles.line}></div>
        </div>
      </div>

      {/* --- 3つ目のセクション --- */}
      <div id="researcharea" className={styles.anchorSection}>
        <Subtitle title={title3} id="subtitle3" />
        <div className={`${styles.text2} font-stretched`}>
          シチズンサイエンス研究センターは、市民と研究者の協働による知的生産に関する研究を推進し、市民の研究参加を支援する方法の創出と支援基盤の構築を通じて、シチズンサイエンスの発展に寄与することを目的としています。私たちは、職業研究者に限らず、様々なひとが自身の好奇心を活かして研究活動や探究活動に取り組める社会の実現を目指しています.<br/><br/>
          当センターは、商学部に設置された研究組織として、シチズンサイエンスにおけるマネジメントとマーケティングの課題解決に重点を置いた研究を展開しています。シチズンサイエンスの実践において、効果的な広報戦略の立案、研究者・行政・企業等との連携構築、プロジェクトマネジメント、持続可能な資金調達モデルの確立など、運営面での課題が数多く存在します.<br/><br/>
          また、当センターでは多様な分野で活躍するシチズンサイエンティストや研究者を客員研究員として迎え、学際的な研究活動を推進しています。市民主体の研究実践者として豊富な経験を持つシチズンサイエンティストとともに、コミュニティマネジメント、科学教育、プラットフォーム開発、老年学など、幅広い分野の専門家との協働を通じて、シチズンサイエンスの可能性を多角的に探究しています.<br/><br/>
          <div className={styles.line2}></div>
        </div>
      </div>
    </main>
  );
}
