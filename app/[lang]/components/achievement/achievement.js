"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./achievement.module.css";

// 1. 全てのテキストを言語ごとに定義
const content = {
  jp: {
    papers: "論文",
    conference: "学会発表",
    book: "書籍",
    award: "受賞",
    lecture: "講演など",
  },
  en: {
    papers: "Papers",
    conference: "Conferences",
    book: "Books",
    award: "Awards",
    lecture: "Lectures, etc.",
  },
};

export default function Achievement() {
  const pathname = usePathname();

  // ▼▼▼ 修正箇所 1: 言語判定とプレフィックスの設定 ▼▼▼
  // URLが /en で始まっているかで判定
  const isEnglish = pathname.startsWith('/en');
  const currentLang = isEnglish ? 'en' : 'jp';

  // リンクの頭につける文字
  // 英語なら "/en", 日本語なら "" (空文字) にする
  const prefix = isEnglish ? '/en' : '';
  
  const t = content[currentLang] || content.jp;
  // ▲▲▲ 修正箇所 1 終了 ▲▲▲

  // 3. ナビゲーション項目を配列として定義
  const navItems = [
    { slug: 'research', label: t.papers },
    { slug: 'conference', label: t.conference },
    { slug: 'book', label: t.book },
    { slug: 'award', label: t.award },
    { slug: 'lecture', label: t.lecture },
  ];

  return (
    <div className={styles.achievement}>
      {/* 左側：アクティブな項目のテキストを表示 */}
      <div className={styles.achievement_left}>
        {navItems.map(item => (
          // ▼▼▼ 修正箇所 2: パス比較ロジックの変更 (/${currentLang}/... を ${prefix}/... に) ▼▼▼
          pathname === `${prefix}/${item.slug}` && <p key={item.slug}>{item.label}</p>
        ))}
      </div>

      {/* 右側：非アクティブな項目をリンクとして表示 */}
      <div className={styles.achievement_right}>
        {navItems.map(item => (
          // ▼▼▼ 修正箇所 3: リンク生成ロジックの変更 ▼▼▼
          pathname !== `${prefix}/${item.slug}` && (
            <Link key={item.slug} href={`${prefix}/${item.slug}`}>
              <p>{item.label}</p>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}