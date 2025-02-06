import { BsCart4 } from "react-icons/bs"
import PulseLoader from "react-spinners/PulseLoader"
import Layout from "../components/layout"
import { catTitle, Rating } from "../components/helpers"
import Redirect from "../components/link"
import { useProducts, useCategoryImage, useCategories } from "../hooks/hooks"

function OfferCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img src={product.thumbnail || "/placeholder.svg"} alt={product.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{product.title}</h3>
        <Rating stars={product.rating} />
        <p className="text-gray-600 mt-2">${product.price}</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
          <BsCart4 className="mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  )
}

function Offers({ type }) {
  const { products, error } = useProducts(10)

  if (error) {
    return <div>Error loading products. Please try again later.</div>
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">{type}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Redirect to={`/product/${product.id}`} key={product.id}>
            <OfferCard product={product} />
          </Redirect>
        ))}
      </div>
    </section>
  )
}

function CategoryImage({ categoryName }) {
  const { image, loading } = useCategoryImage(categoryName)

  return loading ? (
    <PulseLoader size={10} aria-label="Loading Spinner" data-testid="loader" />
  ) : (
    <img src={image || "/placeholder.svg"} alt={categoryName} className="w-full h-full object-cover" />
  )
}

function Categories() {
  const categories = useCategories()

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Redirect to={`/category/${category}`} key={category}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-48 overflow-hidden">
                <CategoryImage categoryName={category} />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-center">{catTitle(category)}</h3>
              </div>
            </div>
          </Redirect>
        ))}
      </div>
    </section>
  )
}

export default function Index() {
  return (
    <Layout title="Home">
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-blue-600 text-white rounded-lg p-8 mb-8">
            <h1 className="text-4xl font-bold mb-4">Summer Sale</h1>
            <p className="text-xl">Up to 50% off on selected items. Shop now!</p>
          </div>
          <Offers type="Featured Products" />
          <Categories />
          <Offers type="Best Sellers" />
          <Offers type="New Arrivals" />
        </div>
      </div>
    </Layout>
  )
}