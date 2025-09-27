// app/api/rss/route.js

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const pageUrl     = "https://note.com/csrc";         // スクレイピング元ページ
  const fixedRssUrl = "https://note.com/csrc/rss/";    // フォールバック用固定RSS

  try {
    // 1) ページHTMLを取得
    const pageRes = await fetch(pageUrl, { cache: 'no-store' });
    if (!pageRes.ok) {
      throw new Error(`Page fetch failed: ${pageRes.status} ${pageRes.statusText}`);
    }
    const pageText = await pageRes.text();

    // 2) <atom:link rel="self" … href="…"> を正規表現で抜き出し
    const match = pageText.match(
      /<atom:link[^>]+rel="self"[^>]+href="([^"]+)"/
    );
    const candidate = match?.[1] ?? "";

    // 3) candidate に "/csrc/" が含まれていればそれを使い、そうでなければ固定URLを使う
    const rssUrl = candidate.includes("/csrc/")
      ? candidate
      : fixedRssUrl;

    // 4) RSS を取得
    const res = await fetch(rssUrl, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`RSS fetch failed: ${res.status} ${res.statusText}`);
    }
    const text = await res.text();

    // 5) そのまま返却
    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml",
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (error) {
    console.error("Fetch error:", error);

    // フォールバック用の最小RSS
    const fallbackRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Fallback RSS</title>
    <description>No RSS data available (fallback due to error).</description>
    <link>https://note.com/csrc</link>
  </channel>
</rss>`;

    return new Response(fallbackRSS, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
