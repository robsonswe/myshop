import PulseLoader from "react-spinners/PulseLoader"
import { useCategoryImage } from "@/hooks/hooks"
import { catTitle } from "@/components/helpers"

const CategoryCard = ({ category }) => {
  const { image, loading } = useCategoryImage(category)

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 aspect-square">
      {loading ? (
        <div className="flex items-center justify-center h-full bg-gray-50">
          <PulseLoader size={8} color="#3B82F6" />
        </div>
      ) : (
        <>
          <div className="relative overflow-hidden h-full">
            <img
              src={image || "/placeholder.svg?height=300&width=300"}
              alt={category}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
          </div>

          <div className="absolute inset-0 flex items-end p-6">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {catTitle(category)}
              </h3>
              <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                Explore collection
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CategoryCard
