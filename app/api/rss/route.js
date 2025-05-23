// app/api/rss/route.js
export async function GET(request) {
    const rssUrl = "https://note.com/rich_hebe819/rss/"; // 元のRSSのURL
    try {
      const res = await fetch(rssUrl);
      if (!res.ok) {
        console.error(`Error fetching RSS: ${res.status} ${res.statusText}`);
        // フォールバック用の RSS コンテンツ
        const fallbackRSS = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Fallback RSS</title>
      <description>No RSS data available (fallback).</description>
      <link>https://note.com/rich_hebe819</link>
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
      const text = await res.text();
      return new Response(text, {
        headers: {
          "Content-Type": "application/rss+xml",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("Fetch error:", error);
      const fallbackRSS = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Fallback RSS</title>
      <description>No RSS data available (fallback due to error).</description>
      <link>https://note.com/rich_hebe819</link>
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
  