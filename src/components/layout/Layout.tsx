import Footer from "@/components/layout/Footer"
import Head from "@/components/ui/Head"
import Header from "@/components/layout/Header"
import { ReactNode } from "react";

interface LayoutProps {
  title: string;
  children: ReactNode
}

export default function Layout({ title = "Undefined", children }: LayoutProps) {
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
