import React from 'react';
import { BsArrowRight } from "react-icons/bs";
import { useCategoryImage } from "@/features/categories/hooks/useCategoryImage";
import { catTitle } from "@/lib/formatters";
import ScrollToTopLink from "@/components/ui/ScrollToTopLink";

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
            <ScrollToTopLink to={`/category/${category}`}>
              <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                Browse Category
                <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </ScrollToTopLink>
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

export default CategoryCard
