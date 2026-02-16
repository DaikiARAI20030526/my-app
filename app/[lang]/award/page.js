import { microcmsClient } from '@/lib/microcmsClient';
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";
import styles from "./page.module.css"; 

// 1. 静的なUIテキストを言語ごとに定義
const content = {
  jp: {
    pageTitle: "受賞歴", // ★ここに追加
    noData: "まだデータがありません",
    noGroup: "award グループがありません",
    awardCategory: "受賞区分",
    recipients: "受賞者",
    societyName: "学会名",
    dateAwarded: "受賞日",
  },
  en: {
    pageTitle: "Awards", // ★ここに追加
    noData: "No data available yet",
    noGroup: "'award' group not found",
    awardCategory: "Award Category",
    recipients: "Recipient(s)",
    societyName: "Society Name",
    dateAwarded: "Date Awarded",
  },
};

export const revalidate = 60;

// generateStaticParamsを追加して静的生成を有効化
export async function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }];
}

// ★ここに追加: 動的にメタデータを生成する関数
export async function generateMetadata({ params }) {
  const lang = params.lang || 'jp';
  const t = content[lang] || content.jp;

  return {
    title: t.pageTitle, // "受賞歴" または "Awards" がセットされる
  };
}

// 2. propsで `params` を受け取り、`lang` を取得
export default async function AwardPage({ params: { lang } }) {
  // 3. URLの言語に応じて、表示するUIテキストを選択
  const t = content[lang] || content.jp;

  const data = await microcmsClient.get({
    endpoint: 'citizen',
    queries: {
      filters: 'slug[equals]award',
      limit: 100,
    },
  });

  const contents = data.contents || [];

  if (contents.length === 0) {
    return <p style={{ padding: '20px' }}>{t.noData}</p>;
  }

  // MicroCMSのタイトルは常に日本語フィールドを参照
  const awardTitles = contents
    .filter(item => item.award2 && item.award2.title)
    .map(item => item.award2.title);

  return (
    <>
      <DynamicStickyHeader titleArray={awardTitles} />

      {contents.map((item) => {
        const { award2 } = item;
        if (!award2) {
          return (
            <div key={item.id}>
              <p>{t.noGroup}</p>
            </div>
          );
        }

        // MicroCMSのデータは常に日本語フィールドをそのまま使用
        const { title, awardname, awardcategory, societyname, author, awarddate } = award2;

        return (
          <div key={item.id} className={styles.award}>
            <div className={styles.award_inner}>
              {/* 左カラム */}
              <div className={styles.award_inner_left}>
                <div id={`awardTitle-${item.id}`} className="dynamicTitle">
                  <div className={styles.award_inner_left_award}>
                    <p className={styles.award_inner_left_awardname}>{awardname}</p>
                    <p className={styles.award_inner_left_title}>{title}</p>
                  </div>
                </div>
                <div className={styles.award_inner_left_awardcategory}>
                  <k>{t.awardCategory}</k>
                  <p>{awardcategory}</p>
                </div>
              </div>
              {/* 右カラム */}
              <div className={styles.award_inner_right}>
                <div className={styles.award_inner_right_author}>
                  <k>{t.recipients}</k>
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
                  <k>{t.societyName}</k>
                  <p>{societyname}</p>
                </div>
                <div className={styles.award_inner_right_awarddate}>
                  <k>{t.dateAwarded}</k>
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