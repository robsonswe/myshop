"use client"

import { useState } from "react"
import { ShoppingCart, Heart, Star, StarHalf } from "lucide-react"

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const [isWishlist, setIsWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const originalPrice =
    product.discountPercentage > 0 ? Math.round(product.price / (1 - product.discountPercentage / 100)) : null

  const handleWishlistClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsWishlist(!isWishlist)
    onToggleWishlist?.(product.id, !isWishlist)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onAddToCart?.(product)
    }, 500)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.thumbnail || "/placeholder.svg?height=300&width=300"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlist ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2 hover:bg-gray-50 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
            <span>{isLoading ? "Adding..." : "Quick Add"}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand & Title */}
        <div className="mb-3">
          {product.brand && (
            <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md">{product.brand}</span>
          )}
          <h3 className="font-semibold text-gray-900 text-lg mt-2 line-clamp-2 leading-tight">{product.title}</h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-500">({product.rating})</span>
        </div>

        {/* Price & Stock */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {originalPrice && <span className="text-lg text-gray-400 line-through">${originalPrice}</span>}
          </div>
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              product.stock < 10 ? "text-red-700 bg-red-50" : "text-green-700 bg-green-50"
            }`}
          >
            {product.stock < 10 ? `${product.stock} left` : "In Stock"}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <ShoppingCart className="w-5 h-5" />
          )}
          <span>{isLoading ? "Adding..." : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
