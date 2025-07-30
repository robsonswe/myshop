import ProductListing from '@/components/products'
import Layout from '@/components/layout'
import { useParams } from 'react-router-dom'

function catTitle(str) {
  return str.replace(/-/g, " ").replace(/\b[a-z]/g, (char) => char.toUpperCase())
}

export default function Category() {
  const { categoryId } = useParams()
  
  return (
    <Layout title={catTitle(categoryId)}>
      <ProductListing 
        fetchUrl={`https://dummyjson.com/products/category/${categoryId}`}
        title={catTitle(categoryId)}
      />
    </Layout>
  )
}
