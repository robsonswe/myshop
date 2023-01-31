import Layout from "./components/layout";

export default function Index() {
  return (
    <>
      <Layout title={"Index"}>
        <div className="p-2 items-center content-center border flex">
          <p className="self-center">Promotions Images</p>
        </div>
        <div className="p-2 w-screen items-center content-center border">
          <h2 className="font-bold">Promo</h2>
          <ul className="flex flex-row flex-wrap gap-5 items-center justify-center">
            <li>Promo Product 1</li>
            <li>Promo Product 2</li>
            <li>Promo Product 3</li>
            <li>Promo Product 4</li>
            <li>Promo Product 5</li>
            <li>Promo Product 6</li>
            <li>Promo Product 7</li>
            <li>Promo Product 8</li>
          </ul>
        </div>
        <div className="p-2 w-screen items-center content-center border">
          <h2 className="font-bold">Categories</h2>
          <ul className="flex flex-row flex-wrap gap-5 items-center justify-center">
            <li>Category 1</li>
            <li>Category 2</li>
            <li>Category 3</li>
            <li>Category 4</li>
            <li>Category 5</li>
            <li>Category 6</li>
            <li>Category 7</li>
            <li>Category 8</li>
          </ul>
        </div>
        <div className="p-2 w-screen items-center content-center border">
          <h2 className="font-bold">Best selling</h2>
          <ul className="flex flex-row flex-wrap gap-5 items-center justify-center">
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
            <li>Product 4</li>
            <li>Product 5</li>
            <li>Product 6</li>
            <li>Product 7</li>
            <li>Product 8</li>
          </ul>
        </div>
        <div className="p-2 w-screen items-center content-center border">
          <h2 className="font-bold">New Offers</h2>
          <ul className="flex flex-row flex-wrap gap-5 items-center justify-center">
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
            <li>Product 4</li>
            <li>Product 5</li>
            <li>Product 6</li>
            <li>Product 7</li>
            <li>Product 8</li>
          </ul>
        </div>
      </Layout>
    </>
  );
}
