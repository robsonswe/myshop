import { useState, useRef, useEffect, FormEvent } from "react"
import { Search, Bell, ShoppingCart, User, ChevronDown, Menu, X, ChevronRight } from "lucide-react"
import ScrollToTopLink from "@/components/ui/ScrollToTopLink"
import { useCategories } from "@/features/categories/hooks/useCategories"
import logo from "@/assets/logo.svg"
import { catTitle } from "@/lib/formatters"

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const categories = useCategories()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (searchTerm) {
      console.log("Searching for:", searchTerm)
    }
  }

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen)
  }


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!megaMenuRef.current) return;
      if (!event.target || !(event.target instanceof Node)) return;

      if (!megaMenuRef.current.contains(event.target)) {
        setIsMegaMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Close mobile menu when switching to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header className="bg-white shadow-lg border-b-2 border-gray-100 sticky top-0 z-50">
      {/* Top promotional bar */}
      <div className="bg-slate-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm font-medium">
            <div className="hidden md:flex items-center space-x-8">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Free shipping on orders over $50
              </span>
              <span>24/7 Customer Support</span>
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-6 ml-auto">
              <a href="#" className="hover:text-yellow-300 transition-colors">
                Track Order
              </a>
              <span>•</span>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ScrollToTopLink to="/" className="group flex items-center space-x-3">
              <img src={logo} alt="MyShop Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-slate-900">MyShop</span>
            </ScrollToTopLink>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSubmit} className="w-full relative group">
              <div className="relative">
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-14 pl-6 pr-16 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-blue-100 transition-all duration-200 text-lg"
                  placeholder="Search for products, brands and more..."
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {/* Mobile search button */}
            <button className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors">
              <Search className="w-6 h-6 text-gray-600" />
            </button>

            {/* Notifications */}
            <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors hidden sm:block">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                2
              </span>
            </button>

            {/* Cart */}
            <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors group">
              <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* User account */}
            <button className="p-3 rounded-xl hover:bg-gray-100 transition-colors hidden sm:block">
              <User className="w-6 h-6 text-gray-600" />
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden mt-6">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-4 pr-12 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-blue-100 transition-all duration-200"
              placeholder="Search products..."
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t border-gray-200 relative">
        <div className="container mx-auto px-4">
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center justify-center space-x-12 py-4">
            <div className="relative" ref={megaMenuRef}>
              <button
                onClick={toggleMegaMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors group"
              >
                <span>All Categories</span>
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180" : ""
                    } group-hover:text-blue-600`}
                />
              </button>
              {isMegaMenuOpen && (
                <div className="absolute left-0 mt-3 w-[40rem] bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Shop by Category</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {categories.map((category) => (
                        <ScrollToTopLink
                          key={category.name}
                          to={`/category/${category.slug}`}
                          className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium border border-transparent hover:border-blue-200"
                        >
                          {catTitle(category.name)}
                        </ScrollToTopLink>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {["New Arrivals", "Best Sellers", "Deals", "Brands"].map((item) => (
              <ScrollToTopLink
                key={item}
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </ScrollToTopLink>
            ))}
          </div>

          {/* --- MOBILE NAVIGATION --- */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden animate-in slide-in-from-top-2 duration-200">
              <div className="p-4 space-y-2">
                {["New Arrivals", "Best Sellers", "Deals", "Brands"].map((item) => (
                  <ScrollToTopLink
                    key={item}
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="block px-4 py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors rounded-xl hover:bg-gray-50"
                  >
                    {item}
                  </ScrollToTopLink>
                ))}
                <div className="border-t border-gray-200 my-2"></div>

                <ScrollToTopLink
                  to="/categories"
                  className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors rounded-xl hover:bg-gray-50"
                >
                  <span>All Categories</span>
                  <ChevronRight className="w-5 h-5" />
                </ScrollToTopLink>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}