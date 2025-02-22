/* eslint-disable */

import "./App.css";


import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import TickerTable from "./components/TickerTable";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TickerTable/>
    </QueryClientProvider>
  );
}

export default App;
