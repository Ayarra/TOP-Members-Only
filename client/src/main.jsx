import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import "./index.css";

// Components
import App from "./App.jsx";
import Content from "./components/Content.jsx";
import UserPosts from "./components/UserPosts.jsx";
import ErrorPage from "./ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Content />,
      },
      {
        path: "/users/:userID",
        element: <UserPosts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
