import { microcmsClient } from '@/lib/microcmsClient';
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";
import styles from './page.module.css'; 

export const revalidate = 60;

export default async function ResearchPage() {
  // "research" slug を持つコンテンツを取得
  const data = await microcmsClient.get({
    endpoint: 'citizen',
    queries: {
      filters: 'slug[equals]research',
      limit: 100,
    },
  });

  const contents = data.contents || [];
  if (contents.length === 0) {
    return <p style={{ padding: '20px' }}>まだデータがありません</p>;
  }

  // 各研究カードのタイトル配列を作成（research2.title）
  const researchTitles = contents
    .filter(item => item.research2 && item.research2.title)
    .map(item => item.research2.title);

  return (
    <>
      {/* DynamicStickyHeader に researchTitles を渡す */}
      <DynamicStickyHeader titleArray={researchTitles} />

      {contents.map((item) => {
        const { research2 } = item;
        if (!research2) {
          return (
            <div key={item.id}>
              <p className="font-stretched">research グループがありません</p>
            </div>
          );
        }

        const { title, overview, magazine, publicationDate, author, url } = research2;

        return (
          <div key={item.id} className={styles.reserch}>
            <div className={styles.reserch_inner}>
              {/* 左カラム */}
              <div className={styles.reserch_inner_left}>
                {/* 研究タイトル部分：dynamicTitle クラスとユニークな id を付与 */}
                <div id={`researchTitle-${item.id}`} className="dynamicTitle">
                  <p className={`${styles.reserch_inner_left_title} font-stretched`}>{title}</p>
                </div>
                <p className={`${styles.reserch_inner_left_overview} font-stretched`}>{overview}</p>
              </div>

              {/* 右カラム */}
              <div className={styles.reserch_inner_right}>
                <div className={styles.reserch_inner_right_author}>
                <div className={`${styles.reserch_inner_caption} font-stretched`}>
                  <p>著者</p>
                  </div>
                  {Array.isArray(author) && author.length > 0 && (
                    <div className={styles.reserch_inner_right_authors}>
                      {author.map((authorItem, index) => (
                        <div key={index} className={styles.authorRow}>
                          <p className="font-stretched">{authorItem?.aboutauthor}</p>
                          <p className="font-stretched">{authorItem?.separator}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 掲載誌：2行構成（上段ラベル、下段値） */}
                <div className={styles.reserch_inner_right_magazine}>
                <div className={`${styles.reserch_inner_caption} font-stretched`}>
                    <p>掲載誌</p>
                  </div>
                  <div>
                    <p className="font-stretched">{magazine}</p>
                  </div>
                </div>
                {/* 掲載日：2行構成（上段ラベル、下段値） */}
                <div className={styles.reserch_inner_right_publicationDate}>
                <div className={`${styles.reserch_inner_caption} font-stretched`}>
                    <p>掲載日</p>
                  </div>
                  <div>
                    <p className="font-stretched">{publicationDate}</p>
                  </div>
                </div>

                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.reserch_inner_right_bottom}
                  >
                    <p className="font-stretched">
                      論文詳細はこちら
                      <br />
                      （外部リンク）
                    </p>
                    <p>→</p>
                  </a>
                ) : (
                  <div className={styles.reserch_inner_right_bottom}>
                    <p className="font-stretched">準備中</p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.reserch_bottomline}></div>
          </div>
        );
      })}
    </>
  );
}
