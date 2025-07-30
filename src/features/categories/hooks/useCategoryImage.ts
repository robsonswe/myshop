import { useEffect, useState } from "react";

export function useCategoryImage(categoryName) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${categoryName}?limit=1&select=thumbnail`
        );
        const data = await res.json();
        if (data.products?.length > 0) {
          setImage(data.products[0].thumbnail);
        }
      } catch (error) {
        console.error("Error fetching category image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  return { image, loading };
}

