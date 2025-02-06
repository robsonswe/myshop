import { useEffect, useState } from "react"
import { BsCart4 } from "react-icons/bs"
import { useParams } from "react-router-dom"
import Layout from "../components/layout"
import { Rating } from "../components/helpers"
import Redirect from "../components/link"

function catTitle(str) {
  return str.replace(/-/g, " ").replace(/\b[a-z]/g, (char) => char.toUpperCase())
}

function ProductCard({ product }) {
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

function Products({ category }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://dummyjson.com/products/category/${category}`)
      const data = await res.json()
      setProducts(data.products)
    }

    fetchData()
  }, [category])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Redirect to={`/product/${product.id}`} key={product.id}>
          <ProductCard product={product} />
        </Redirect>
      ))}
    </div>
  )
}

function Sidebar() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Price Range</h4>
        <input type="range" min="0" max="1000" className="w-full" />
        <div className="flex justify-between mt-2">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Ratings</h4>
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center mb-2">
            <input type="checkbox" id={`rating-${stars}`} className="mr-2" />
            <label htmlFor={`rating-${stars}`}>
              <Rating stars={stars} />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Category() {
  const { categoryId } = useParams()

  return (
    <Layout title={catTitle(categoryId)}>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">{catTitle(categoryId)}</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <Sidebar />
            </div>
            <div className="md:w-3/4">
              <Products category={categoryId} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

