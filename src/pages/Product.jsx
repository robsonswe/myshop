import {
  AiFillStar,
  AiFillTag,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { redirect, useParams } from "react-router-dom";

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

import Layout from "./components/layout";
export default function Product() {
  const { productName } = useParams();

  if (!products.includes(productName)) {
    return redirect("/error");
  }

  return (
    <Layout title={productName}>
      <div className="flex flex-col gap-4">
        <section className="mt-2 flex flex-row gap-4">
          <div className="flex h-80 w-96 items-center justify-center border border-black">
            IMAGE
          </div>
          <div>
            <div>
              <h2 className="text-xl font-bold">{productName}</h2>
              <div className="flex flex-row">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
            </div>
            <div>
              <h3 className="text-xl">$00.00</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Mollitia voluptate modi cum veritatis, voluptas minus id dolor
                impedit voluptatem, officiis repellendus perspiciatis nisi totam
                cumque? Illo vitae dolore eius ratione. Eius, voluptate veniam
                officiis et accusamus ea exercitationem soluta cum? Eos
                reiciendis ex autem laborum. Iste, deleniti perferendis.
                Excepturi recusandae repellendus ad illum non expedita sit iusto
                eum doloremque veniam! Consectetur, soluta et ullam doloremque
                voluptatem sapiente inventore! Molestiae ipsa cupiditate illo
                officiis maxime cum, eveniet possimus aspernatur incidunt
                praesentium accusamus magni totam dolorum nesciunt, dolorem
                eligendi quod nemo earum! Porro, enim officia minus dolor
                similique harum iure iusto ad nulla illum suscipit accusantium
                numquam ex praesentium itaque asperiores accusamus obcaecati,
                illo ullam expedita nam voluptatibus sequi modi soluta! Dolore?
              </p>
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
        <section>
          <h1 className="text-2xl font-bold">User Reviews</h1>
          <ul className="flex flex-col gap-2">
            <li>
              <hr />
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-1">
                  <h2 className="font-bold">lorem ipsum</h2>
                  (01/01/2020)
                </div>
                <div className="flex flex-row">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
              </div>
              <h3 className="italic">Anonym user</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                quam voluptates autem cupiditate voluptate perspiciatis
                laboriosam repellat iure debitis aperiam quas odit non ratione,
                ea provident numquam explicabo accusantium ipsam? Recusandae,
                aliquam veritatis nihil aliquid voluptatem eos ut ipsum eius eum
                debitis incidunt commodi sequi voluptas consequatur quas
                voluptatum, ipsa id nobis reprehenderit, cupiditate unde
                deserunt suscipit ducimus. Ullam, quae. Quod veritatis molestias
                dignissimos praesentium architecto nam autem itaque
                necessitatibus, enim eveniet, aliquam cumque nemo? Maxime neque
                eius, quo sapiente cumque provident ipsa mollitia ullam dolorum,
                laborum saepe error ad!
              </p>
            </li>
            <li>
              <hr />
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-1">
                  <h2 className="font-bold">lorem ipsum</h2>
                  (01/01/2020)
                </div>
                <div className="flex flex-row">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
              </div>
              <h3 className="italic">Anonym user</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                quam voluptates autem cupiditate voluptate perspiciatis
                laboriosam repellat iure debitis aperiam quas odit non ratione,
                ea provident numquam explicabo accusantium ipsam? Recusandae,
                aliquam veritatis nihil aliquid voluptatem eos ut ipsum eius eum
                debitis incidunt commodi sequi voluptas consequatur quas
                voluptatum, ipsa id nobis reprehenderit, cupiditate unde
                deserunt suscipit ducimus. Ullam, quae. Quod veritatis molestias
                dignissimos praesentium architecto nam autem itaque
                necessitatibus, enim eveniet, aliquam cumque nemo? Maxime neque
                eius, quo sapiente cumque provident ipsa mollitia ullam dolorum,
                laborum saepe error ad!
              </p>
            </li>
            <li>
              <hr />
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-1">
                  <h2 className="font-bold">lorem ipsum</h2>
                  (01/01/2020)
                </div>
                <div className="flex flex-row">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
              </div>
              <h3 className="italic">Anonym user</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                quam voluptates autem cupiditate voluptate perspiciatis
                laboriosam repellat iure debitis aperiam quas odit non ratione,
                ea provident numquam explicabo accusantium ipsam? Recusandae,
                aliquam veritatis nihil aliquid voluptatem eos ut ipsum eius eum
                debitis incidunt commodi sequi voluptas consequatur quas
                voluptatum, ipsa id nobis reprehenderit, cupiditate unde
                deserunt suscipit ducimus. Ullam, quae. Quod veritatis molestias
                dignissimos praesentium architecto nam autem itaque
                necessitatibus, enim eveniet, aliquam cumque nemo? Maxime neque
                eius, quo sapiente cumque provident ipsa mollitia ullam dolorum,
                laborum saepe error ad!
              </p>
            </li>
            <li>
              <hr />
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-1">
                  <h2 className="font-bold">lorem ipsum</h2>
                  (01/01/2020)
                </div>
                <div className="flex flex-row">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
              </div>
              <h3 className="italic">Anonym user</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                quam voluptates autem cupiditate voluptate perspiciatis
                laboriosam repellat iure debitis aperiam quas odit non ratione,
                ea provident numquam explicabo accusantium ipsam? Recusandae,
                aliquam veritatis nihil aliquid voluptatem eos ut ipsum eius eum
                debitis incidunt commodi sequi voluptas consequatur quas
                voluptatum, ipsa id nobis reprehenderit, cupiditate unde
                deserunt suscipit ducimus. Ullam, quae. Quod veritatis molestias
                dignissimos praesentium architecto nam autem itaque
                necessitatibus, enim eveniet, aliquam cumque nemo? Maxime neque
                eius, quo sapiente cumque provident ipsa mollitia ullam dolorum,
                laborum saepe error ad!
              </p>
            </li>
            <li>
              <hr />
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-1">
                  <h2 className="font-bold">lorem ipsum</h2>
                  (01/01/2020)
                </div>
                <div className="flex flex-row">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
              </div>
              <h3 className="italic">Anonym user</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                quam voluptates autem cupiditate voluptate perspiciatis
                laboriosam repellat iure debitis aperiam quas odit non ratione,
                ea provident numquam explicabo accusantium ipsam? Recusandae,
                aliquam veritatis nihil aliquid voluptatem eos ut ipsum eius eum
                debitis incidunt commodi sequi voluptas consequatur quas
                voluptatum, ipsa id nobis reprehenderit, cupiditate unde
                deserunt suscipit ducimus. Ullam, quae. Quod veritatis molestias
                dignissimos praesentium architecto nam autem itaque
                necessitatibus, enim eveniet, aliquam cumque nemo? Maxime neque
                eius, quo sapiente cumque provident ipsa mollitia ullam dolorum,
                laborum saepe error ad!
              </p>
            </li>
            <li>
              <hr />
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-1">
                  <h2 className="font-bold">lorem ipsum</h2>
                  (01/01/2020)
                </div>
                <div className="flex flex-row">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
              </div>
              <h3 className="italic">Anonym user</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                quam voluptates autem cupiditate voluptate perspiciatis
                laboriosam repellat iure debitis aperiam quas odit non ratione,
                ea provident numquam explicabo accusantium ipsam? Recusandae,
                aliquam veritatis nihil aliquid voluptatem eos ut ipsum eius eum
                debitis incidunt commodi sequi voluptas consequatur quas
                voluptatum, ipsa id nobis reprehenderit, cupiditate unde
                deserunt suscipit ducimus. Ullam, quae. Quod veritatis molestias
                dignissimos praesentium architecto nam autem itaque
                necessitatibus, enim eveniet, aliquam cumque nemo? Maxime neque
                eius, quo sapiente cumque provident ipsa mollitia ullam dolorum,
                laborum saepe error ad!
              </p>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
