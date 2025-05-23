import Footer from "../components/footer/footer";


export default function Layout({ children }) {
    return (
        <html lang="ja">
      <body>
        {children} {/* ここにメインコンテンツが差し込まれる */}
        <Footer />
      </body>
      </html>
    );
  }
  