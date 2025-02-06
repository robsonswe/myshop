import React, { useState } from "react";
import { BsCart4, BsArrowRight, BsHeart, BsHeartFill, BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import PulseLoader from "react-spinners/PulseLoader";
import Layout from "../components/layout";
import { catTitle } from "../components/helpers";
import Redirect from "../components/link";
import { useProducts, useCategoryImage, useCategories } from "../hooks/hooks";

const Card = ({ children, className = "" }) => (
  <div className={`group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg ${className}`}>
    {children}
  </div>
);

const OfferCard = ({ product }) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const originalPrice = product.discountPercentage > 0 
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : null;

  return (
    <Card>
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-52 object-cover transition-transform group-hover:scale-105"
        />
        
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlist(!isWishlist);
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
        >
          {isWishlist ? (
            <BsHeartFill className="text-red-500 animate-pulse" />
          ) : (
            <BsHeart className="text-gray-600" />
          )}
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate flex-1">{product.title}</h3>
          {product.brand && (
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.brand}</span>
          )}
        </div>

        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => {
            if (i < Math.floor(product.rating)) return <BsStarFill key={i} className="text-yellow-400" />;
            if (i === Math.floor(product.rating) && product.rating % 1 >= 0.5) return <BsStarHalf key={i} className="text-yellow-400" />;
            return <BsStar key={i} className="text-yellow-400" />;
          })}
          <span className="ml-1 text-sm text-gray-500">({product.rating})</span>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-blue-600">${product.price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
            )}
          </div>
          <span className={`text-sm ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
            {product.stock < 10 ? `${product.stock} left` : 'In Stock'}
          </span>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md transition-colors flex items-center justify-center gap-2">
          <BsCart4 className="text-lg" /> Add to Cart
        </button>
      </div>
    </Card>
  );
};

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
  const getQueryParams = () => {
    switch(type) {
      case 'Best Sellers':
        return { 
          sortBy: 'rating', 
          order: 'desc', 
          limit: 8,
          select: 'title,price,rating,thumbnail,brand,discountPercentage,stock' 
        };
      case 'New Arrivals':
        return { 
          sortBy: 'id', 
          order: 'desc', 
          limit: 8,
          select: 'title,price,rating,thumbnail,brand,discountPercentage,stock'
        };
      case 'Featured Products':
        return { 
          limit: 8, 
          skip: 8,
          select: 'title,price,rating,thumbnail,brand,discountPercentage,stock'
        };
      default:
        return { limit: 8 };
    }
  };

  const { products, error } = useProducts(getQueryParams());

  return (
    <section className="py-12">
      <SectionHeader title={type} viewAll="/products" />
      {error ? (
        <div className="text-center p-8 text-gray-600 bg-gray-50 rounded-xl">
          Error loading products.
        </div>
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

  const randomCategories = [...categories]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <section className="py-12">
      <SectionHeader title="Shop by Category" viewAll="/categories" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {randomCategories.map((category) => (
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