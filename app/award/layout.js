import Toptitle from "../components/toptitle/toptitle";
import Title from "../components/title/title";
import Achievement from "../components/achievement/achievement";

export default function AwardLayout({ children }) {
  return (
    <>
      <Toptitle />
      <Title headline="研究業績" />
      <Achievement />
      {children}
    </>
  );
}
