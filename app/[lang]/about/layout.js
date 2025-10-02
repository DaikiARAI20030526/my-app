import Title from "../components/title/title";
import Toptitle from "../components/toptitle/toptitle";

const content = {
  jp: {
    headline: "シチズンサイエンスについて",
  },
  en: {
    headline: "About Citizen Science",
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
