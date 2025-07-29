import { ArrowRight, Sparkles, TrendingUp, Clock } from "lucide-react"
import Layout from "../components/layout"
import ProductCard from "../components/product-card"
import CategoryCard from "../components/category-card"
import SectionHeader from "../components/section-header"
import Redirect from "../components/link"
import { useProducts, useCategories } from "../hooks/hooks"

const HeroSection = () => (
  <section className="relative overflow-hidden bg-blue-600 rounded-3xl p-8 md:p-12 lg:p-16 text-white mb-16">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
      <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white rounded-full"></div>
    </div>

    <div className="relative z-10 max-w-4xl">
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
        <Sparkles className="w-4 h-4" />
        <span>Limited Time Offer</span>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
        Summer Sale
        <span className="block text-yellow-300">Is Live Now!</span>
      </h1>

      <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
        Discover amazing deals with up to 50% off on selected items. Don't miss out on these incredible savings!
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Redirect
          to="/sale"
          className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>Shop Sale Now</span>
          <ArrowRight className="w-6 h-6" />
        </Redirect>

        <Redirect
          to="/products"
          className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-200 border-2 border-white/20 hover:border-white/40"
        >
          <span>Browse All</span>
        </Redirect>
      </div>
    </div>
  </section>
)

const StatsSection = () => (
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
    {[
      { icon: TrendingUp, title: "1M+", subtitle: "Happy Customers", color: "bg-green-50 text-green-600" },
      { icon: Sparkles, title: "50K+", subtitle: "Products Available", color: "bg-blue-50 text-blue-600" },
      { icon: Clock, title: "24/7", subtitle: "Customer Support", color: "bg-purple-50 text-purple-600" },
    ].map((stat, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300"
      >
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.color} mb-4`}>
          <stat.icon className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.title}</h3>
        <p className="text-gray-600 font-medium">{stat.subtitle}</p>
      </div>
    ))}
  </section>
)

const Categories = () => {
  const categories = useCategories()
  const randomCategories = [...categories].sort(() => Math.random() - 0.5).slice(0, 6)

  return (
    <section className="mb-16">
      <SectionHeader
        title="Shop by Category"
        subtitle="Discover our wide range of product categories"
        viewAll="/categories"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {randomCategories.map((category) => (
          <Redirect to={`/category/${category}`} key={category}>
            <CategoryCard category={category} />
          </Redirect>
        ))}
      </div>
    </section>
  )
}

const ProductSection = ({ type, title, subtitle }) => {
  const getQueryParams = () => {
    switch (type) {
      case "Best Sellers":
        return {
          sortBy: "rating",
          order: "desc",
          limit: 8,
          select: "title,price,rating,thumbnail,brand,discountPercentage,stock",
        }
      case "New Arrivals":
        return {
          sortBy: "id",
          order: "desc",
          limit: 8,
          select: "title,price,rating,thumbnail,brand,discountPercentage,stock",
        }
      case "Featured Products":
        return {
          limit: 8,
          skip: 8,
          select: "title,price,rating,thumbnail,brand,discountPercentage,stock",
        }
      default:
        return { limit: 8 }
    }
  }

  const { products, error } = useProducts(getQueryParams())

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product)
    // Add your cart logic here
  }

  const handleToggleWishlist = (productId, isWishlist) => {
    console.log("Wishlist toggled:", productId, isWishlist)
    // Add your wishlist logic here
  }

  return (
    <section className="mb-16">
      <SectionHeader title={title} subtitle={subtitle} viewAll="/products" />
      {error ? (
        <div className="text-center p-12 bg-gray-50 rounded-2xl">
          <div className="text-gray-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600">We couldn't load the products. Please try again later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Redirect to={`/product/${product.id}`} key={product.id}>
              <ProductCard product={product} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} />
            </Redirect>
          ))}
        </div>
      )}
    </section>
  )
}

export default function Index() {
  return (
    <Layout title="Home">
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <HeroSection />
          <StatsSection />
          <Categories />
          <ProductSection
            type="Featured Products"
            title="Featured Products"
            subtitle="Hand-picked items just for you"
          />
          <ProductSection type="Best Sellers" title="Best Sellers" subtitle="Most popular items among our customers" />
          <ProductSection type="New Arrivals" title="New Arrivals" subtitle="Fresh products added to our collection" />
        </div>
      </div>
    </Layout>
  )
}
