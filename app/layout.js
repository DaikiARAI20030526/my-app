import "./globals.css"
import Footer from "./[lang]/components/footer/footer"

export const metadata = {
  // 1. サイトのベースURL（重要：ここが間違っているとGoogleが混乱します）
  metadataBase: new URL('https://www.citizenscience.comm.fukuoka-u.ac.jp'),

  // 2. サイト名の設定
  title: {
    // %s の部分に各ページのタイトル（"About"など）が入ります
    template: '%s | CITIZEN SCIENCE RESEARCH CENTER',
    // 各ページでタイトルが設定されていない場合に使われるデフォルトのタイトル
    default: 'CITIZEN SCIENCE RESEARCH CENTER',
  },

  // 3. 検索結果に表示される説明文（全ページ共通のデフォルト）
  description: '福岡大学 商学部 シチズンサイエンス研究センターの公式サイトです。',

  // 4. URLの正規化と多言語設定（リダイレクトエラー対策）
  alternates: {
    canonical: './',
    languages: {
      'ja': '/',    // 日本語ページ
      'en': '/en',  // 英語ページ
    },
  },
}

export default function RootLayout({ children }) {
  // 言語設定は国際規格に合わせて "ja" にします
  return (
    <html lang="ja">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}