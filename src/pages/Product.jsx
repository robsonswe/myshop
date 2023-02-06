import { useEffect, useState } from "react";

import { AiFillTag, AiOutlineShoppingCart } from "react-icons/ai";
import { useParams } from "react-router-dom";

import Layout from "./components/layout";
import Rating from "./components/rating";

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/comments?limit=10");
      const data = await res.json();
      setComments(data.comments);
    };

    fetchData();
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold">User Reviews</h1>
      <ul className="flex flex-col gap-2">
        {comments.map((comment) => (
          <li key={comment.id}>
            <hr />
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-1">
                <h2 className="font-bold">lorem ipsum</h2>
                (01/01/2020)
              </div>
              <Rating stars={4} />
            </div>
            <h3 className="italic">{comment.user.username}</h3>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Product() {
  const { productId } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchData();
  }, []);

  /*
  if (!product[productId]) {
    return redirect("/error");
  }
*/
  return (
    <Layout title={product.title}>
      <div className="flex flex-col gap-4">
        <section className="mt-2 flex flex-row gap-4">
          <div className="flex h-80 w-96 items-center justify-center border border-black">
            {product.images && (
              <img
                src={product.images[0]}
                alt=""
                className="aspect-auto h-80 w-96"
              />
            )}
          </div>
          <div>
            <div>
              <h2 className="text-xl font-bold">{product.title}</h2>
              <Rating stars={4} />
            </div>
            <div>
              <h3 className="text-xl">${product.price}</h3>
              <p>{product.description}</p>
              <div className="flex flex-row gap-2">
                <button className="flex w-36 flex-row items-center justify-center gap-2 rounded-sm border border-black bg-red-500 p-2 text-sm font-bold text-white">
                  <AiOutlineShoppingCart /> ADD TO CART
                </button>
                <button className="flex w-36 flex-row items-center justify-center gap-2 rounded-sm border border-black bg-red-500 p-2 text-sm font-bold text-white">
                  <AiFillTag /> BUY
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </section>
        <Comments />
      </div>
    </Layout>
  );
}
