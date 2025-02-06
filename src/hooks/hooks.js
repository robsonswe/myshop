import { useEffect, useState } from "react";

export function useProducts(options = {}) {
  // Backward compatibility: handle cases where a number is passed as the first argument
  if (typeof options === "number") {
    options = { limit: options };
  }

  const { limit = 10, skip, select, sortBy, order } = options;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        params.set("limit", limit);
        if (skip !== undefined) params.set("skip", skip);
        if (select) params.set("select", select);
        if (sortBy) params.set("sortBy", sortBy);
        if (order) params.set("order", order);

        const res = await fetch(
          `https://dummyjson.com/products?${params.toString()}`
        );
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
      }
    };

    fetchData();
  }, [limit, skip, select, sortBy, order]);

  return { products, error };
}

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

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        setCategories(data.map((cat) => cat.slug));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return categories;
}