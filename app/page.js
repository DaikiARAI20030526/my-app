// app/page.js
import AboutPage from './[lang]/about/page'; // またはトップページに相当するコンポーネント

export default function RootPage() {
  // リダイレクトせず、日本語版のトップページコンポーネントを直接レンダリングする
  // params を偽装して渡すことで、AboutPage側は "jp" として動作する
  return <AboutPage params={{ lang: 'jp' }} />;
}