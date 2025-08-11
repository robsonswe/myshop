import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import ProductImageGallery from "@/features/products/components/ProductImageGallery";
import ProductDetails from "@/features/products/components/ProductDetails";
import ProductReviews from "@/features/products/components/ProductReviews";
import { Product } from "@/entities/product/model/types";

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        // You could set an error state here to show a proper error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title="Product Not Found">
        <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <p className="text-gray-600">The product you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={product.title}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <ProductImageGallery images={product.images} title={product.title} />
            <ProductDetails product={product} />
          </div>
          {product.reviews && product.reviews.length > 0 && (
              <ProductReviews reviews={product.reviews} />
          )}
        </div>
      </div>
    </Layout>
  );
}