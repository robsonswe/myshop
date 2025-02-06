import ProductListing from '../components/products'
import Layout from '../components/layout'
import { useParams } from 'react-router-dom'

export default function Search() {
  const { productName } = useParams()
  
  return (
    <Layout title={`Search: ${productName}`}>
      <ProductListing 
        fetchUrl={`https://dummyjson.com/products/search?q=${productName}`}
        title={`Search Results for "${productName}"`}
      />
    </Layout>
  )
}
