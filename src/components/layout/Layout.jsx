import Footer from "@/components/layout/Footer"
import Head from "@/components/ui/Head"
import Header from "@/components/layout/Header"

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
