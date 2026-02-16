// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 除外リスト：API, 画像, Next.jsの内部ファイルなどは何もしない
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // ファイル拡張子がある場合（画像など）
  ) {
    return;
  }

  // 2. 英語ページ (/en/...) へのアクセスはそのまま通す
  if (pathname.startsWith('/en')) {
    return;
  }

  // 3. 日本語ページ (/jp/...) に直接アクセスされたら、/jp なしにリダイレクト（正規化）
  // 例: /jp/about -> /about
  if (pathname.startsWith('/jp')) {
    const newUrl = new URL(pathname.replace('/jp', ''), request.url);
    return NextResponse.redirect(newUrl);
  }

  // 4. それ以外（/about など）は、裏側で /jp をつけて処理させる（リライト）
  // URLは /about のまま、中身は /jp/about (app/[lang]/about/page.js) を使う
  return NextResponse.rewrite(new URL(`/jp${pathname}`, request.url));
}

export const config = {
  // ミドルウェアを適用するパスのパターン
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};