import { useState, useEffect, ReactNode } from 'react';
import {
    BsStarFill,
    BsStar,
    BsSearch,
    BsChevronDown,
    BsTag,
    BsFilter,
    BsX,
} from 'react-icons/bs';
import ScrollToTopLink from '@/components/ui/ScrollToTopLink';
import { Product } from '@/entities/product/model/types';
import ProductCard from './ProductCard';

interface PriceRangeFilterProps {
    min: number;
    max: number;
    value: number;
    onChange: (arg0: number) => void;
}

interface RatingFilterItemProps {
    stars: number;
    selected: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface FilterSectionProps {
    title: string;
    children: ReactNode;
    isOpen?: boolean;
}

interface ProductListingProps {
    fetchUrl: string;
    title: string;
}

const PriceRangeFilter = ({ min, max, value, onChange }: PriceRangeFilterProps) => (
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

const RatingFilterItem = ({ stars, selected, onClick }: RatingFilterItemProps) => (
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


const FilterSection = ({ title, children, isOpen = true }: FilterSectionProps) => {
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

const ProductListing = ({ fetchUrl, title }: ProductListingProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [currentPrice, setCurrentPrice] = useState(1000);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [categorySearch, setCategorySearch] = useState('');
    const [brandSearch, setBrandSearch] = useState('');
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [availableBrands, setAvailableBrands] = useState<string[]>([]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(fetchUrl);
                const data = await res.json();

                setProducts(data.products);
                const highestPrice = Math.max(0, ...data.products.map((p: Product) => p.price)); // Added 0 to handle empty products array
                setMaxPrice(Math.ceil(highestPrice));
                setCurrentPrice(Math.ceil(highestPrice));

                const categories = [...new Set(data.products.map((p: Product) => p.category))];
                const brands = [...new Set(data.products.map((p: Product) => p.brand))];
                setAvailableCategories(categories as string[]);
                setAvailableBrands(brands as string[]);
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
        setIsFilterOpen(false); 
    };

    const handleAddToCart = (product: Product) => {
        console.log("Added to cart:", product.title);
        alert(`${product.title} added to cart!`);
    };

    const handleToggleWishlist = (id: number, isWishlist: boolean) => {
        console.log(`Product ID ${id} wishlist status:`, isWishlist);
    };


    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

      
                    <aside
                        className={`
                            fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out 
                            lg:static lg:transform-none lg:bg-transparent lg:z-auto lg:w-72
                            ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
                        `}
                    >
                        <div className="bg-white h-full lg:rounded-xl lg:shadow-sm p-6 overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Filters</h3>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="lg:hidden text-gray-500 hover:text-gray-800"
                                >
                                    <BsX size={28} />
                                </button>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-blue-600 text-sm hover:text-blue-700 hidden lg:block"
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
                                                        checked={selectedBrands.includes(brand as never)}
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
                                    </div>
                                </FilterSection>

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
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <h1 className="text-3xl font-bold">{title}</h1>
                            <div className="flex items-center gap-4">
                                {/* Mobile Filter Button */}
                                <button
                                    onClick={() => setIsFilterOpen(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
                                >
                                    <BsFilter className="text-gray-600" />
                                    <span className="font-medium">Filters</span>
                                </button>
                                {/* Sort By Dropdown */}
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
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                                    <ScrollToTopLink key={product.id} to={`/product/${product.id}`}>
                                        <ProductCard
                                            product={product}
                                            onAddToCart={handleAddToCart}
                                            onToggleWishlist={handleToggleWishlist}
                                        />
                                    </ScrollToTopLink>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {isFilterOpen && (
                <div
                    onClick={() => setIsFilterOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                ></div>
            )}
        </div>
    );
};

export default ProductListing;