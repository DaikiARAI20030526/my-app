import Toptitle from "./components/toptitle/toptitle";
import Navigation from "./components/navigation/navigation";
import TopBord from "./components/top_bord/top_bord";
import Newscardlist from "./components/newscardlist/newscardlist";
import ProjectCardList from "./components/projectcardlist/projectcardlist";
import TopPageContent from "./components/TopPageContent/TopPageContent";
import InternalNavigation from "./components/InternalNavigation/InternalNavigation";
import ResearchStickyHeader from "./components/ResearchStickyHeader/ResearchStickyHeader";
import Parser from "rss-parser";

// 1. 日本語と英語のテキストをオブジェクトとして定義
const content = {
  jp: {
    pageTitles: [
      "シチズンサイエンスについて / 研究業績 / 研究メンバーについて",
      "お知らせ",
      "現在進行中のプロジェクト",
    ],
    nav1_copy: "はじめに",
    nav1_name: "シチズンサイエンスについて",
    nav1_explanation: "シチズンサイエンスってそもそもなんなのかと、ご説明します",
    nav1_slug: "about",
    nav2_copy: "つぎに",
    nav2_name: "研究業績",
    nav2_explanation: "論文、学会発表、書籍など当センターの研究業績のアーカイブをご覧いただけます。",
    nav2_slug: "research",
    nav3_copy: "それでは",
    nav3_name: "研究メンバーについて",
    nav3_explanation: `研究所に現在在籍するメンバーについてご紹介します。\nまた、研究メンバーの募集についてもこちらに記載しています。`,
    nav3_slug: "member",
    news_title: "お知らせ",
    projects_title: "現在進行中のプロジェクト",
    note_link: "noteへ",
    news_keyword: "お知らせ",
    project_keyword: "project",

  },
  en: {
    pageTitles: [
      "About Citizen Science / Research / Members",
      "News",
      "Ongoing Projects",
    ],
    nav1_copy: "To begin with",
    nav1_name: "About Citizen Science",
    nav1_explanation: "We will explain what Citizen Science is all about.",
    nav1_slug: "about",
    nav2_copy: "Next",
    nav2_name: "Research Achievements",
    nav2_explanation: "You can view the archive of our center's research achievements, including papers, conference presentations, and books.",
    nav2_slug: "research",
    nav3_copy: "Finally",
    nav3_name: "About Research Members",
    nav3_explanation: "Introducing the current members of the research institute.\nRecruitment for research members is also posted here.",
    nav3_slug: "member",
    news_title: "News",
    projects_title: "Ongoing Projects",
    note_link: "Go to note",
    news_keyword: "Notice", // noteの記事タイトルに含まれる英語キーワードを想定
    project_keyword: "project",
  },
};

export async function generateStaticParams() {
  return [{ lang: 'jp' }, { lang: 'en' }];
}


export const revalidate = 60;

// 2. ページのpropsで `params` を受け取り、`lang` を取得
export default async function TopPage({ params: { lang } }) {
  // 3. URLの言語に応じて、表示するテキストを選択（不正な場合は 'jp' にフォールバック）
  const t = content[lang] || content.jp;

  const parser = new Parser({
    customFields: {
      item: [
        ["note:creatorImage", "creatorImage"],
        ["media:thumbnail", "thumbnail"],
      ],
    },
  });

  const feed = await parser.parseURL("https://note.com/csrc/rss");

  // 4. RSSフィードのフィルタリングも動的に変更
  const articles = feed.items
    .filter((item) => item.title?.includes(t.news_keyword))
    .map((item) => ({
      date: item.pubDate ?? "Date Unknown",
      title: item.title,
      link: item.link,
    }));

  const projectArticles = feed.items
    .filter((item) => item.title?.includes(t.project_keyword))
    .map((item) => ({
      date: item.pubDate ?? "Date Unknown",
      title: item.title,
      thumbnail: item.thumbnail || "/sample_project.jpg",
      creatorImage: item.creatorImage || "/default_user.jpg",
      link: item.link,
    }));

  return (
    <main>
      <Toptitle />
      <InternalNavigation />
      <ResearchStickyHeader
        pageTitles={t.pageTitles}
        subtitleIds={["subtitle0", "subtitle1", "subtitle2"]}
      />
      <div className="heroSection">
        <div className="canvasWrapper" id="topPageContent">
          <TopPageContent />
        </div>
      </div>

      {/* 5. Navigationコンポーネントのリンク先と言語を動的に設定 */}
      <Navigation
        navicopy={t.nav1_copy}
        naviname={t.nav1_name}
        naviexplanation={t.nav1_explanation}
        link={`/${lang}/${t.nav1_slug}`}
        imagePath="/go 1 a.png"
        imageHoverPath="/go 1 b.png"
      />

      <Navigation
        navicopy={t.nav2_copy}
        naviname={t.nav2_name}
        naviexplanation={t.nav2_explanation}
        link={`/${lang}/${t.nav2_slug}`}
        imagePath="/go 1 a.png"
        imageHoverPath="/go 1 b.png"
      />

      <Navigation
        navicopy={t.nav3_copy}
        naviname={t.nav3_name}
        naviexplanation={t.nav3_explanation}
        link={`/${lang}/${t.nav3_slug}`}
        imagePath="/go 1 a.png"
        imageHoverPath="/go 1 b.png"
      />

      <div id="news" className="anchorSection">
        <TopBord bordname={t.news_title} notelink={t.note_link} />
      </div>
      <Newscardlist data={articles} />

      <div id="project" className="anchorSection">
        <TopBord bordname={t.projects_title} notelink={t.note_link} />
      </div>
      <ProjectCardList data={projectArticles} />
    </main>
  );
}