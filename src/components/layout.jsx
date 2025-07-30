import Footer from "@/components/Footer"
import Head from "@/components/head"
import Header from "@/components/Header"

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
