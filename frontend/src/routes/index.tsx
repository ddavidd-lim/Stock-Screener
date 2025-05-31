import { createBrowserRouter, Outlet } from "react-router-dom";
import TickerTable from "../components/TickerTable";
import Layout from "../components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
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