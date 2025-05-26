import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Stack,
  IconButton,
  Typography,
  Popover,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import {
  BookmarkAdd as BookmarkAddIcon,
  BookmarkRemove as BookmarkRemoveIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { useMutation, useQuery } from "@tanstack/react-query";
import * as scales from "../../utils/scales";

import { storeList, retrieveList } from "../../utils/store";
import React from "react";
import ColorCodedCell from "./ColorCodedCell";
import HeaderCell from "./HeaderCell";
import { headerData } from "./constants";
import TickerNameCell from "./TickerNameCell";

interface TickerData {
  shortName: string;
  symbol: string;
  currentPrice: number;
  trailingPE: number;
  trailingPegRatio: number;
  priceToSalesTrailing12Months: number;
  priceToBook: number;
  trailingAnnualDividendYield: number;
  payoutRatio: number;
  debtToEquity: number;
  currentRatio: number;
  beta: number;
}

type TabData = {
  label: string;
  index: number;
  tickers: string[];
};

/**
 * The main component of the application that fetches and displays financial data in a table format.
 *
 * @component
 *
 * @typedef {Object} TickerData
 * @property {string} shortName - The short name or ticker symbol of the stock.
 * @property {number} currentPrice - The current trading price of the stock.
 * @property {number} PE - The Price-to-Earnings ratio, a valuation metric for determining the relative value of a company's shares.
 * @property {number} PEG - The Price/Earnings to Growth ratio, used to determine a stock's value while taking the company's earnings growth into account.
 * @property {number} priceToSales - The Price-to-Sales ratio, a valuation ratio that compares a company's stock price to its revenues.
 * @property {number} priceToBook - The Price-to-Book ratio, used to compare a firm's market value to its book value.
 * @property {number} dividendYield - The dividend yield, a financial ratio that shows how much a company pays out in dividends each year relative to its stock price.
 * @property {number} payoutRatio - The payout ratio, the proportion of earnings paid out as dividends to shareholders.
 * @property {number} debtToEquity - The Debt-to-Equity ratio, a measure of a company's financial leverage calculated by dividing its total liabilities by stockholders' equity.
 * @property {number} currentRatio - The current ratio, a liquidity ratio that measures a company's ability to pay short-term obligations.
 * @property {number} beta - The beta, a measure of a stock's volatility in relation to the overall market.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <TickerTable />
 */
export default function TickerTable() {
  // const queryClient = useQueryClient();

  const [tickerSearch, setTickerSearch] = useState<string>("");
  const [tickerSymbols, setTickerSymbols] = useState<string[]>([]);
  const [tabs, setTabs] = useState<TabData[]>([{ label: "General", index: 0, tickers: [] }]);
  const [tickerData, setTickerData] = useState<TickerData[]>([]);
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [tabOperation, setTabOperation] = useState<string>("");
  const [newTabName, setNewTabName] = useState<string>("");

  const initialLoad = useRef(true); // Track if it's the initial load

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, tabOperation: string) => {
    setTabOperation(tabOperation);
    setAnchorEl(event.currentTarget);
  };

  // USEQUERY: to fetch ticker data
  const query = useQuery({
    queryKey: ["tickerData", tickerSymbols],
    queryFn: async () => {
      const tickers = tickerSymbols.join(",");
      console.log("Fetching data for ticker symbols:", tickers);
      if (tickers.length === 0) {
        return [];
      }

      const response = await axios.get(`http://localhost:8000/stock?tickers=${tickers}`);
      return response.data;
    },
    retry: false,
    enabled: !initialLoad.current, // Disable the query on initial load
  });

  const mutation = useMutation({
    mutationFn: async (tabs: object[]) => {
      storeList("tickerTabs", tabs);
    },
    onSuccess: () => {
      // query.refetch();
    },
  });

  const updateTab = (queryData: TickerData[], tabIndex: number, tabs: TabData[]) => {
    // Update tabs with new ticker queryData
    console.log("Updating tab with query data:", queryData, "for tab index:", tabIndex);
    console.log("Current tabs before update:", tabs);
    const updatedTabs = tabs.map((tab) =>
      tab.index === tabIndex
        ? { ...tab, tickers: queryData.map((ticker: TickerData) => ticker.symbol) }
        : tab
    );
    setTabs(updatedTabs);
    mutation.mutate(updatedTabs);
  };

  // PROCESS: query data
  useEffect(() => {
    if (query.isSuccess) {
      console.log("Query success:", query.data);

      updateTab(query.data, currentTabIndex, tabs);
      setTickerData(query.data);
    }
  }, [query.isSuccess, query.data]);

  // LOCAL STORAGE: mount data from localStorage on component mount
  useEffect(() => {
    console.log("Component mounted, loading tabs from localStorage");
    const storedTabs = retrieveList("tickerTabs") as unknown as TabData[];

    if (storedTabs && storedTabs.length > 0) {
      const parsedTabs: TabData[] = storedTabs.map((tab) => ({
        label: tab.label || "Unnamed",
        index: typeof tab.index === "number" ? tab.index : 0,
        tickers: Array.isArray(tab.tickers) ? tab.tickers : [],
      }));
      console.log("Parsed tabs from localStorage:", parsedTabs);

      setTabs(parsedTabs);

      // Get tickers from the first tab to load initially
      const initialTabTickers = parsedTabs[0]?.tickers || [];
      if (initialTabTickers.length > 0) {
        setTickerSymbols(initialTabTickers);
      }
    }
    initialLoad.current = false; // Set to false after the first load
  }, []);

  // -- Handle adding row with the Enter key to submit the ticker search
  const handleAddTicker = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return;
    if (!tickerSearch.trim()) return;

    setTickerSymbols([...tickerSymbols, tickerSearch.trim().toUpperCase()]);
    setTickerSearch("");
  };

  // -- Handle deleting row
  const handleDeleteRow = (index: number) => {
    console.log(`Deleting row ${index}: ${tickerSymbols[index]}`);
    const updatedTickerSymbols = tickerSymbols.filter((_, tickerIndex) => tickerIndex != index);
    if (updatedTickerSymbols.length == 0) {
      updateTab([], currentTabIndex, tabs);
    }
    setTickerSymbols(updatedTickerSymbols);
  };

  // -- Handle adding a new tab
  const handleAddTab = (newTabName: string) => {
    if (!newTabName.trim()) return;

    const newTab: TabData = {
      label: newTabName.trim(),
      index: tabs.length,
      tickers: [],
    };

    const updatedTabs = [...tabs, newTab];
    setNewTabName("");
    setTabs(updatedTabs);

    setCurrentTabIndex(newTab.index);
    setTickerSymbols([]); // Clear ticker symbols when adding a new tab
  };

  // -- Handle deleting a tab
  const handleDeleteTab = (tabIndex: number) => {
    const updatedTabs = tabs.filter((tab) => tab.index !== tabIndex);
    setTabs(updatedTabs);
    mutation.mutate(updatedTabs);
  };

  // -- Handle changing tabs
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    // Load tickers for the selected tab
    const selectedTab = tabs.find((tab) => tab.index === newValue);
    console.log("Switching to tab: ", selectedTab);
    if (selectedTab) {
      const tickersToFetch = selectedTab.tickers;

      // Fetch missing tickers
      setTickerSymbols(tickersToFetch);
      setCurrentTabIndex(newValue);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        boxSizing: "border-box",
        padding: 2,
      }}>
      <Stack direction={"row"} sx={{ width: "auto", height: "auto" }}>
        <TextField
          id="contained"
          label="Ticker Symbol"
          variant="outlined"
          value={tickerSearch}
          onChange={(event) => setTickerSearch(event.target.value)}
          onKeyDown={handleAddTicker}
          sx={{ width: "auto" }}
        />
        <Tabs
          value={tabs.findIndex((tab) => tab.index === currentTabIndex)}
          scrollButtons="auto"
          allowScrollButtonsMobile
          variant="scrollable">
          {tabs.map((tab) => (
            <Tab
              key={tab.index}
              label={tab.label}
              onClick={(event) => {
                handleTabChange(event, tab.index);
              }}
            />
          ))}
        </Tabs>
        <IconButton
          sx={{ width: 50, height: 50 }}
          onClick={(event) => handlePopoverOpen(event, "add")}>
          <BookmarkAddIcon />
        </IconButton>
        <IconButton
          sx={{ width: 50, height: 50 }}
          onClick={(event) => handlePopoverOpen(event, "remove")}>
          <BookmarkRemoveIcon />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              width: "auto",
              minWidth: tabOperation === "remove" ? 200 : "auto", // Ensure the box grows for the select
            }}>
            {tabOperation === "add" ? (
              <>
                <Typography sx={{ mb: 1 }}>Add Watchlist</Typography>
                <TextField
                  id="contained"
                  label="New Watchlist Name"
                  variant="outlined"
                  value={tabOperation === "add" ? newTabName : ""}
                  onChange={(event) => setNewTabName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleAddTab(newTabName);
                      setNewTabName(""); // Clear the state after adding the tab
                      setAnchorEl(null);
                    }
                  }}
                />
              </>
            ) : (
              <>
                <Typography sx={{ mb: 1 }}>Remove Watchlist</Typography>
                <FormControl fullWidth>
                  <InputLabel>Select Watchlist</InputLabel>
                  <Select
                    label="Select Watchlist"
                    variant="outlined"
                    autoWidth
                    onChange={(event) => {
                      const index = tabs.findIndex((tab) => tab.label === event.target.value);
                      handleDeleteTab(index);
                      setCurrentTabIndex(index - 1);
                      setTickerSymbols(tabs[index - 1]?.tickers || []); // Load tickers from the previous tab
                    }}>
                    {tabs.slice(1).length == 0 ? (
                      <MenuItem disabled>No tabs to remove</MenuItem>
                    ) : (
                      tabs.slice(1).map((tab) => (
                        <MenuItem key={tab.index} value={tab.label}>
                          {tab.label}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </>
            )}
          </Box>
        </Popover>
      </Stack>
      <Paper sx={{ width: "100%", height: "auto", overflow: "hidden" }}>
        <TableContainer sx={{ height: 1, overflowY: "auto" }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Ticker</TableCell>
                {headerData.map((data, index) => (
                  <HeaderCell key={index} headerTitle={data.headerTitle} tooltip={data.tooltip} />
                ))}
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickerData.map((row, index) => {
                const peColors = scales.generateScale("P/E", row.trailingPE);
                const pegColors = scales.generateScale("PEG", row.trailingPegRatio);
                const priceToSalesColors = scales.generateScale(
                  "P/S",
                  row.priceToSalesTrailing12Months
                );
                const priceToBookColors = scales.generateScale("P/B", row.priceToBook);
                // const dividendYieldColors = scales.generateScale(
                //   "Dividend Yield",
                //   row.trailingAnnualDividendYield
                // );
                // const payoutRatioColors = scales.generateScale(
                //   "Payout Ratio",
                //   row.payoutRatio
                // );
                const debtToEquityColors = scales.generateScale("Debt/Equity", row.debtToEquity);
                const currentRatioColors = scales.generateScale("Current Ratio", row.currentRatio);
                const betaColors = scales.generateScale("Beta", row.beta);

                return (
                  <TableRow key={index}>
                    <TickerNameCell tickerName={row.shortName} tickerSymbol={row.symbol}></TickerNameCell>
                    <TableCell align="right">{row.symbol}</TableCell>
                    <TableCell align="right">{row.currentPrice}</TableCell>
                    <ColorCodedCell value={row.trailingPE} colors={peColors} />
                    <ColorCodedCell value={row.trailingPegRatio} colors={pegColors} />
                    <ColorCodedCell
                      value={row.priceToSalesTrailing12Months}
                      colors={priceToSalesColors}
                    />
                    <ColorCodedCell value={row.priceToBook} colors={priceToBookColors} />
                    {/* <ColorCodedCell
              value={row.trailingAnnualDividendYield}
              colors={dividendYieldColors}
            /> */}
                    {/* <ColorCodedCell value={row.payoutRatio} colors={payoutRatioColors} /> */}
                    <ColorCodedCell value={row.debtToEquity} colors={debtToEquityColors} />
                    <ColorCodedCell value={row.currentRatio} colors={currentRatioColors} />
                    <ColorCodedCell value={row.beta} colors={betaColors} />
                    <TableCell align="right">
                      <IconButton color="error" onClick={() => handleDeleteRow(index)}>
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
