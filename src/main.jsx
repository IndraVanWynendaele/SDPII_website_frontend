import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/index.css";
import Login from "./pages/Login";
import Products from "./pages/products/Products";
import ChatBox from "./pages/ChatBox";
import { AuthProvider } from "./contexts/Auth.context";
import Logout from "./pages/Logout";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import NotFound from "./components/NotFound";
import OrderDetailPage from "./pages/orders/OrderDetailPage";
import PaymentPage from "./pages/orders/PaymentPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AuthRoute from "./components/routes/AuthRoute";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/profile/Profile";
import Accounts from "./pages/admin/accounts/Accounts";
import Notifications from "./pages/notifications/Notifications";
import MyProducts from "./pages/suppliers/MyProducts";
import AccountDetail from "./pages/admin/accounts/AccountDetail";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminNotificationDetailPage from "./pages/admin/AdminNotificationDetailPage";
import Register from "./pages/Register";
import Thanks from "./pages/profile/Thanks";
import RegisterRoute from "./components/routes/RegisterRoute";
import EditProfile from "./pages/profile/EditProfile";
import Confirmation from "./pages/profile/Confirmation";
import EditRoute from "./components/routes/EditRoute";
import PaymentSuccessPage from "./pages/orders/PaymentSuccessPage";
import PaymentSuccessRoute from "./components/routes/PaymentSuccessRoute";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/thanks",
        element: <RegisterRoute />,
        children: [
          {
            index: true,
            element: <Thanks />,
          },
        ],
      },
      {
        path: "/products",
        children: [
          {
            index: true,
            element: <Products />,
            index: true,
          },
          {
            path: "detail/:id",
            element: <ProductDetailPage />,
          },
        ],
      },
      {
        path: "/orders",
        element: <AuthRoute typeMeegegeven={["supplier", "client"]} />,
        children: [
          {
            index: true,
            element: <Orders />,
          },
          {
            path: ":uuid",
            children: [
              {
                index: true,
                element: <OrderDetailPage />,
              },
              {
                path: "payment",
                children: [
                  {
                    index: true,
                    element: <PaymentPage />,
                  },
                  {
                    path: "success",
                    element: <PaymentSuccessRoute />,
                    children: [
                      {
                        index: true,
                        element: <PaymentSuccessPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "/chatBox",
        element: <ChatBox />,
      },
      {
        path: "/profile",
        children: [
          {
            element: <AuthRoute typeMeegegeven={["supplier", "client"]} />,
            children: [
              {
                index: true,
                element: <Profile />,
              },
              { path: "edit/:id", element: <EditProfile /> },
              {
                element: <EditRoute />,
                children: [
                  {
                    path: "confirmation",
                    element: <Confirmation />,
                  },
                ],
              },
            ],
          },
          {
            path: "products",
            element: <AuthRoute typeMeegegeven={["supplier"]} />,
            children: [
              {
                index: true,
                element: <MyProducts />,
              },
              {
                path: "detail/:id",
                element: <ProductDetailPage />,
              },
            ],
          },
        ],
      },
      {
        path: "/me/notifications",
        element: <AuthRoute typeMeegegeven={["supplier", "client"]} />,
        children: [
          {
            index: true,
            element: <Notifications />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AuthRoute typeMeegegeven={["admin"]} />,
        children: [
          {
            path: "accounts",
            children: [
              {
                index: true,
                element: <Accounts />,
              },
              {
                path: "detail/:id",
                element: <AccountDetail />,
              },
            ],
          },
          {
            path: "notifications",
            children: [
              {
                index: true,
                element: <AdminNotifications />,
              },
              {
                path: "detail/:id",
                element: <AdminNotificationDetailPage />,
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
