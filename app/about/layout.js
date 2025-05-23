
import Footer from "../components/footer/footer";
import Title from "../components/title/title";
import Toptitle from "../components/toptitle/toptitle";

export default function Layout({ children }) {
    return (
        <html lang="ja">
      <body>
      <Toptitle/>
      <Title headline="シチズンサイエンスについて"/>
        {children} {/* ここにメインコンテンツが差し込まれる */}
        <Footer />
      </body>
      </html>
    );
  }
  