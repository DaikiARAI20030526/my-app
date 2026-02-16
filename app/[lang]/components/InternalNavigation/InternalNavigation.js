"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./InternalNavigation.module.css";

const content = {
  jp: {
    groupA_top: "シチズンサイエンスについて",
    groupA_item1: "シチズンサイエンスってなに？",
    groupA_item2: "実例でみるシチズンサイエンス",
    groupA_item3: "当センターの研究領域",
    groupB_top: "研究業績",
    groupB_item1: "論文",
    groupB_item2: "学会発表",
    groupB_item3: "書籍",
    groupB_item4: "受賞",
    groupB_item5: "講演",
    groupC_top: "研究員について",
    groupC_item1: "お知らせ",
    groupC_item2: "進行中のプロジェクト",
  },
  en: {
    groupA_top: "About Citizen Science",
    groupA_item1: "What is Citizen Science?",
    groupA_item2: "Examples in Practice",
    groupA_item3: "Research Area of Our Center",
    groupB_top: "Research",
    groupB_item1: "Papers",
    groupB_item2: "Conferences",
    groupB_item3: "Books",
    groupB_item4: "Awards",
    groupB_item5: "Lectures",
    groupC_top: "About Research Members",
    groupC_item1: "News",
    groupC_item2: "Ongoing Projects",
  },
};

export default function InternalNavigation() {
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


  // ▼▼▼ 修正箇所 2: リンク生成部分を ${prefix} を使う形に変更 ▼▼▼
  
  // `bottomItems` の内容を言語に応じて動的に変更
  const groupABottomItems = isEnglish
    ? [ // enページの場合
        { label: t.groupA_item1, href: `${prefix}/about#citizenscience` },
        { label: t.groupA_item3, href: `${prefix}/about#research-area` },
      ]
    : [ // jpページの場合
        { label: t.groupA_item1, href: `${prefix}/about#citizenscience` },
        { label: t.groupA_item2, href: `${prefix}/about#examples` },
        { label: t.groupA_item3, href: `${prefix}/about#researcharea` },
      ];

  const groups = [
    {
      groupName: "a",
      alignment: "left",
      topItems: [{ label: t.groupA_top, href: `${prefix}/about` }],
      bottomItems: groupABottomItems,
    },
    {
      groupName: "b",
      alignment: "center",
      topItems: [{ label: t.groupB_top, href: `${prefix}/research` }],
      bottomItems: [
        { label: t.groupB_item1, href: `${prefix}/research` },
        { label: t.groupB_item2, href: `${prefix}/conference` },
        { label: t.groupB_item3, href: `${prefix}/book` },
        { label: t.groupB_item4, href: `${prefix}/award` },
        { label: t.groupB_item5, href: `${prefix}/lecture` },
      ],
    },
    {
      groupName: "c",
      alignment: "left",
      topItems: [{ label: t.groupC_top, href: `${prefix}/member` }],
      bottomItems: [
        // アンカーリンクの場合も prefix をつける (例: /#news または /en/#news)
        { label: t.groupC_item1, href: `${prefix}/#news` },
        { label: t.groupC_item2, href: `${prefix}/#project` },
      ],
    },
  ];
  // ▲▲▲ 修正箇所 2 終了 ▲▲▲

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {groups.map((group) => {
          const allItems = [...group.topItems, ...group.bottomItems];
          return (
            <div
              key={group.groupName}
              className={styles.group}
              style={{ textAlign: group.alignment }}
            >
              <div className={styles.itemsRow}>
                {allItems.map((item, index) => (
                  <Link key={index} href={item.href} legacyBehavior>
                    <a className={styles.item}>{item.label}</a>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}