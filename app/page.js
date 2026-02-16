// app/page.js

// 1. 本来トップページ（/jp）で表示しているコンポーネントをインポート
// ※もしトップページの実体が app/[lang]/page.js ならこのパスになります
import TopPageComponent from './[lang]/page'; 

export const metadata = {
  // ルートにアクセスしたときもSEO的に「ここが正規の日本語トップ」と伝える
  title: 'CITIZEN SCIENCE RESEARCH CENTER',
  alternates: {
    canonical: './',
  },
};

export default function RootPage() {
  // 2. 言語を 'jp' に固定して、トップページコンポーネントをそのまま表示する
  // これにより、URLは「/」のまま、中身は「/jp」と同じものが表示されます
  return <TopPageComponent params={{ lang: 'jp' }} />;
}