import { microcmsClient } from '@/lib/microcmsClient';
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";
import styles from "./page.module.css"; 

export const revalidate = 60;

export default async function ConferencePage() {
  // "conference" slug を持つコンテンツを取得
  const data = await microcmsClient.get({
    endpoint: 'citizen',
    queries: {
      filters: 'slug[equals]conference',
      limit: 100,
    },
  });

  const contents = data.contents || [];
  if (contents.length === 0) {
    return <p style={{ padding: '20px' }}>まだデータがありません</p>;
  }

  // 各 conference2 の title を抽出（空でないもののみ）
  const conferenceTitles = contents
    .filter(item => item.conference2 && item.conference2.title)
    .map(item => item.conference2.title);

  return (
    <>
      {/* DynamicStickyHeader に conferenceTitles 配列を渡す */}
      <DynamicStickyHeader titleArray={conferenceTitles} />

      {contents.map((item) => {
        const { conference2 } = item;
        if (!conference2) {
          return (
            <div key={item.id}>
              <p>conference グループがありません</p>
            </div>
          );
        }
        const { title, author, societyname, proceedingsname, announcementdate } = conference2;

        return (
          <div key={item.id} className={styles.conference}>
            <div className={styles.conference_inner}>
              {/* 左カラム */}
              <div className={styles.conference_inner_left}>
                {/* タイトル部分：dynamicTitle クラスとユニークな id を付与 */}
                <div id={`conferenceTitle-${item.id}`} className="dynamicTitle">
                  <p className={styles.conference_inner_left_title}>{title}</p>
                </div>
                <div className={styles.conference_inner_left_author}>
                  <k>著者</k>
                  {Array.isArray(author) && author.length > 0 && (
                    <div className={styles.conference_inner_left_authors}>
                      {author.map((authorItem, index) => (
                        <div key={index} className={styles.authorRow}>
                          <p>{authorItem?.aboutauthor}</p>
                          <p>{authorItem?.separator}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 右カラム */}
              <div className={styles.conference_inner_right}>
                <div className={styles.conference_inner_right_societyname}>
                  <k>学会名</k>
                  <p>{societyname}</p>
                </div>
                <div className={styles.conference_inner_right_proceedingsname}>
                  <k>予稿集名</k>
                  <p>{proceedingsname}</p>
                </div>
                <div className={styles.conference_inner_right_announcementdate}>
                  <k>年次・ページ数</k>
                  <p>{announcementdate}</p>
                </div>
              </div>
            </div>
            <div className={styles.conference_bottomline}>
              {/* 必要なら区切りの内容を追加 */}
            </div>
          </div>
        );
      })}
    </>
  );
}
