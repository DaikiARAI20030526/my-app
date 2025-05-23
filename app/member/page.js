// app/member/page.js
import { microcmsClient } from '@/lib/microcmsClient';
import styles from './page.module.css'; 
import Subtitle from "../components/subtitle/subtitle";

export const revalidate = 60;

export default async function memberPage() {
  // ① member のデータ取得 (slug: "member")
  const memberData = await microcmsClient.get({
    endpoint: 'citizen', // エンドポイント名（例: citizen）
    queries: {
      filters: 'slug[equals]member',
      limit: 100,
    },
  });
  const memberContents = memberData.contents || [];

  // コンテンツがない場合の早期リターン
  if (memberContents.length === 0) {
    return <p style={{ padding: '20px' }}>まだデータがありません</p>;
  }

  // ② 募集情報のデータ取得 (slug: "recrute2")
  const recruitData = await microcmsClient.get({
    endpoint: 'citizen', // 同じエンドポイント内に複数のコンテンツがある前提
    queries: {
      filters: 'slug[equals]recrute',
      limit: 100,
    },
  });
  const recruitContents = recruitData.contents || [];
  // 募集情報は1件のみまたは複数ある場合、ここでは先頭の1件を採用
  const recruitContent = recruitContents.length > 0 ? recruitContents[0] : null;
  // recruitContent の中の、リンク用フィールド (例として "url" フィールド) を取得
  const recruitUrl = recruitContent?.recrute2?.url || '';

  return (
    <>
      {/* ① メンバーのカード一覧 */}
      <div className={styles.memberContainer}>
        {memberContents.map((item) => {
          const { member2 } = item;
          if (!member2) {
            return (
              <div key={item.id}>
                <p>member グループがありません</p>
              </div>
            );
          }
          // member2 内のフィールドを分割代入
          const { name, ename, position, url } = member2;
          return (
            <div key={item.id} className={styles.member}>
              <div className={styles.member_inner}>
                {/* 左カラム */}
                <div className={styles.member_inner_1}>
                  <p className={styles.member_inner_1a}>{name}</p>
                  <p className={styles.member_inner_1b}>{ename}</p>
                  <div className={styles.member_inner_2}>
                    <k>外部リンク</k>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.member_link}
                    >
                      {url}
                    </a>
                  </div>
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

      {/* ② 募集情報セクション */}
      <div className={styles.member_recruiting}>
      <Subtitle title="研究メンバーの募集について"/>
        <div className={styles.member_recruiting_inner}>
          <div className={styles.member_recruiting_inner_left}>
            {/* 左カラム（固定または任意のテキストなど） */}
            <p>当センターでは研究メンバー（大学院生を含む）を募集しています。詳しくはボタンのリンク先からご確認ください。</p>
          </div>
          <div className={styles.member_recruiting_inner_right}>
            {/* 募集情報のURLがあれば、ボタンとしてリンクを表示 */}
            
            {recruitUrl && (
              <a
              href={recruitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.buttonLink}
              >
                
                <div className={styles.member_recruiting_inner_right_button}>
                <p>
                募集要項を見る
                <br />
                （外部リンク）
                 </p>
                  <k>→</k>
                </div>
              </a>
             )}

          </div>
        </div>
      </div>
      <div className={styles._line}></div>
    </>
  );
}
