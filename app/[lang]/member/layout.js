import Toptitle from "../components/toptitle/toptitle";
import Title from "../components/title/title";

const content = {
  jp: {
    headline: "研究メンバーについて",
  },
  en: {
    headline: "About Research Members",
  },
};


export default function AwardLayout({ children, params: { lang } }) {

   const t = content[lang] || content.jp;
  return (
    <>
      <Toptitle />
      <Title headline={t.headline} />
      {children}
    </>
  );
}
