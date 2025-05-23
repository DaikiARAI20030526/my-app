import Toptitle from "../components/toptitle/toptitle";
import Title from "../components/title/title";
import Achievement from "../components/achievement/achievement";

export default function ConferenceLayout({ children }) {
  return (
    <>
      <Toptitle />
      <Title headline="会議・コンファレンス" />
      <Achievement />
      {children}
    </>
  );
}
