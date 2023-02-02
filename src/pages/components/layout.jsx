import Footer from "./footer";
import Head from "./head";
import Header from "./header";

export default function Layout({ title = "Undefined", children }) {
  return (
    <>
      <Head title={title} />
      <div className="grid grid-rows-layout">
        <Header />
        <main className="bg-gray-400 px-64">{children}</main>
        <Footer />
      </div>
    </>
  );
}
