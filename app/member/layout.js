import Toptitle from "../components/toptitle/toptitle";
import Footer from "../components/footer/footer";
import Title from "../components/title/title";

export default function Layout({ children }) {
    return (
        <html lang="ja">
      <body>
      <Toptitle/>
      <Title headline="研究メンバーについて"/>
        {children} 
        <Footer />
      </body>
      </html>
    );
  }
  