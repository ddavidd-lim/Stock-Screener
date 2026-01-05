import { createBrowserRouter, Outlet } from "react-router-dom";
import TickerTable from "../components/TickerTable";
import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <TickerTable />,
          },
        ],
      },
    ],
  },
]);

export default router;
