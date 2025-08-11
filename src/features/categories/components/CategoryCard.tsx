import { BsArrowRight } from "react-icons/bs";
import { useCategoryImage } from "@/features/categories/hooks/useCategoryImage";
import { catTitle } from "@/lib/formatters";
import ScrollToTopLink from "@/components/ui/ScrollToTopLink";
import { Category } from '@/entities/category/model/types';

function CategoryCard({ category, layout = "grid" }: { category: Category; layout?: "grid" | "list" }) {
  const { image, loading } = useCategoryImage(category.slug);

  if (layout === "list") {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-48 aspect-[4/3] sm:aspect-auto">
            <div className={`w-full h-full transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              <img 
                src={image || "/placeholder.svg"} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-xl font-bold mb-2">{catTitle(category.name)}</h3>
              <p className="text-gray-600 mb-4">
                Explore our collection of {category.name.toLowerCase()} products
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
      <div className={`w-full h-full transition-transform group-hover:scale-110 ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <img 
          src={image || "/placeholder.svg"} 
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 group-hover:from-black/80 transition-colors">
        <div>
          <h3 className="text-white text-xl font-bold mb-2">{catTitle(category.name)}</h3>
          <span className="inline-flex items-center text-white/80 text-sm">
            Browse Category
            <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
