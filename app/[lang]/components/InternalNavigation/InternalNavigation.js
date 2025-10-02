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
    groupC_item1: "進行中のプロジェクト",
    groupC_item2: "お知らせ",
  },
  en: {
    groupA_top: "About Citizen Science",
    groupA_item1: "What is Citizen Science?",
    groupA_item2: "Examples in Practice", // この項目は非表示になる
    groupA_item3: "Our Research Area",
    groupB_top: "Research",
    groupB_item1: "Papers",
    groupB_item2: "Conferences",
    groupB_item3: "Books",
    groupB_item4: "Awards",
    groupB_item5: "Lectures",
    groupC_top: "About Members",
    groupC_item1: "Ongoing Projects",
    groupC_item2: "News",
  },
};

export default function InternalNavigation() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentLang = segments[1] || 'jp';
  const t = content[currentLang] || content.jp;

  // ▼▼▼ ここから変更 ▼▼▼
  // `bottomItems` の内容を言語に応じて動的に変更
  const groupABottomItems = currentLang === 'en'
    ? [ // enページの場合
        { label: t.groupA_item1, href: `/${currentLang}/about#citizenscience` },
        { label: t.groupA_item3, href: `/${currentLang}/about#research-area` },
      ]
    : [ // jpページの場合
        { label: t.groupA_item1, href: `/${currentLang}/about#citizenscience` },
        { label: t.groupA_item2, href: `/${currentLang}/about#examples` },
        { label: t.groupA_item3, href: `/${currentLang}/about#research-area` },
      ];
  // ▲▲▲ ここまで変更 ▲▲▲

  const groups = [
    {
      groupName: "a",
      alignment: "left",
      topItems: [{ label: t.groupA_top, href: `/${currentLang}/about` }],
      bottomItems: groupABottomItems, // 動的に生成した配列を使用
    },
    {
      groupName: "b",
      alignment: "center",
      topItems: [{ label: t.groupB_top, href: `/${currentLang}/research` }],
      bottomItems: [
        { label: t.groupB_item1, href: `/${currentLang}/research` },
        { label: t.groupB_item2, href: `/${currentLang}/conference` },
        { label: t.groupB_item3, href: `/${currentLang}/book` },
        { label: t.groupB_item4, href: `/${currentLang}/award` },
        { label: t.groupB_item5, href: `/${currentLang}/lecture` },
      ],
    },
    {
      groupName: "c",
      alignment: "left",
      topItems: [{ label: t.groupC_top, href: `/${currentLang}/member` }],
      bottomItems: [
        { label: t.groupC_item1, href: `/${currentLang}#project` },
        { label: t.groupC_item2, href: `/${currentLang}#news` },
      ],
    },
  ];

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

