import { Product } from "@/entities/product/model/types";
import { useEffect, useState } from "react";

export type ProductQueryParams = {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};


export function useProducts(options: ProductQueryParams | number = {}) {
  if (typeof options === "number") {
    options = { limit: options };
  }

  const { limit = 10, skip, select, sortBy, order } = options;
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        params.set("limit", String(limit));
        if (skip !== undefined) params.set("skip", String(skip));
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
        setError(error as Error);
      }
    };

    fetchData();
  }, [limit, skip, select, sortBy, order]);

  return { products, error };
}