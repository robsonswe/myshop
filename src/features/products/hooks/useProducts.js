import { useEffect, useState } from "react";

export function useProducts(options = {}) {
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