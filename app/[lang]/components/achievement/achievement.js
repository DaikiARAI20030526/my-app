"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./achievement.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className={styles.achievement}>
      {/* 左側：アクティブテキストのみ */}
      <div className={styles.achievement_left}>
        {pathname === "/research" && <p>論文</p>}
        {pathname === "/conference" && <p>学会発表</p>}
        {pathname === "/book" && <p>書籍</p>}
        {pathname === "/award" && <p>受賞</p>}
        {pathname === "/lecture" && <p>講演など</p>}
      </div>

      {/* 右側：非アクティブリンクを中央に並べる */}
      <div className={styles.achievement_right}>
        {pathname !== "/research" && (
          <Link href="/research">
            <p>論文</p>
          </Link>
        )}
        {pathname !== "/conference" && (
          <Link href="/conference">
            <p>学会発表</p>
          </Link>
        )}
        {pathname !== "/book" && (
          <Link href="/book">
            <p>書籍</p>
          </Link>
        )}
        {pathname !== "/award" && (
          <Link href="/award">
            <p>受賞</p>
          </Link>
        )}
        {pathname !== "/lecture" && (
          <Link href="/lecture">
            <p>講演など</p>
          </Link>
        )}
      </div>
    </div>
  );
}
