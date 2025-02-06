import React from "react";
import { BsCart4, BsArrowRight, BsHeart } from "react-icons/bs";
import PulseLoader from "react-spinners/PulseLoader";
import Layout from "../components/layout";
import { Rating, catTitle } from "../components/helpers";
import Redirect from "../components/link";
import { useProducts, useCategoryImage, useCategories } from "../hooks/hooks";

const Card = ({ children, className = "" }) => (
  <div className={`group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg ${className}`}>
    {children}
  </div>
);

const OfferCard = ({ product }) => (
  <Card>
    <div className="aspect-square overflow-hidden bg-gray-50 relative">
      <img
        src={product.thumbnail || "/placeholder.svg"}
        alt={product.title}
        className="w-full h-full object-cover transition-transform group-hover:scale-110"
      />
      <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition">
        <BsHeart className="w-5 h-5 text-gray-600" />
      </button>
    </div>
    <div className="p-4">
      <h3 className="font-medium text-lg line-clamp-2">{product.title}</h3>
      <div className="flex justify-between items-center mt-2">
        <Rating stars={product.rating} />
        <span className="text-lg font-bold text-blue-600">${product.price}</span>
      </div>
      <button className="mt-3 w-full bg-blue-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition">
        <BsCart4 className="text-lg" /> <span>Add to Cart</span>
      </button>
    </div>
  </Card>
);

const SectionHeader = ({ title, viewAll }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">{title}</h2>
    {viewAll && (
      <Redirect to={viewAll}>
        <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2 transition">
          View All <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </Redirect>
    )}
  </div>
);

const Offers = ({ type }) => {
  const { products, error } = useProducts(8);

  return (
    <section className="py-12">
      <SectionHeader title={type} viewAll="/products" />
      {error ? (
        <div className="text-center p-8 text-gray-600 bg-gray-50 rounded-xl">Error loading products.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Redirect to={`/product/${product.id}`} key={product.id}>
              <OfferCard product={product} />
            </Redirect>
          ))}
        </div>
      )}
    </section>
  );
};

const CategoryCard = ({ category }) => {
  const { image, loading } = useCategoryImage(category);
  return (
    <Card className="aspect-square">
      {loading ? (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <PulseLoader size={10} />
        </div>
      ) : (
        <>
          <img src={image || "/placeholder.svg"} alt={category} className="w-full h-full object-cover group-hover:scale-110 transition" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <h3 className="text-white text-xl font-bold">{catTitle(category)}</h3>
          </div>
        </>
      )}
    </Card>
  );
};

const Categories = () => {
  const categories = useCategories();
  return (
    <section className="py-12">
      <SectionHeader title="Shop by Category" viewAll="/categories" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.slice(0, 4).map((category) => (
          <Redirect to={`/category/${category}`} key={category}>
            <CategoryCard category={category} />
          </Redirect>
        ))}
      </div>
    </section>
  );
};

const HeroSection = () => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-12 text-white">
    <h1 className="text-4xl font-bold">Summer Sale Is Live</h1>
    <p className="text-xl mt-4 max-w-lg">Up to 50% off on selected items. Don’t miss out!</p>
    <Redirect to="/sale">
      <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
        Shop Now <BsArrowRight className="inline-block ml-2" />
      </button>
    </Redirect>
  </div>
);

export default function Index() {
  return (
    <Layout title="Home">
      <div className="bg-gray-50 min-h-screen px-6 py-8">
        <HeroSection />
        <Categories />
        <Offers type="Featured Products" />
        <Offers type="Best Sellers" />
        <Offers type="New Arrivals" />
      </div>
    </Layout>
  );
}