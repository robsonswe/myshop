// hooks.js
import { useEffect, useState } from "react"

export function useProducts(limit = 10) {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products?limit=${limit}`)
        const data = await res.json()
        setProducts(data.products)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError(error)
      }
    }

    fetchData()
  }, [limit])

  return { products, error }
}

export function useCategoryImage(categoryName) {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${categoryName}?limit=1`
        )
        const data = await res.json()
        if (data.products?.length > 0) {
          setImage(data.products[0].thumbnail)
        }
      } catch (error) {
        console.error("Error fetching category image:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryName])

  return { image, loading }
}

export function useCategories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories")
        const data = await res.json()
        setCategories(data.map((cat) => cat.slug));
    } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchData()
  }, [])

  return categories
}