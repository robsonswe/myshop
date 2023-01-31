import Head from "./head";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ title = "Undefined", children }) {
  return (
    <>
      <Head title={title} />
      <div className="grid grid-rows-layout h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
