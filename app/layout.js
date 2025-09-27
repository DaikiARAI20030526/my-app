import "./globals.css"
import Footer from "./[lang]/components/footer/footer"

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
