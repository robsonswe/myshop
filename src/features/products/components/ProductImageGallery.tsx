import { useState } from "react";
import { BsZoomIn } from "react-icons/bs";

import { Product } from "@/entities/product/model/types";

interface ProductImageGalleryProps {
  images: Product['images'];
  title: Product['title'];
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  // Fallback to placeholder if no images are available
  const displayImages = images && images.length > 0 ? images : ["/placeholder.svg"];
  if (!mainImage && displayImages.length > 0) {
    setMainImage(displayImages[0]);
  }

  return (
    <div className="sticky top-24">
      <div className="relative group">
        <div
          className={`relative overflow-hidden rounded-xl bg-gray-50 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={mainImage || "/placeholder.svg"}
            alt={title}
            className={`w-full aspect-square object-cover transition-transform duration-500
              ${isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'}`}
          />
          {!isZoomed && (
            <div className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <BsZoomIn className="w-5 h-5 text-gray-700" />
            </div>
          )}
        </div>

        {displayImages.length > 1 && (
          <div className="grid grid-cols-5 gap-4 mt-4">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(image)}
                className={`relative rounded-lg overflow-hidden aspect-square bg-gray-50
                  ${mainImage === image ? 'ring-2 ring-blue-500' : 'hover:opacity-80'} transition-all`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${title} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}