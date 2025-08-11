import { createHashRouter } from "react-router-dom";

import IndexPage from "@/pages/IndexPage";
import ErrorPage from "@/pages/ErrorPage";
import CategoriesPage from "@/features/categories/CategoriesPage";
import CategoryPage from "@/features/products/pages/CategoryPage";
import ProductPage from "@/features/products/pages/ProductPage";
import SearchPage from "@/features/products/pages/SearchPage";

const routes = [
  {
    path: `/`,
    element: <IndexPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/categories`,
    element: <CategoriesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/product/:productId`,
    element: <ProductPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/category/:categoryId`,
    element: <CategoryPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/search/:productName`,
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
];

export const router = createHashRouter(routes);