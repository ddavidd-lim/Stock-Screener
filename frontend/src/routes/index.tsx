import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../components/layout";
import TickerTable from "../components/TickerTable";

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