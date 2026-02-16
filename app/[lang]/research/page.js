import { microcmsClient } from '@/lib/microcmsClient';
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";
import styles from './page.module.css'; 

// 1. 静的なUIテキストを言語ごとに定義
const content = {
  jp: {
    pageTitle: "論文",
    noData: "まだデータがありません",
    noGroup: "research グループがありません",
    authors: "著者",
    journal: "掲載誌",
    date: "掲載日",
    detailsLink: "論文詳細はこちら",
    externalLink: "（外部リンク）",
    comingSoon: "準備中"
  },
  en: {
    pageTitle: "Research",
    noData: "No data available yet",
    noGroup: "'research' group not found",
    authors: "Authors",
    journal: "Journal / Publication",
    date: "Publication Date",
    detailsLink: "View Paper Details",
    externalLink: "(External Link)",
    comingSoon: "Coming Soon"
  }
};

export const revalidate = 60;

export async function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }];
}

// 動的にメタデータを生成する関数
export async function generateMetadata({ params }) {
  const lang = params.lang || 'jp';
  const t = content[lang] || content.jp;

  return {
    title: t.pageTitle,
  };
}

// ▼▼▼ 追加: 日本語文字（ひらがな・カタカナ・漢字）が含まれているか判定する関数 ▼▼▼
function containsJapanese(text) {
  if (!text) return false;
  // ひらがな、カタカナ、漢字の範囲を正規表現でチェック
  return /[ぁ-んァ-ン一-龠]/.test(text);
}

export default async function ResearchPage({ params: { lang } }) {
  const t = content[lang] || content.jp;

  const data = await microcmsClient.get({
    endpoint: 'citizen',
    queries: {
      filters: 'slug[equals]research',
      limit: 100,
    },
  });

  const contents = data.contents || [];
  if (contents.length === 0) {
    return <p style={{ padding: '20px' }}>{t.noData}</p>;
  }

  // MicroCMSのタイトルは常に日本語フィールドを参照
  const researchTitles = contents
    .filter(item => item.research2 && item.research2.title)
    .map(item => item.research2.title);

  return (
    <>
      <DynamicStickyHeader titleArray={researchTitles} />

      {contents.map((item) => {
        const { research2 } = item;
        if (!research2) {
          return (
            <div key={item.id}>
              <p className="font-stretched">{t.noGroup}</p>
            </div>
          );
        }

        // MicroCMSのデータは常に日本語フィールドをそのまま使用
        const { title, overview, magazine, publicationDate, author, url } = research2;

        // ▼▼▼ コンテンツ自体が日本語を含んでいるか判定 ▼▼▼
        const isJapaneseText = containsJapanese(overview);
        
        // 判定結果に応じてクラスを選択
        const overviewClass = isJapaneseText ? styles.overview_jp : styles.overview_en;

        return (
          <div key={item.id} className={styles.reserch}>
            <div className={styles.reserch_inner}>
              {/* 左カラム */}
              <div className={styles.reserch_inner_left}>
                <div id={`researchTitle-${item.id}`} className="dynamicTitle">
                  <p className={`${styles.reserch_inner_left_title} font-stretched`}>{title}</p>
                </div>
                
                {/* ▼▼▼ 修正: 判定したクラスとlang属性を適用 ▼▼▼ */}
                <p 
                  className={`${overviewClass} font-stretched`}
                  // hyphens: auto を効かせるために lang 属性を明示的に指定
                  lang={isJapaneseText ? "ja" : "en"}
                >
                  {overview}
                </p>
              </div>

              {/* 右カラム */}
              <div className={styles.reserch_inner_right}>
                <div className={styles.reserch_inner_right_author}>
                  <div className={`${styles.reserch_inner_caption} font-stretched`}>
                    <p>{t.authors}</p>
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

                <div className={styles.reserch_inner_right_magazine}>
                  <div className={`${styles.reserch_inner_caption} font-stretched`}>
                    <p>{t.journal}</p>
                  </div>
                  <div>
                    <p className="font-stretched">{magazine}</p>
                  </div>
                </div>
                <div className={styles.reserch_inner_right_publicationDate}>
                  <div className={`${styles.reserch_inner_caption} font-stretched`}>
                    <p>{t.date}</p>
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
                      {t.detailsLink}
                      <br />
                      {t.externalLink}
                    </p>
                    <p className={styles.arrow}>→</p>
                  </a>
                ) : (
                  <div className={styles.reserch_inner_right_bottom}>
                    <p className="font-stretched">{t.comingSoon}</p>
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