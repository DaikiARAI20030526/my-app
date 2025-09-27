import { redirect } from 'next/navigation';

export default function RootPage() {
  // デフォルトの言語である日本語ページ（/jp）にリダイレクトする
  redirect('/jp');
}