import { useEffect, useState } from "react"
import { AiFillTag, AiOutlineShoppingCart } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { Rating } from "../components/helpers"
import Layout from "../components/layout"

function ImageGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div>
      <img src={mainImage || "/placeholder.svg"} alt="Product" className="w-full h-96 object-cover rounded-lg mb-4" />
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Product thumbnail ${index + 1}`}
            className="w-20 h-20 object-cover rounded-md cursor-pointer"
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  )
}

function ProductDetails({ product }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <div className="flex items-center mb-4">
        <Rating stars={product.rating} />
        <span className="ml-2 text-gray-600">({product.rating.toFixed(1)})</span>
      </div>
      <p className="text-2xl font-semibold mb-4">${product.price}</p>
      <p className="text-gray-700 mb-6">{product.description}</p>
      <div className="flex space-x-4">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
          <AiOutlineShoppingCart className="mr-2" /> Add to Cart
        </button>
        <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
          <AiFillTag className="mr-2" /> Buy Now
        </button>
      </div>
    </div>
  )
}

function Comments({ rating }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/comments?limit=10")
      const data = await res.json()
      setComments(data.comments)
    }

    fetchData()
  }, [])

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">User Reviews</h2>
      <ul className="space-y-6">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold">{comment.user.username}</h3>
                <p className="text-sm text-gray-600">January 1, 2023</p>
              </div>
              <Rating stars={rating} />
            </div>
            <p className="text-gray-700">{comment.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function Product() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://dummyjson.com/products/${productId}`)
      const data = await res.json()
      setProduct(data)
    }

    fetchData()
  }, [productId])

  if (!product) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={product.title}>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <ImageGallery images={product.images} />
              </div>
              <div className="md:w-1/2">
                <ProductDetails product={product} />
              </div>
            </div>
          </div>
          <Comments rating={product.rating} />
        </div>
      </div>
    </Layout>
  )
}

