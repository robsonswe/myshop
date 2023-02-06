import Layout from "./components/layout";

import { useEffect, useState } from "react";

import { BsCart4 } from "react-icons/bs";
import Redirect from "./components/link";

function catTitle(str) {
  return str
    .replace(/-/g, " ")
    .replace(/\b[a-z]/g, (char) => char.toUpperCase());
}

function Offers({ type }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/products?limit=10");
      const data = await res.json();
      setProducts(data.products);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2">
      <h2 className="text-lg font-bold">{type}</h2>
      <ul className="flex flex-row flex-wrap items-center justify-start gap-5">
        {products.map((product) => (
          <Redirect to={`/product/${product.id}`} key={product.id}>
            <li className="flex flex-col items-start rounded border border-black p-2">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="aspect-auto h-52 w-52"
              />
              <h3 className="font-bold">{product.title}</h3>
              <p>Price: $00.00</p>
              <button className="flex w-full items-center justify-center gap-2 rounded border bg-slate-500 p-1 font-bold text-white hover:bg-slate-700">
                <BsCart4 /> Buy
              </button>
            </li>
          </Redirect>
        ))}
      </ul>
    </div>
  );
}

function CategoryImage({ categoryName }) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://dummyjson.com/products/category/${categoryName}?limit=1`
      );
      const data = await res.json();
      setCategory(data);
    };

    fetchData();
  }, []);

  return category.length > 0 ? (
    <img src={category[0].image} alt={category[0].name} />
  ) : (
    <div>Loading...</div>
  );
}

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2">
      <h2 className="text-lg font-bold">Categories</h2>
      <ul className="flex flex-row flex-wrap items-center justify-start gap-5">
        {categories.map((category) => (
          <Redirect to={`/category/${category}`} key={category}>
            <li className="flex flex-col items-center gap-2 rounded border border-black p-5">
              <h3 className="font-bold">{catTitle(category)}</h3>
              <div className="flex h-52 w-52 items-center justify-center border border-black text-center">
                <CategoryImage categoryName={category} />
              </div>
            </li>
          </Redirect>
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
