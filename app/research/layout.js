import Toptitle from "../components/toptitle/toptitle";
import Title from "../components/title/title";
import Achievement from "../components/achievement/achievement";
import Footer from "../components/footer/footer";

export default function Layout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Toptitle />
        <Title headline="研究実績" />
        <Achievement />
        {children}
        <Footer />
      </body>
    </html>
  );
}
