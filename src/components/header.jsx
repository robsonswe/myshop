import { useState, useRef, useEffect } from "react"
import { Form, Link, useNavigate } from "react-router-dom"
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai"
import { BsBell, BsCart, BsChevronDown } from "react-icons/bs"
import { useCategories } from "../hooks/hooks"
import { catTitle } from "../components/helpers"

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const navigate = useNavigate()
  const megaMenuRef = useRef(null)
  const categories = useCategories()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (searchTerm) {
      navigate(`/search/${searchTerm}`)
    }
  }

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setIsMegaMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <Link to="/" className="text-3xl font-extrabold tracking-tight text-blue-400">
            LOGO
          </Link>
          <Form onSubmit={handleSubmit} method="get" action="/search" className="w-full md:w-auto relative">
            <input
              type="search"
              name="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 h-12 rounded-full border-2 border-gray-600 bg-gray-700 py-2 px-6 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search for products..."
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition duration-300"
            >
              <AiOutlineSearch className="w-6 h-6" />
            </button>
          </Form>
          <div className="flex items-center space-x-6">
            <button className="hover:text-blue-400 transition duration-300">
              <BsBell className="w-6 h-6" />
            </button>
            <button className="hover:text-blue-400 transition duration-300 relative">
              <BsCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="hover:text-blue-400 transition duration-300">
              <AiOutlineUser className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <nav className="bg-gray-700">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center md:justify-start space-x-1 md:space-x-8 py-3">
            <li className="relative group" ref={megaMenuRef}>
              <button
                onClick={toggleMegaMenu}
                className="flex items-center space-x-1 text-white hover:text-blue-400 transition duration-300"
              >
                <span>Categories</span>
                <BsChevronDown
                  className={`w-4 h-4 transform transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isMegaMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 md:w-96 bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          to={`/category/${category}`}
                          className="px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-blue-400 rounded-lg transition duration-300"
                        >
                          {catTitle(category)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
            {["New Arrivals", "Best Sellers", "Deals", "Brands"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-white hover:text-blue-400 transition duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}