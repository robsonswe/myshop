import { useState, useEffect } from 'react';
import {
    BsCart4,
    BsStarFill,
    BsStarHalf,
    BsStar,
    BsHeart,
    BsHeartFill,
    BsSearch,
    BsGrid,
    BsList,
    BsX,
    BsChevronDown,
    BsTag
} from 'react-icons/bs';
import Redirect from '../components/link';

const PriceRangeFilter = ({ min, max, value, onChange }) => (
    <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Price range</span>
            <span className="font-medium">${min} - ${value}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="w-full accent-blue-600 range-lg"
        />
    </div>
);

const RatingFilterItem = ({ stars, selected, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full p-2 rounded-lg flex items-center gap-2 transition-colors ${selected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
            }`}
    >
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}>
                    {i < stars ? <BsStarFill /> : <BsStar />}
                </span>
            ))}
        </div>
        <span className="text-sm text-gray-600">& Up</span>
    </button>
);

const ProductCard = ({ product }) => {
    const [isWishlist, setIsWishlist] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group relative">
            <Redirect to={`/product/${product.id}`}>
                <div className="relative overflow-hidden rounded-t-xl">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {product.discountPercentage > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            -{Math.round(product.discountPercentage)}%
                        </span>
                    )}
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg truncate flex-1">{product.title}</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.brand}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => {
                            if (i < Math.floor(product.rating)) return <BsStarFill key={i} className="text-yellow-400" />
                            if (i === Math.floor(product.rating) && product.rating % 1 >= 0.5) return <BsStarHalf key={i} className="text-yellow-400" />
                            return <BsStar key={i} className="text-yellow-400" />
                        })}
                        <span className="ml-1 text-sm text-gray-500">({product.rating})</span>
                    </div>

                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-blue-600">${product.price}</span>
                            {product.discountPercentage > 0 && (
                                <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                            )}
                        </div>
                        <span className={`text-sm ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                            {product.stock < 10 ? `${product.stock} left` : 'In Stock'}
                        </span>
                    </div>
                </div>
            </Redirect>

            <div className="px-4 pb-4">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsWishlist(!isWishlist);
                    }}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                    aria-label={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                    {isWishlist ? (
                        <BsHeartFill className="text-red-500 animate-pulse" />
                    ) : (
                        <BsHeart className="text-gray-600" />
                    )}
                </button>

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors flex items-center justify-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <BsCart4 className="text-lg" /> Add to Cart
                </button>
            </div>
        </div>
    );
};


const FilterSection = ({ title, children, isOpen = true }) => {
    const [open, setOpen] = useState(isOpen);

    return (
        <div className="border-b border-gray-200 pb-6">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center mb-4"
            >
                <h3 className="font-medium text-gray-700">{title}</h3>
                <BsChevronDown className={`transform transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            <div className={`space-y-4 ${open ? 'block' : 'hidden'}`}>
                {children}
            </div>
        </div>
    );
};

const ProductListing = ({ fetchUrl, title }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [currentPrice, setCurrentPrice] = useState(1000);
    const [selectedRating, setSelectedRating] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [categorySearch, setCategorySearch] = useState('');
    const [brandSearch, setBrandSearch] = useState('');
    const [availableCategories, setAvailableCategories] = useState([]);
    const [availableBrands, setAvailableBrands] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(fetchUrl);
                const data = await res.json();
                const productsWithOriginalPrice = data.products.map(p => ({
                    ...p,
                    originalPrice: Math.round(p.price / (1 - p.discountPercentage / 100))
                }));

                setProducts(productsWithOriginalPrice);
                const highestPrice = Math.max(...productsWithOriginalPrice.map(p => p.price));
                setMaxPrice(Math.ceil(highestPrice));
                setCurrentPrice(Math.ceil(highestPrice));

                const categories = [...new Set(productsWithOriginalPrice.map(p => p.category))];
                const brands = [...new Set(productsWithOriginalPrice.map(p => p.brand))];
                setAvailableCategories(categories);
                setAvailableBrands(brands);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoading(false);
        };

        fetchUrl && fetchData();
    }, [fetchUrl]);

    const filteredProducts = products
        .filter(p => p.price <= currentPrice)
        .filter(p => !selectedRating || p.rating >= selectedRating)
        .filter(p =>
            selectedCategories.length === 0 ||
            selectedCategories.includes(p.category)
        )
        .filter(p =>
            selectedBrands.length === 0 ||
            selectedBrands.includes(p.brand)
        )
        .filter(p => !inStockOnly || p.stock > 0)
        .filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'price_asc') return a.price - b.price;
            if (sortBy === 'price_desc') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0;
        });

    const clearAllFilters = () => {
        setCurrentPrice(maxPrice);
        setSelectedRating(null);
        setSelectedCategories([]);
        setSelectedBrands([]);
        setInStockOnly(false);
        setSearchQuery('');
        setSortBy('');
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-72">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Filters</h3>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-blue-600 text-sm hover:text-blue-700"
                                >
                                    Clear all
                                </button>
                            </div>

                            <div className="space-y-8">
                                <FilterSection title="Search Products">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Product name..."
                                            value={searchQuery}
                                            onChange={e => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <BsSearch className="absolute left-3 top-3 text-gray-400" />
                                    </div>
                                </FilterSection>

                                <FilterSection title="Price Range">
                                    <PriceRangeFilter
                                        min={0}
                                        max={maxPrice}
                                        value={currentPrice}
                                        onChange={setCurrentPrice}
                                    />
                                </FilterSection>

                                <FilterSection title="Category">
                                    <div className="relative mb-3">
                                        <input
                                            type="text"
                                            placeholder="Search categories..."
                                            value={categorySearch}
                                            onChange={e => setCategorySearch(e.target.value)}
                                            className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 text-sm"
                                        />
                                        <BsTag className="absolute left-2 top-3 text-gray-400" />
                                    </div>
                                    <div className="max-h-48 overflow-y-auto space-y-2">
                                        {availableCategories
                                            .filter(c => c.toLowerCase().includes(categorySearch.toLowerCase()))
                                            .map(category => (
                                                <label key={category} className="flex items-center space-x-2 text-sm">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(category)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedCategories([...selectedCategories, category]);
                                                            } else {
                                                                setSelectedCategories(selectedCategories.filter(c => c !== category));
                                                            }
                                                        }}
                                                        className="rounded text-blue-600"
                                                    />
                                                    <span className="capitalize">{category}</span>
                                                </label>
                                            ))}
                                    </div>
                                </FilterSection>

                                <FilterSection title="Brand">
                                    <div className="relative mb-3">
                                        <input
                                            type="text"
                                            placeholder="Search brands..."
                                            value={brandSearch}
                                            onChange={e => setBrandSearch(e.target.value)}
                                            className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 text-sm"
                                        />
                                        <BsSearch className="absolute left-2 top-3 text-gray-400" />
                                    </div>
                                    <div className="max-h-48 overflow-y-auto space-y-2">
                                        {availableBrands
                                            .filter(b => b && b.toLowerCase().includes(brandSearch.toLowerCase()))
                                            .map(brand => (
                                                <label key={brand} className="flex items-center space-x-2 text-sm">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBrands.includes(brand)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedBrands([...selectedBrands, brand]);
                                                            } else {
                                                                setSelectedBrands(selectedBrands.filter(b => b !== brand));
                                                            }
                                                        }}
                                                        className="rounded text-blue-600"
                                                    />
                                                    <span className="capitalize">{brand}</span>
                                                </label>
                                            ))}
                                    </div>                </FilterSection>

                                <FilterSection title="Stock Status">
                                    <label className="flex items-center space-x-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={inStockOnly}
                                            onChange={(e) => setInStockOnly(e.target.checked)}
                                            className="rounded text-blue-600"
                                        />
                                        <span>Show in-stock only</span>
                                    </label>
                                </FilterSection>

                                <FilterSection title="Customer Rating">
                                    <div className="space-y-3">
                                        {[5, 4, 3, 2, 1].map(stars => (
                                            <RatingFilterItem
                                                key={stars}
                                                stars={stars}
                                                selected={selectedRating === stars}
                                                onClick={() => setSelectedRating(prev => prev === stars ? null : stars)}
                                            />
                                        ))}
                                    </div>
                                </FilterSection>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <h1 className="text-3xl font-bold">{title}</h1>
                            <div className="flex items-center gap-4">
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                    className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Sort by</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
                                        <div className="bg-gray-200 h-52 rounded-xl mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                                        <div className="h-10 bg-gray-200 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-4xl mb-4">😕</div>
                                <h2 className="text-2xl font-medium text-gray-600">No products found</h2>
                                <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onQuickView={setSelectedProduct}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};

export default ProductListing;