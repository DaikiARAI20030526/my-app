import { microcmsClient } from '@/lib/microcmsClient';
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";
import styles from "./page.module.css";

// 1. 静的なUIテキストを言語ごとに定義
const content = {
  jp: {
    pageTitle: "講演など", // 
    noData: "まだデータがありません",
    noGroup: "lecture グループがありません",
    location: "講演地名",
    speakers: "講演者",
    date: "実施日",
    eventType: "会議種別",
  },
  en: {
    pageTitle: "Lectures, etc.", 
    noData: "No data available yet",
    noGroup: "'lecture' group not found",
    location: "Location",
    speakers: "Speaker(s)",
    date: "Date",
    eventType: "Event Type",
  },
};

export const revalidate = 60;

// generateStaticParamsを追加して静的生成を有効化
export async function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }];
}

// ★動的にメタデータを生成する関数
export async function generateMetadata({ params }) {
  const lang = params.lang || 'jp';
  const t = content[lang] || content.jp;

  return {
    title: t.pageTitle, // "講演など" または "Lectures, etc." がセットされる
  };
}

// 2. propsで `params` を受け取り、`lang` を取得
export default async function LecturePage({ params: { lang } }) {
  // 3. URLの言語に応じて、表示するUIテキストを選択
  const t = content[lang] || content.jp;

  const data = await microcmsClient.get({
    endpoint: 'citizen',
    queries: {
      filters: 'slug[equals]lecture',
      limit: 100,
    },
  });
  const contents = data.contents || [];
  if (contents.length === 0) {
    return <p style={{ padding: '20px' }}>{t.noData}</p>;
  }

  // MicroCMSのタイトルは常に日本語フィールドを参照
  const lectureTitles = contents.map(item => item.lecture2?.title).filter(Boolean);

  return (
    <>
      <DynamicStickyHeader titleArray={lectureTitles} />

      {contents.map((item) => {
        const { lecture2 } = item;
        if (!lecture2) {
          return (
            <div key={item.id}>
              <p>{t.noGroup}</p>
            </div>
          );
        }
        // MicroCMSのデータは常に日本語フィールドをそのまま使用
        const { title, locationname, implementationdate, conferencetype, author } = lecture2;

        return (
          <div key={item.id} className={styles.lecture}>
            <div className={styles.lecture_inner}>
              {/* 左カラム */}
              <div className={styles.lecture_inner_left}>
                <div id={`lectureTitle-${item.id}`} className="dynamicTitle">
                  <p className={styles.lecture_inner_left_title}>{title}</p>
                </div>
                <div className={styles.lecture_inner_left_locationname}>
                  <k>{t.location}</k>
                  <p>{locationname}</p>
                </div>
              </div>
              {/* 右カラム */}
              <div className={styles.lecture_inner_right}>
                <div className={styles.lecture_inner_right_author}>
                  <k>{t.speakers}</k>
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
                  <k>{t.date}</k>
                  <p>{implementationdate}</p>
                </div>
                <div className={styles.lecture_inner_right_conferencetype}>
                  <k>{t.eventType}</k>
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