import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  Router,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import Index from "./pages/Index";
import Product from "./pages/Product";
import "./tailwind.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "index",
      },
      {
        path: "index.html",
      },
    ],
  },
  {
    path: "/product/:productName",
    element: <Product />,
    errorElement: <ErrorPage />,
  },
]);

const basename = process.env.PUBLIC_URL || "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Router basename={basename}>
        <Outlet />
      </Router>
    </RouterProvider>
  </React.StrictMode>
);
