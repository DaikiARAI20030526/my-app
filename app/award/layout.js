import Toptitle from "../components/toptitle/toptitle";
import Footer from "../components/footer/footer";
import Title from "../components/title/title";
import Achievement from "../components/achievement/achievement";

export default function Layout({ children }) {
    return (
        <html lang="ja">
      <body>
      <Toptitle />
      <Title headline="研究実績"/>
      <Achievement />
        {children} {/* ここにメインコンテンツが差し込まれる */}
        <Footer />
      </body>
      </html>
    );
  }
  