export default function TopLayout({ children }) {
  return (
    // このレイアウトでは <html>/<body> は書かず、
    // ルートレイアウトがくるまれている想定です
    <>
      {children}
    </>
  )
}
