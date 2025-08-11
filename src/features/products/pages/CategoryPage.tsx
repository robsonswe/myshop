import ProductListing from '@/features/products/components/ProductList.jsx'
import Layout from '@/components/layout/Layout'
import { useParams } from 'react-router-dom'

function catTitle(str: string) {
  return str.replace(/-/g, " ").replace(/\b[a-z]/g, (char) => char.toUpperCase())
}

export default function Category() {
  const { categorySlug } = useParams()
  
  const baseUrl = "https://dummyjson.com/products"
  const fetchUrl = categorySlug ? `${baseUrl}/category/${categorySlug}` : baseUrl
  const title = categorySlug ? catTitle(categorySlug) : "Products"
  
  return (
    <Layout title={title}>
      <ProductListing 
        fetchUrl={fetchUrl}
        title={title}
      />
    </Layout>
  )
}
