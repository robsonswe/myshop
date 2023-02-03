import Layout from "./components/layout";

import { BsCart4 } from "react-icons/bs";

let products = [
  "Product 1",
  "Product 2",
  "Product 3",
  "Product 4",
  "Product 5",
  "Product 6",
  "Product 7",
  "Product 8",
];

function Offers({ type }) {
  return (
    <div className="flex flex-col gap-2 p-2">
      <h2 className="text-lg font-bold">{type}</h2>
      <ul className="flex flex-row flex-wrap items-center justify-start gap-5">
        {products.map((product) => (
          <a href={`./product/${product}`} key={product}>
            <li className="flex flex-col items-start rounded border border-black p-2">
              <div className="flex h-52 w-52 items-center justify-center border border-black text-center">
                Placeholder Image
              </div>
              <h3 className="font-bold">{product}</h3>
              <p>Price: $00.00</p>
              <button className="flex w-full items-center justify-center gap-2 rounded border bg-slate-500 p-1 font-bold text-white">
                <BsCart4 /> Buy
              </button>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
}

function Categories() {
  let categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
  ];
  return (
    <div className="flex flex-col gap-2 p-2">
      <h2 className="text-lg font-bold">Categories</h2>
      <ul className="flex flex-row flex-wrap items-center justify-start gap-5">
        {categories.map((category) => (
          <li
            key={category}
            className="flex flex-col items-center gap-2 rounded border border-black p-5"
          >
            <h3 className="font-bold">{category}</h3>
            <div className="flex h-52 w-52 items-center justify-center border border-black text-center">
              Placeholder Image
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Index() {
  return (
    <>
      <Layout title={"Index"}>
        <div className="flex flex-col gap-5 bg-slate-200 py-2">
          <div className="p-2">
            <div className="flex h-36 items-center justify-center border border-black text-center">
              Offers Banner
            </div>
          </div>
          <Offers type={"Promos"} />
          <Categories />
          <Offers type={"Best Selling"} />
          <Offers type={"New Offers"} />
        </div>
      </Layout>
    </>
  );
}
