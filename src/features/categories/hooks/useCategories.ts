import { Category } from "@/entities/category/model/types";
import { useEffect, useState } from "react";


export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data: Category[] = await res.json(); 
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return categories; // Returns Category[]
}