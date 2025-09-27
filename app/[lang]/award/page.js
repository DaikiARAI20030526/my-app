import { microcmsClient } from '@/lib/microcmsClient';
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";
import styles from "./page.module.css"; 

export const revalidate = 60;

export default async function AwardPage() {
  // "award" slug を持つコンテンツを取得
  const data = await microcmsClient.get({
    endpoint: 'citizen', // microCMS のエンドポイント名に合わせてください
    queries: {
      filters: 'slug[equals]award',
      limit: 100,
    },
  });

  const contents = data.contents || [];

  if (contents.length === 0) {
    return <p style={{ padding: '20px' }}>まだデータがありません</p>;
  }

  // 各 award2 の title を抽出し、配列を作成（空でないもののみ）
  const awardTitles = contents
    .filter(item => item.award2 && item.award2.title)
    .map(item => item.award2.title);

  return (
    <>
      {/* DynamicStickyHeader を上部に配置 */}
      <DynamicStickyHeader titleArray={awardTitles} />

      {contents.map((item) => {
        const { award2 } = item;
        if (!award2) {
          return (
            <div key={item.id}>
              <p>award グループがありません</p>
            </div>
          );
        }

        // award2 の各項目を分割代入
        const { title, awardname, awardcategory, societyname, author, awarddate } = award2;

        return (
          <div key={item.id} className={styles.award}>
            <div className={styles.award_inner}>
              {/* 左カラム */}
              <div className={styles.award_inner_left}>
                {/* タイトル部分：ここに dynamicTitle クラスとユニークな id を付与 */}
                <div id={`awardTitle-${item.id}`} className="dynamicTitle">
                <div className={styles.award_inner_left_award}>
                  <p className={styles.award_inner_left_awardname}>{awardname}</p>
                  <p className={styles.award_inner_left_title}>{title}</p>
                </div>
                </div>
                <div className={styles.award_inner_left_awardcategory}>
                  <k>受賞区分</k>
                  <p>{awardcategory}</p>
                </div>
              </div>
              {/* 右カラム */}
              <div className={styles.award_inner_right}>
                <div className={styles.award_inner_right_author}>
                  <k>受賞者</k>
                  {Array.isArray(author) && author.length > 0 && (
                    <div className={styles.award_inner_right_authors}>
                      {author.map((authorItem, index) => (
                        <div key={index} className={styles.authorRow}>
                          <p>{authorItem?.aboutauthor}</p>
                          <p>{authorItem?.separator}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.award_inner_right_societyname}>
                  <k>学会名</k>
                  <p>{societyname}</p>
                </div>
                <div className={styles.award_inner_right_awarddate}>
                  <k>受賞日</k>
                  <p>{awarddate}</p>
                </div>
              </div>
            </div>
            <div className={styles.award_bottomline}></div>
          </div>
        );
      })}
    </>
  );
}
