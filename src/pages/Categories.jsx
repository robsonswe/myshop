import React, { useState } from 'react';
import { BsSearch, BsArrowRight, BsGrid, BsListUl } from "react-icons/bs";
import Layout from "@/components/layout";
import { catTitle } from "@/components/helpers";
import Redirect from "@/components/link";
import { useCategoryImage, useCategories } from "@/hooks/hooks";

function CategoryCard({ category, layout = "grid" }) {
  const { image, loading } = useCategoryImage(category);
  
  if (layout === "list") {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-48 aspect-[4/3] sm:aspect-auto">
            <img 
              src={image || "/placeholder.svg"} 
              alt={category}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-xl font-bold mb-2">{catTitle(category)}</h3>
              <p className="text-gray-600 mb-4">
                Explore our collection of {category.toLowerCase()} products
              </p>
            </div>
            <Redirect to={`/category/${category}`}>
              <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                Browse Category
                <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Redirect>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-white shadow-sm hover:shadow-lg transition-all">
      <img 
        src={image || "/placeholder.svg"} 
        alt={category}
        className="w-full h-full object-cover transition-transform group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 group-hover:from-black/80 transition-colors">
        <div>
          <h3 className="text-white text-xl font-bold mb-2">{catTitle(category)}</h3>
          <span className="inline-flex items-center text-white/80 text-sm">
            Browse Category
            <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const categories = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [layout, setLayout] = useState("grid");

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Categories">
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Categories</h1>
            <p className="text-gray-600 text-lg mb-6">
              Explore our wide range of product categories
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <div className="relative flex-grow max-w-2xl">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                />
                <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    layout === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <BsGrid className="text-lg" />
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    layout === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <BsListUl className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No categories found matching "{searchTerm}"</h3>
            </div>
          ) : (
            <div className={
              layout === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }>
              {filteredCategories.map((category) => (
                <Redirect to={`/category/${category}`} key={category}>
                  <CategoryCard category={category} layout={layout} />
                </Redirect>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}