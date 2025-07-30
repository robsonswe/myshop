import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

import Category from "@/pages/Category";
import ErrorPage from "@/pages/ErrorPage";
import Index from "@/pages/Index";
import Product from "@/pages/Product";
import Search from "@/pages/Search";
import CategoriesPage from "@/pages/Categories";
import "./tailwind.css";

const routes = [
  {
    path: `/`,
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `/index`,
      },
      {
        path: `/index.html`,
      },
    ],
  },
  {
    path: `/categories/`,
    element: <CategoriesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/product/:productId`,
    element: <Product />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/category/:categoryId`,
    element: <Category />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/search/:productName`,
    element: <Search />,
    errorElement: <ErrorPage />,
  },
];

const router = createHashRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  </React.StrictMode>
);
