import Toptitle from "../components/toptitle/toptitle"
import Navigation from "../components/navigation/navigation"
import TopBord from "../components/top_bord/top_bord"
import Newscardlist from "../components/newscardlist/newscardlist"
import ProjectCardList from "../components/projectcardlist/projectcardlist"
import TopPageContent from "../components/TopPageContent/TopPageContent"
import InternalNavigation from "../components/InternalNavigation/InternalNavigation"
import ResearchStickyHeader from "../components/ResearchStickyHeader/ResearchStickyHeader"
import Parser from "rss-parser"

export const revalidate = 60

export default async function TopPage() {
  const parser = new Parser({
    customFields: {
      item: [
        ["note:creatorImage", "creatorImage"],
        ["media:thumbnail", "thumbnail"],
      ],
    },
  })

  const feed = await parser.parseURL("https://note.com/csrc/rss")

  const articles = feed.items
    .filter((item) => item.title?.includes("お知らせ"))
    .map((item) => ({
      date: item.pubDate ?? "日付不明",
      title: item.title,
      link: item.link,
    }))

  const projectArticles = feed.items
    .filter((item) => item.title?.includes("project"))
    .map((item) => ({
      date: item.pubDate ?? "日付不明",
      title: item.title,
      thumbnail: item.thumbnail || "/sample_project.jpg",
      creatorImage: item.creatorImage || "/default_user.jpg",
      link: item.link,
    }))

  return (
    <main>
      <Toptitle />
      <InternalNavigation />
      <ResearchStickyHeader
        pageTitles={[
          "シチズンサイエンスについて　/　研究業績　/　研究メンバーについて",
          "お知らせ",
          "現在進行中のプロジェクト",
        ]}
        subtitleIds={["subtitle0", "subtitle1", "subtitle2"]}
      />
      <div className="heroSection">
        <div className="canvasWrapper" id="topPageContent">
          <TopPageContent />
        </div>
      </div>

      <Navigation
        navicopy="はじめに"
        naviname="シチズンサイエンスについて"
        naviexplanation="シチズンサイエンスってそもそもなんなのかと、ご説明します"
        link="/about"
        imagePath="/go 1 a.png"
        imageHoverPath="/go 1 b.png"
      />

      <Navigation
        navicopy="つぎに"
        naviname="研究業績"
        naviexplanation="論文、学会発表、書籍など当センターの研究業績のアーカイブをご覧いただけます。"
        link="/research"
        imagePath="/go 1 a.png"
        imageHoverPath="/go 1 b.png"
      />

      <Navigation
        navicopy="それでは"
        naviname="研究メンバーについて"
        naviexplanation={`研究所に現在在籍するメンバーについてご紹介します。
また、研究メンバーの募集についてもこちらに記載しています。`}
        link="/member"
        imagePath="/go 3 a.png"
        imageHoverPath="/go 3 b.png"
      />

      <div id="subtitle1" className="anchorSection">
        <TopBord bordname="お知らせ" notelink="noteへ" />
      </div>
      <Newscardlist data={articles} />

      <div id="subtitle2" className="anchorSection">
        <TopBord bordname="現在進行中のプロジェクト" notelink="noteへ" />
      </div>
      <ProjectCardList data={projectArticles} />
    </main>
  )
}
