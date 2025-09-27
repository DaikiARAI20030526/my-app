// app/lecture/page.js
import { microcmsClient } from '@/lib/microcmsClient';
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";
import styles from "./page.module.css";

export const revalidate = 60;

export default async function LecturePage() {
  // APIから "lecture" slug を持つコンテンツを取得
  const data = await microcmsClient.get({
    endpoint: 'citizen',
    queries: {
      filters: 'slug[equals]lecture',
      limit: 100,
    },
  });
  const contents = data.contents || [];
  if (contents.length === 0) {
    return <p style={{ padding: '20px' }}>まだデータがありません</p>;
  }

  // 各 lecture2.title の配列を作成（例：講演タイトルの配列）
  const lectureTitles = contents.map(item => item.lecture2?.title).filter(Boolean);

  return (
    <>
      {/* DynamicStickyHeader に lectureTitles 配列を渡す */}
      <DynamicStickyHeader titleArray={lectureTitles} />

      {contents.map((item) => {
        const { lecture2 } = item;
        if (!lecture2) {
          return (
            <div key={item.id}>
              <p>lecture グループがありません</p>
            </div>
          );
        }
        const { title, locationname, implementationdate, conferencetype, author } = lecture2;

        return (
          <div key={item.id} className={styles.lecture}>
            <div className={styles.lecture_inner}>
              {/* 左カラム */}
              <div className={styles.lecture_inner_left}>
                {/* 講演タイトル部分：ここに dynamicTitle クラスとユニークな id を付与 */}
                <div id={`lectureTitle-${item.id}`} className="dynamicTitle">
                  <p className={styles.lecture_inner_left_title}>{title}</p>
                </div>
                <div className={styles.lecture_inner_left_locationname}>
                  <k>講演地名</k>
                  <p>{locationname}</p>
                </div>
              </div>
              {/* 右カラム */}
              <div className={styles.lecture_inner_right}>
                <div className={styles.lecture_inner_right_author}>
                  <k>講演者</k>
                  {Array.isArray(author) && author.length > 0 && (
                    <div className={styles.lecture_inner_right_authors}>
                      {author.map((authorItem, index) => (
                        <div key={index} className={styles.authorRow}>
                          <p>{authorItem?.aboutauthor}</p>
                          <p>{authorItem?.separator}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.lecture_inner_right_implementationdate}>
                  <k>実施日</k>
                  <p>{implementationdate}</p>
                </div>
                <div className={styles.lecture_inner_right_conferencetype}>
                  <k>会議種別</k>
                  <p>{conferencetype}</p>
                </div>
              </div>
            </div>
            <div className={styles.lecture_bottomline}></div>
          </div>
        );
      })}
    </>
  );
}
