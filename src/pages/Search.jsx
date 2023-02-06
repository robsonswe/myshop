import Layout from "./components/layout";

import { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { useParams } from "react-router-dom";

import { catTitle, Rating } from "./components/helpers";
import Redirect from "./components/link";

function Products({ item }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${item}`
      );
      const data = await res.json();
      setProducts(data.products);
    };

    fetchData();
  }, [item]);

  if (products.length === 0) {
    return (
      <p>
        We could not find any items with the term{" "}
        <span className="font-bold">{item}</span>
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-2 p-2">
      <ul className="flex flex-row flex-wrap items-center justify-start gap-5">
        {products.map((product) => (
          <Redirect to={`/product/${product.id}`} key={product.id}>
            <li
              className="flex flex-col items-start rounded border border-black p-2"
              key={product.id}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="aspect-auto h-52 w-52"
              />
              <h3 className="font-bold">{product.title}</h3>
              <Rating stars={product.rating} />
              <p>Price: ${product.price}</p>
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

export default function Search() {
  const { productName } = useParams();

  return (
    <Layout title={catTitle(productName)}>
      <div className="mt-2 flex flex-row gap-4">
        <div className="rounded-sm bg-white p-3">
          <div>
            <h3 className="font-bold">Ratings</h3>
            <Rating stars={5} />
            <Rating stars={4} />
            <Rating stars={3} />
            <Rating stars={2} />
            <Rating stars={1} />
          </div>
        </div>
        <Products item={productName} />
      </div>
    </Layout>
  );
}
