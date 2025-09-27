import { microcmsClient } from '@/lib/microcmsClient';
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";
import Image from 'next/image';
import styles from './page.module.css'; 

export const revalidate = 60;

export default async function BookPage() {
  // "book" slug を持つコンテンツを取得
  const data = await microcmsClient.get({
    endpoint: 'citizen', // microCMS のエンドポイント名に合わせる
    queries: {
      filters: 'slug[equals]book',
      limit: 100,
    },
  });

  // コンテンツ配列を取得
  const contents = data.contents || [];

  if (contents.length === 0) {
    return <p style={{ padding: '20px' }}>まだデータがありません</p>;
  }

  // 各 book2.title の配列を作成（空でないもののみ）
  const bookTitles = contents
    .filter(item => item.book2 && item.book2.title)
    .map(item => item.book2.title);

  return (
    <>
      {/* DynamicStickyHeader に bookTitles を渡す */}
      <DynamicStickyHeader titleArray={bookTitles} />

      {contents.map((item) => {
        const { book2 } = item;
        if (!book2) {
          return (
            <div key={item.id}>
              <p>book グループがありません</p>
            </div>
          );
        }

        // 分割代入で各項目を取得
        const { title, author, publisher, publication, bookimage, url } = book2;

        return (
          <div key={item.id} className={styles.book}>
            <div className={styles.book_inner}>
              {/* 左カラム */}
              <div className={styles.book_inner_left}>
                {/* タイトル部分：dynamicTitle クラスとユニークな id を付与 */}
                <div id={`bookTitle-${item.id}`} className="dynamicTitle">
                  <p className={styles.book_inner_left_title}>{title}</p>
                </div>
                <div className={styles.book_inner_left_author}>
                  <k>著者</k>
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
                  <k>出版社</k>
                  <p>{publisher}</p>
                </div>
                <div className={styles.book_inner_left_bottom}>
                  <div className={styles.book_inner_left_publication}>
                    <k>出版日</k>
                    <p>{publication}</p>
                  </div>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.book_inner_left_buttom}
                    >
                      <p>詳しくはこちらから</p>
                      <k>→</k>
                    </a>
                  ) : (
                    <div className={styles.book_inner_left_buttom}>
                      <p>準備中</p>
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
