import Toptitle from "../components/toptitle/toptitle";
import Title from "../components/title/title";

export default function MemberLayout({ children }) {
  return (
    <>
      <Toptitle />
      <Title headline="研究メンバーについて" />
      {children}
    </>
  );
}
