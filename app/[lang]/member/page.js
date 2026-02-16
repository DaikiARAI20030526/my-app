import { microcmsClient } from '@/lib/microcmsClient';
import styles from './page.module.css'; 
import Subtitle from "../components/subtitle/subtitle";
import ResearchStickyHeader from "../components/ResearchStickyHeader/ResearchStickyHeader";

// 1. 静的なUIテキストを言語ごとに定義
const content = {
  jp: {
    pageTitle: "研究メンバーについて", 
    noData: "まだデータがありません",
    noGroup: "member グループがありません",
    externalLink: "外部リンク",
    recruitmentTitle: "研究メンバーの募集について",
    recruitmentInfo: "当センターでは研究メンバー（大学院生を含む）を募集しています。詳しくはボタンのリンク先からご確認ください。",
    viewGuidelines: "募集要項を見る",
    externalLinkSuffix: "（外部リンク）",
    notRecruiting: "現在募集していません",
  },
  en: {
    pageTitle: "About Research Members",
    noData: "No data available yet",
    noGroup: "'member' group not found",
    externalLink: "External Link",
    recruitmentTitle: "Recruitment of Research Members",
    recruitmentInfo: "Our center is recruiting research members (including graduate students). Please check the link on the button for details.",
    viewGuidelines: "View Application Guidelines",
    externalLinkSuffix: "(External Link)",
    notRecruiting: "Not currently recruiting",
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
    title: t.pageTitle, // "研究メンバーについて" または "About Research Members"
  };
}

// 2. propsで `params` を受け取り、`lang` を取得
export default async function MemberPage({ params: { lang } }) {
  // 3. URLの言語に応じて、表示するUIテキストを選択
  const t = content[lang] || content.jp;

  // メンバー情報取得
  const memberData = await microcmsClient.get({
    endpoint: 'citizen',
    queries: { filters: 'slug[equals]member', limit: 100 },
  });
  const memberContents = memberData.contents || [];

  if (memberContents.length === 0) {
    return <p style={{ padding: '20px' }}>{t.noData}</p>;
  }

  // 募集情報取得
  const recruitData = await microcmsClient.get({
    endpoint: 'citizen',
    queries: { filters: 'slug[equals]recrute', limit: 100 },
  });
  // 安全にデータを取り出す（配列が空の場合も考慮）
  const recruitContent = recruitData.contents?.[0] || null;
  // recruitContentが存在し、かつrecrute2がある場合のみurlを取得
  const recruitUrl = recruitContent?.recrute2?.url || '';

  // ResearchStickyHeaderに渡すprops
  const pageTitles = [t.pageTitle];
  const subtitleIds = ['member-list']; // メンバー一覧セクションのID

  return (
    <main>
      <ResearchStickyHeader pageTitles={pageTitles} subtitleIds={subtitleIds} />

      {/* メンバー一覧 */}
      <div id="member-list" className={styles.memberContainer}>
        {memberContents.map((item) => {
          const { member2 } = item;
          if (!member2) {
            return (
              <div key={item.id}>
                <p>{t.noGroup}</p>
              </div>
            );
          }
          // MicroCMSのデータは常に日本語フィールドをそのまま使用
          const { name, ename, position, url } = member2;
          
          return (
            <div key={item.id} className={styles.member}>
              <div className={styles.member_inner}>
                {/* 左カラム */}
                <div className={styles.member_inner_1}>
                  <p className={styles.member_inner_1a}>{name}</p>
                  <p className={styles.member_inner_1b}>{ename}</p>
                  {/* urlがある場合のみリンクを表示するなど、必要に応じて条件分岐しても良い */}
                  {url && (
                    <div className={styles.member_inner_2}>
                      <span>{t.externalLink}</span>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.member_link}
                      >
                        {url}
                      </a>
                    </div>
                  )}
                </div>
                {/* 右カラム */}
                <div className={styles.member_inner_3}>
                  <p>{position}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles._line}></div>

      {/* 募集情報セクション */}
      <div className={styles.member_recruiting}>
        {/* Subtitleコンポーネントを使用 */}
        <Subtitle title={t.recruitmentTitle} />
        
        <div className={styles.member_recruiting_inner}>
          {/* 左テキスト */}
          <div className={styles.member_recruiting_inner_left}>
            <p>{t.recruitmentInfo}</p>
          </div>
          {/* 右ボタン or テキスト */}
          <div className={styles.member_recruiting_inner_right}>
            {recruitUrl ? (
              <a
                href={recruitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.buttonLink}
              >
                <div className={styles.member_recruiting_inner_right_button}>
                  <p>
                    {t.viewGuidelines}
                    <br />
                    {t.externalLinkSuffix}
                  </p>
                  <span>→</span>
                </div>
              </a>
            ) : (
              <div className={styles.member_recruiting_inner_right_button}>
                <p>{t.notRecruiting}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles._line}></div>
    </main>
  );
}