import { microcmsClient } from '@/lib/microcmsClient';
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";
import Image from 'next/image';
import styles from './page.module.css'; 

// 1. 静的なUIテキストを言語ごとに定義
const content = {
  jp: {
    noData: "まだデータがありません",
    noGroup: "book グループがありません",
    authors: "著者",
    publisher: "出版社",
    publicationDate: "出版日",
    moreDetails: "詳しくはこちらから",
    comingSoon: "準備中",
  },
  en: {
    noData: "No data available yet",
    noGroup: "'book' group not found",
    authors: "Authors",
    publisher: "Publisher",
    publicationDate: "Publication Date",
    moreDetails: "More Details",
    comingSoon: "Coming Soon",
  },
};

export const revalidate = 60;

// generateStaticParamsを追加して静的生成を有効化
export async function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }];
}

// 2. propsで `params` を受け取り、`lang` を取得
export default async function BookPage({ params: { lang } }) {
  // 3. URLの言語に応じて、表示するUIテキストを選択
  const t = content[lang] || content.jp;

  const data = await microcmsClient.get({
    endpoint: 'citizen',
    queries: {
      filters: 'slug[equals]book',
      limit: 100,
    },
  });

  const contents = data.contents || [];
  if (contents.length === 0) {
    return <p style={{ padding: '20px' }}>{t.noData}</p>;
  }

  // MicroCMSのタイトルは常に日本語フィールドを参照
  const bookTitles = contents
    .filter(item => item.book2 && item.book2.title)
    .map(item => item.book2.title);

  return (
    <>
      <DynamicStickyHeader titleArray={bookTitles} />

      {contents.map((item) => {
        const { book2 } = item;
        if (!book2) {
          return (
            <div key={item.id}>
              <p>{t.noGroup}</p>
            </div>
          );
        }

        // MicroCMSのデータは常に日本語フィールドをそのまま使用
        const { title, author, publisher, publication, bookimage, url } = book2;

        return (
          <div key={item.id} className={styles.book}>
            <div className={styles.book_inner}>
              {/* 左カラム */}
              <div className={styles.book_inner_left}>
                <div id={`bookTitle-${item.id}`} className="dynamicTitle">
                  <p className={styles.book_inner_left_title}>{title}</p>
                </div>
                <div className={styles.book_inner_left_author}>
                  <k>{t.authors}</k>
                  {Array.isArray(author) && author.length > 0 && (
                    <div className={styles.book_inner_left_authors}>
                      {author.map((authorItem, index) => (
                        <div key={index} className={styles.authorRow}>
                          <p>{authorItem?.aboutauthor}</p>
                          <p>{authorItem?.separator}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.book_inner_left_publisher}>
                  <k>{t.publisher}</k>
                  <p>{publisher}</p>
                </div>
                <div className={styles.book_inner_left_bottom}>
                  <div className={styles.book_inner_left_publication}>
                    <k>{t.publicationDate}</k>
                    <p>{publication}</p>
                  </div>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.book_inner_left_buttom}
                    >
                      <p>{t.moreDetails}</p>
                      <k>→</k>
                    </a>
                  ) : (
                    <div className={styles.book_inner_left_buttom}>
                      <p>{t.comingSoon}</p>
                      <k>×</k>
                    </div>
                  )}
                </div>
              </div>

              {/* 右カラム */}
              <div className={styles.book_inner_right}>
                <div className={styles.book_inner_right_bookimage}>
                  {bookimage && (
                    <Image
                      src={bookimage.url}
                      alt={title || "bookimage"}
                      width={bookimage.width}
                      height={bookimage.height}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={styles.book_bottomline}></div>
          </div>
        );
      })}
    </>
  );
}