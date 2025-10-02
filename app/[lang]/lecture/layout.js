import Toptitle from "../components/toptitle/toptitle";
import Title from "../components/title/title";
import Achievement from "../components/achievement/achievement";

const content = {
  jp: {
    headline: "研究業績",
  },
  en: {
    headline: "Research",
  },
};

export default function AwardLayout({ children, params: { lang } }) {

   const t = content[lang] || content.jp;

  return (
    <>
      <Toptitle />
      <Title headline={t.headline} />
      <Achievement />
      {children}
    </>
  );
}
