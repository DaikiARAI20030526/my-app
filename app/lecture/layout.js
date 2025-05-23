import Toptitle from "../components/toptitle/toptitle";
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";
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
      <DynamicStickyHeader />
        {children} {/* ここにメインコンテンツが差し込まれる */}
        <Footer />
      </body>
      </html>
    );
  }
  