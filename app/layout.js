import "./globals.css";

export const metadata = {
  title: "My Next.js App",
  description: "Example app with custom fonts",
};


export default function Layout({ children }) {
  return (
    <html lang="ja">
      <body>
        {/* 共通のヘッダーやナビゲーションを入れるならここ */}
        {/* 共通のヘッダーやナビゲーションを入れるならここ */}
        {children} 
        {/* 共通のフッターなどを入れるならここ */}
      </body>
    </html>
  );
}
