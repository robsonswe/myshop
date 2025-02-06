import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  BsCart4, 
  BsHeart,
  BsShare,
  BsZoomIn,
  BsArrowLeft,
  BsCheckCircleFill,
  BsTruck,
  BsBox,
  BsReceipt,
  BsBoxSeam,
  BsShieldCheck,
  BsQrCode
} from "react-icons/bs";
import { Rating } from "../components/helpers";
import Layout from "../components/layout";
import Redirect from "../components/link";

function ImageGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="sticky top-8">
      <div className="relative group">
        <div className={`relative overflow-hidden rounded-xl bg-gray-50 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
             onClick={() => setIsZoomed(!isZoomed)}>
          <img 
            src={mainImage || "/placeholder.svg"} 
            alt="Product" 
            className={`w-full aspect-square object-cover transition-transform duration-500
              ${isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'}`}
          />
          <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <BsZoomIn className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImage(image)}
              className={`relative rounded-lg overflow-hidden aspect-square bg-gray-50
                ${mainImage === image ? 'ring-2 ring-blue-500' : 'hover:opacity-80'} transition-all`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Product view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductInfo({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="text-lg text-gray-600 mt-1" />
      <div>
        <h4 className="font-medium">{label}</h4>
        <p className="text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );
}

function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(product.minimumOrderQuantity || 1);
  
  const stockStatus = product.stock <= 5 ? 'Low Stock' : 'In Stock';
  const stockStatusColor = product.stock <= 5 ? 'text-orange-600' : 'text-green-600';
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 text-sm">
        <Redirect to={`/category/${product.category}`}>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <BsArrowLeft /> Back to {product.category}
          </button>
        </Redirect>
        <span className={`flex items-center gap-1 ${stockStatusColor}`}>
          <BsCheckCircleFill className="inline" /> {stockStatus} ({product.stock} left)
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600">{product.brand}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-600">SKU: {product.sku}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <div className="flex items-center gap-4">
          <Rating stars={product.rating} />
          <span className="text-gray-600">({product.rating.toFixed(1)})</span>
        </div>
      </div>

      <div className="flex items-baseline gap-4">
        <span className="text-3xl font-bold">${product.price}</span>
        {product.discountPercentage > 0 && (
          <>
            <span className="text-lg text-gray-500 line-through">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
            <span className="text-green-600">
              {product.discountPercentage.toFixed(0)}% OFF
            </span>
          </>
        )}
      </div>

      <div className="prose prose-gray max-w-none">
        <p>{product.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {product.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="font-medium">Quantity</label>
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button 
              onClick={() => setQuantity(Math.max(product.minimumOrderQuantity || 1, quantity - 1))}
              className="px-3 py-2 hover:bg-gray-50"
            >-</button>
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(Math.max(product.minimumOrderQuantity || 1, parseInt(e.target.value) || 0))}
              className="w-16 text-center border-x border-gray-200"
              min={product.minimumOrderQuantity || 1}
            />
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 hover:bg-gray-50"
            >+</button>
          </div>
          {product.minimumOrderQuantity > 1 && (
            <span className="text-sm text-gray-500">
              Minimum order: {product.minimumOrderQuantity} units
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <BsCart4 className="text-lg" /> Add to Cart
        </button>
        <div className="grid grid-cols-2 gap-4">
          <button className="py-3 px-6 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
            <BsHeart className="text-lg" /> Save
          </button>
          <button className="py-3 px-6 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
            <BsShare className="text-lg" /> Share
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <ProductInfo 
          icon={BsTruck} 
          label="Shipping Information"
          value={product.shippingInformation}
        />
        <ProductInfo 
          icon={BsReceipt} 
          label="Return Policy"
          value={product.returnPolicy}
        />
        <ProductInfo 
          icon={BsShieldCheck} 
          label="Warranty Information"
          value={product.warrantyInformation}
        />
        <ProductInfo 
          icon={BsBox} 
          label="Dimensions"
          value={`${product.dimensions.width}W x ${product.dimensions.height}H x ${product.dimensions.depth}D cm`}
        />
        <ProductInfo 
          icon={BsBoxSeam} 
          label="Weight"
          value={`${product.weight} kg`}
        />
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-xl font-medium text-gray-600">
              {review.reviewerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-medium">{review.reviewerName}</h3>
            <div className="flex items-center gap-2">
              <Rating stars={review.rating} />
              <time className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </time>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <BsShare className="text-lg" />
        </button>
      </div>
      <p className="mt-4 text-gray-700">{review.comment}</p>
    </div>
  );
}

function Reviews({ reviews }) {
  const [sortBy, setSortBy] = useState("newest");

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const averageRating = (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <p className="text-gray-600">{averageRating} out of 5 ({reviews.length} reviews)</p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>
      
      <div className="grid gap-6">
        {sortedReviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </section>
  );
}

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchData();
  }, [productId]);

  if (!product) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={product.title}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <ImageGallery images={product.images} />
            <ProductDetails product={product} />
          </div>
          <Reviews reviews={product.reviews} />
        </div>
      </div>
    </Layout>
  );
}