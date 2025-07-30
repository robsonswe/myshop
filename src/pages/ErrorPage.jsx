import { useRouteError } from "react-router-dom"
import Layout from "@/components/layout/Layout"

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <Layout title="Error">
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
          <p className="text-gray-600 mb-8">
            <i>{error.statusText || error.message}</i>
          </p>
          <a
            href="/"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Go back to homepage
          </a>
        </div>
      </div>
    </Layout>
  )
}

