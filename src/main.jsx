import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

import Category from "./pages/Category";
import ErrorPage from "./pages/ErrorPage";
import Index from "./pages/Index";
import Product from "./pages/Product";
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
    path: `/product/:productId`,
    element: <Product />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/category/:categoryId`,
    element: <Category />,
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
