import Footer from "./footer"
import Head from "./head"
import Header from "./header"

export default function Layout({ title = "Undefined", children }) {
  return (
    <>
      <Head title={title} />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-white">{children}</main>
        <Footer />
      </div>
    </>
  )
}
