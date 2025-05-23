"use client";

import Link from "next/link";
import styles from "./InternalNavigation.module.css";

export default function InternalNavigation() {
  const groups = [
    {
      groupName: "a",
      alignment: "left",
      topItems: [{ label: "シチズンサイエンスについて", href: "/about" }],
      bottomItems: [
        { label: "シチズンサイエンスってなに？", href: "/about#citizenscience" },
        { label: "実例でみるシチズンサイエンス", href: "/about#examples" },
        { label: "当センターの研究領域", href: "/about#research-area" },
      ],
    },
    {
      groupName: "b",
      alignment: "center",
      topItems: [{ label: "研究業績", href: "/research" }],
      bottomItems: [
        { label: "論文", href: "/research" },
        { label: "学会発表", href: "/conference" },
        { label: "書籍", href: "/book" },
        { label: "受賞", href: "/award" },
        { label: "講演", href: "/lecture" },
      ],
    },
    {
      groupName: "c",
      alignment: "left",
      topItems: [{ label: "研究員について", href: "/member" }],
      bottomItems: [
        { label: "進行中のプロジェクト", href: "#project" },
        { label: "お知らせ", href: "#news" },
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
