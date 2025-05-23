import Title from "../components/title/title";
import Toptitle from "../components/toptitle/toptitle";

export default function AboutLayout({ children }) {
  return (
    <>
      <Toptitle />
      <Title headline="シチズンサイエンスについて" />
      {children}
    </>
  );
}
