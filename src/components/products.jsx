import { useState, useEffect } from 'react'
import { BsCart4, BsStarFill, BsStarHalf, BsStar, BsHeart, BsHeartFill } from 'react-icons/bs'

const PriceRangeFilter = ({ min, max, value, onChange }) => (
  <div className="mb-6">
    <h4 className="font-semibold mb-2">Price Range</h4>
    <div className="flex items-center gap-4">
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-blue-600" 
      />
      <span className="text-sm text-gray-600">Up to ${value}</span>
    </div>
  </div>
)

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) return <BsStarFill key={i} className="text-yellow-400" />
        if (i === fullStars && hasHalfStar) return <BsStarHalf key={i} className="text-yellow-400" />
        return <BsStar key={i} className="text-yellow-400" />
      })}
      <span className="ml-1 text-sm text-gray-600">({rating})</span>
    </div>
  )
}

const ProductCard = ({ product }) => {
  const [isWishlist, setIsWishlist] = useState(false)
  const stockStatus = product.stock < 10 ? 'Low Stock' : 'In Stock'
  const stockClass = product.stock < 10 ? 'text-red-600' : 'text-green-600'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative">
        <img 
          src={product.thumbnail || "/placeholder.svg"} 
          alt={product.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
        />
        <button 
          onClick={(e) => {
            e.preventDefault()
            setIsWishlist(!isWishlist)
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          {isWishlist ? (
            <BsHeartFill className="text-red-500" />
          ) : (
            <BsHeart className="text-gray-600" />
          )}
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate flex-1">{product.title}</h3>
          <span className="text-sm font-medium text-gray-500">{product.brand}</span>
        </div>
        <RatingStars rating={product.rating} />
        <div className="mt-2 flex justify-between items-center">
          <div>
            <p className="text-lg font-bold text-blue-600">${product.price}</p>
            {product.discountPercentage > 0 && (
              <p className="text-sm text-red-500">-{Math.round(product.discountPercentage)}% OFF</p>
            )}
          </div>
          <span className={`text-sm ${stockClass}`}>{stockStatus}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <BsCart4 /> Add to Cart
        </button>
      </div>
    </div>
  )
}

const Sidebar = ({ onPriceChange, onRatingChange, selectedRatings, maxPrice, currentPrice }) => (
  <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
    <h3 className="font-bold text-lg mb-4">Filters</h3>
    <PriceRangeFilter 
      min={0} 
      max={maxPrice} 
      value={currentPrice}
      onChange={onPriceChange}
    />
    <div>
      <h4 className="font-semibold mb-2">Minimum Rating</h4>
      {[5, 4, 3, 2, 1].map((stars) => (
        <div key={stars} className="flex items-center mb-2">
          <input 
            type="checkbox" 
            id={`rating-${stars}`} 
            checked={selectedRatings.includes(stars)}
            onChange={() => onRatingChange(stars)}
            className="mr-2" 
          />
          <label htmlFor={`rating-${stars}`} className="flex items-center">
            <RatingStars rating={stars} />
          </label>
        </div>
      ))}
    </div>
  </div>
)

const ProductListing = ({ fetchUrl, title }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [currentPrice, setCurrentPrice] = useState(1000)
  const [selectedRatings, setSelectedRatings] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(fetchUrl)
        const data = await res.json()
        setProducts(data.products)
        const highestPrice = Math.max(...data.products.map(p => p.price))
        setMaxPrice(Math.ceil(highestPrice))
        setCurrentPrice(Math.ceil(highestPrice))
      } catch (error) {
        console.error('Error fetching products:', error)
      }
      setLoading(false)
    }

    fetchUrl && fetchData()
  }, [fetchUrl])

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    )
  }

  const filteredProducts = products
    .filter(product => product.price <= currentPrice)
    .filter(product => 
      selectedRatings.length === 0 || 
      selectedRatings.some(rating => Math.floor(product.rating) >= rating)
    )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (products.length === 0) {
    return <p className="text-center text-xl text-gray-600">No products found</p>
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Sidebar 
              onPriceChange={setCurrentPrice}
              onRatingChange={handleRatingChange}
              selectedRatings={selectedRatings}
              maxPrice={maxPrice}
              currentPrice={currentPrice}
            />
          </div>
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-xl text-gray-600">No products match your filters</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListing