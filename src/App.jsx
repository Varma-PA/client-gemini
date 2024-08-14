import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ChatPage from "./pages/ChatPage/ChatPage";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import { SignIn, SignUp } from "@clerk/clerk-react";
import SignInPage from "./pages/SingInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/chat/:id",
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
