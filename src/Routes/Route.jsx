import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

// Dashboard imports





import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Dashboard/Profile";
import Orders from "../Pages/Dashboard/Orders";
import Reviews from "../Pages/Dashboard/MyReviews";
import Favorites from "../Pages/Dashboard/Favorites";
import CreateMeal from "../Pages/Dashboard/CreateMeal";
import MyMeals from "../Pages/Dashboard/MyMeals";
import OrderManagement from "../Pages/Dashboard/OrderManagement";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import ManageRequests from "../Pages/Dashboard/ManageRequests";
import PlatformStatistics from "../Pages/Dashboard/PlatFormStatistics";
import MealDetails from "../Pages/MealDetails";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentCancelled from "../Pages/PaymentCancelled";
import AllMeals from "../Pages/AllMeals";
import ErrorPage from "../Pages/ErrorPage";
import MyReviews from "../Pages/Dashboard/MyReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement : <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'/meals',
        element: <AllMeals />

      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/meal-details/:id",
        element : <MealDetails />
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />
      },
      {
        path: 'dashboard/payment-cancelled',
        element: <PaymentCancelled />
      },
      {
        errorElement: <ErrorPage />
      }
    ],
  },

  // ✅ DASHBOARD ROUTES
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        index: true, // /dashboard
        element: <Profile />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "reviews",
        element: <MyReviews />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "create-meal",
        element: <CreateMeal />
      },
      {
        path: "my-meals",
        element: <MyMeals />
      },
      {
        path: "order-management",
        element: <OrderManagement />
      },
      {
        path: "manage-users",
        element: <ManageUsers />
      },
      {
        path: "manage-requests",
        element: <ManageRequests />
      },
      {
        path: "platform-statistics",
        element: <PlatformStatistics />
      }
    ],
  },
]);

export default router;
