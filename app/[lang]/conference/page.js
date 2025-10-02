import { microcmsClient } from '@/lib/microcmsClient';
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";
import styles from "./page.module.css"; 

// 1. 静的なUIテキストを言語ごとに定義
const content = {
  jp: {
    noData: "まだデータがありません",
    noGroup: "conference グループがありません",
    authors: "著者",
    conferenceName: "学会名",
    proceedings: "予稿集名",
    yearPages: "年次・ページ数",
  },
  en: {
    noData: "No data available yet",
    noGroup: "'conference' group not found",
    authors: "Authors",
    conferenceName: "Conference Name",
    proceedings: "Proceedings",
    yearPages: "Year / Pages",
  },
};

export const revalidate = 60;

// generateStaticParamsを追加して静的生成を有効化
export async function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }];
}

// 2. propsで `params` を受け取り、`lang` を取得
export default async function ConferencePage({ params: { lang } }) {
  // 3. URLの言語に応じて、表示するUIテキストを選択
  const t = content[lang] || content.jp;

  const data = await microcmsClient.get({
    endpoint: 'citizen',
    queries: {
      filters: 'slug[equals]conference',
      limit: 100,
    },
  });

  const contents = data.contents || [];
  if (contents.length === 0) {
    return <p style={{ padding: '20px' }}>{t.noData}</p>;
  }

  // MicroCMSのタイトルは常に日本語フィールドを参照
  const conferenceTitles = contents
    .filter(item => item.conference2 && item.conference2.title)
    .map(item => item.conference2.title);

  return (
    <>
      <DynamicStickyHeader titleArray={conferenceTitles} />

      {contents.map((item) => {
        const { conference2 } = item;
        if (!conference2) {
          return (
            <div key={item.id}>
              <p>{t.noGroup}</p>
            </div>
          );
        }
        // MicroCMSのデータは常に日本語フィールドをそのまま使用
        const { title, author, societyname, proceedingsname, announcementdate } = conference2;

        return (
          <div key={item.id} className={styles.conference}>
            <div className={styles.conference_inner}>
              {/* 左カラム */}
              <div className={styles.conference_inner_left}>
                <div id={`conferenceTitle-${item.id}`} className="dynamicTitle">
                  <p className={styles.conference_inner_left_title}>{title}</p>
                </div>
                <div className={styles.conference_inner_left_author}>
                  <k>{t.authors}</k>
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
                  <k>{t.conferenceName}</k>
                  <p>{societyname}</p>
                </div>
                <div className={styles.conference_inner_right_proceedingsname}>
                  <k>{t.proceedings}</k>
                  <p>{proceedingsname}</p>
                </div>
                <div className={styles.conference_inner_right_announcementdate}>
                  <k>{t.yearPages}</k>
                  <p>{announcementdate}</p>
                </div>
              </div>
            </div>
            <div className={styles.conference_bottomline}>
            </div>
          </div>
        );
      })}
    </>
  );
}