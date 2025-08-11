import { useState } from "react";
import {
  BsCart4, BsHeart, BsShare, BsArrowLeft, BsCheckCircleFill,
  BsTruck, BsReceipt, BsShieldCheck, BsBox, BsBoxSeam
} from "react-icons/bs";
import Rating from "@/components/ui/Rating";
import ScrollToTopLink from "@/components/ui/ScrollToTopLink";
import { catTitle } from "@/lib/formatters";
import { IconType } from "react-icons";
import { Product } from "@/entities/product/model/types";

interface ProductInfoItemProps {
  label: string;
  value: string;
  icon: IconType;
}

interface ProductDetailsProps {
  product: Product;
}

// A small, internal helper component for displaying info items
function ProductInfoItem({ label, value, icon: Icon }: ProductInfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="text-lg text-gray-600 mt-1 flex-shrink-0" />
      <div>
        <h4 className="font-medium text-gray-800">{label}</h4>
        <p className="text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(product.minimumOrderQuantity || 1);

  const stockStatus = product.stock <= 5 ? 'Low Stock' : 'In Stock';
  const stockStatusColor = product.stock <= 5 ? 'text-orange-600' : 'text-green-600';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 text-sm">
        <ScrollToTopLink to={`/category/${product.category}`}>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium">
            <BsArrowLeft /> Back to {catTitle(product.category)}
          </button>
        </ScrollToTopLink>
        <span className={`flex items-center gap-1 font-medium ${stockStatusColor}`}>
          <BsCheckCircleFill className="inline" /> {stockStatus} ({product.stock} left)
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600">{product.brand}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-600">SKU: {product.sku}</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-900">{product.title}</h1>
        <div className="flex items-center gap-2">
          <Rating stars={product.rating} />
          <span className="text-gray-600 text-sm">({product.reviews.length} reviews)</span>
        </div>
      </div>

      <div className="flex items-baseline gap-4">
        <span className="text-4xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
        {product.discountPercentage > 0 && (
          <>
            <span className="text-xl text-gray-500 line-through">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-md">
              {product.discountPercentage.toFixed(0)}% OFF
            </span>
          </>
        )}
      </div>

      <div className="prose prose-gray max-w-none text-gray-600">
        <p>{product.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag: string) => (
          <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <label className="font-medium text-gray-800">Quantity</label>
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(product.minimumOrderQuantity || 1, quantity - 1))}
            className="px-4 py-2 text-lg hover:bg-gray-50 rounded-l-lg"
          >−</button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(product.minimumOrderQuantity || 1, parseInt(e.target.value) || 0))}
            className="w-16 text-center border-x border-gray-200 focus:outline-none"
            min={product.minimumOrderQuantity || 1}
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-lg hover:bg-gray-50 rounded-r-lg"
          >+</button>
        </div>
        {product.minimumOrderQuantity > 1 && (
          <span className="text-sm text-gray-500">
            Min. order: {product.minimumOrderQuantity}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg">
          <BsCart4 className="text-xl" /> Add to Cart
        </button>
        <div className="grid grid-cols-2 gap-4">
          <button className="py-3 px-6 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium">
            <BsHeart className="text-lg" /> Save
          </button>
          <button className="py-3 px-6 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium">
            <BsShare className="text-lg" /> Share
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <ProductInfoItem icon={BsTruck} label="Shipping" value={product.shippingInformation} />
        <ProductInfoItem icon={BsReceipt} label="Returns" value={product.returnPolicy} />
        <ProductInfoItem icon={BsShieldCheck} label="Warranty" value={product.warrantyInformation} />
        <ProductInfoItem icon={BsBox} label="Dimensions" value={`${product.dimensions.width}W x ${product.dimensions.height}H x ${product.dimensions.depth}D cm`} />
        <ProductInfoItem icon={BsBoxSeam} label="Weight" value={`${product.weight} kg`} />
      </div>
    </div>
  );
}