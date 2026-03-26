import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "@/components/pages/Landing";
import Dashboard from "@/components/pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
