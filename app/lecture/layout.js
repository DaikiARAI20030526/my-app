import Toptitle from "../components/toptitle/toptitle";
import Title from "../components/title/title";
import Achievement from "../components/achievement/achievement";
import DynamicStickyHeader from "../components/DynamicStickyHeader/DynamicStickyHeader";

export default function LectureLayout({ children }) {
  return (
    <>
      <Toptitle />
      <Title headline="講演・レクチャー" />
      <Achievement />
      <DynamicStickyHeader />
      {children}
    </>
  );
}
