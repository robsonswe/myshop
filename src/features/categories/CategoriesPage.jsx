import React, { useState } from 'react';
import { BsSearch, BsArrowRight, BsGrid, BsListUl } from "react-icons/bs";
import Layout from "@/components/layout/Layout";
import ScrollToTopLink from "@/components/ui/ScrollToTopLink";
import { useCategories } from './hooks/useCategories';
import CategoryCard from './components/CategoryCard';

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
                  className={`p-2 rounded-lg transition-colors ${layout === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <BsGrid className="text-lg" />
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded-lg transition-colors ${layout === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
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
                <ScrollToTopLink to={`/category/${category}`} key={category}>
                  <CategoryCard category={category} layout={layout} />
                </ScrollToTopLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}