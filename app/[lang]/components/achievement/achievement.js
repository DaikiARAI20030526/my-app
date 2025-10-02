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
  // 2. 現在の言語をURLから取得
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentLang = segments[1] || 'jp';
  const t = content[currentLang] || content.jp;

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
          pathname === `/${currentLang}/${item.slug}` && <p key={item.slug}>{item.label}</p>
        ))}
      </div>

      {/* 右側：非アクティブな項目をリンクとして表示 */}
      <div className={styles.achievement_right}>
        {navItems.map(item => (
          pathname !== `/${currentLang}/${item.slug}` && (
            <Link key={item.slug} href={`/${currentLang}/${item.slug}`}>
              <p>{item.label}</p>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}
