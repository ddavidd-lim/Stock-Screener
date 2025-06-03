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
  CircularProgress,
  ButtonGroup,
  Button,
} from "@mui/material";

import {
  BookmarkAdd as BookmarkAddIcon,
  BookmarkRemove as BookmarkRemoveIcon,
  Close as CloseIcon,
  FileUpload as FileUploadButton,
  FileDownload as FileDownloadIcon,
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

import { importFromJson, exportToJson } from "../../utils/import";

import API_BASE_URL from "../../utils/api";
import { useIsMobile } from "../../hooks/MobileContext";

interface TickerData {
  shortName: string;
  symbol: string;
  currentPrice: number;
  trailingPE: number;
  trailingPegRatio: number;
  priceToSalesTrailing12Months: number;
  priceToBook: number;
  returnOnEquity: number;
  returnOnAssets: number;
  enterpriseToRevenue: number;
  enterpriseToEbitda: number;
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

const ranges = ["1D", "5D", "1M", "3M", "6M", "YTD", "12M", "60M"];

export default function TickerTable() {
  // const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState<string>("1D");

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
      // console.log("Fetching data for ticker symbols:", tickers);
      if (tickers.length === 0) {
        return [];
      }

      const response = await axios.get(`${API_BASE_URL}/stock?tickers=${tickers}`);
      return response.data;
    },
    retry: false,
    enabled: !initialLoad.current, // Disable the query on initial load
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  const mutation = useMutation({
    mutationFn: async (tabs: object[]) => {
      storeList("tickerTabs", tabs);
    },
    onSuccess: () => {},
  });

  const updateTab = (queryData: TickerData[], tabIndex: number, tabs: TabData[]) => {
    // Update tabs with new ticker queryData
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
      // console.log("Query success:", query.data);

      updateTab(query.data, currentTabIndex, tabs);
      setTickerData(query.data);
    }
  }, [query.isSuccess, query.data]);

  // LOCAL STORAGE: mount data from localStorage on component mount
  useEffect(() => {
    // console.log("Component mounted, loading tabs from localStorage");
    setCurrentTabIndex(0); // Reset to the first tab on mount
    const storedTabs = retrieveList("tickerTabs") as unknown as TabData[];

    if (storedTabs && storedTabs.length > 0) {
      const parsedTabs: TabData[] = storedTabs.map((tab) => ({
        label: tab.label || "Unnamed",
        index: typeof tab.index === "number" ? tab.index : 0,
        tickers: Array.isArray(tab.tickers) ? tab.tickers : [],
      }));
      // console.log("Parsed tabs from localStorage:", parsedTabs);

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
    setTickerSymbols([]);
  };

  // -- Handle deleting a tab
  const handleDeleteTab = (tabIndex: number) => {
    const updatedTabs = tabs.filter((tab) => tab.index !== tabIndex);
    setTabs(updatedTabs);
    mutation.mutate(updatedTabs);
  };

  // -- Handle changing tabs
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    // Grab new list of tickers from the selected tab
    const selectedTab = tabs.find((tab) => tab.index === newValue);
    if (selectedTab) {
      const tickersToFetch = selectedTab.tickers;

      setTickerSymbols(tickersToFetch);
      setCurrentTabIndex(newValue);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "73px",
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          width: "100%",
          px: 2,
        }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
          spacing={2}
          sx={{ flexGrow: 1, width: "100%", p: 1 }}>
          <Typography variant={isMobile ? "body1" : "h5"} sx={{ fontWeight: "bold" }}>
            Stock Screener
          </Typography>
          <TextField
            id="contained"
            label="Search Ticker"
            placeholder="NVDA"
            variant="outlined"
            value={tickerSearch}
            onChange={(event) => setTickerSearch(event.target.value)}
            onKeyDown={handleAddTicker}
            sx={{ width: isMobile ? "135px" : "auto", minWidth: 100 }}
          />
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          overflow: "hidden",
          padding: 2,
          gap: 2,
        }}>
        <ButtonGroup
          variant="contained"
          orientation="horizontal"
          sx={{ width: isMobile ? "100%" : "30rem" }}>
          {ranges.map((range) => (
            <Button
              key={range}
              color="success"
              variant={timeRange === range ? "contained" : "text"}
              onClick={() => setTimeRange(range)}
              sx={{ flex: 1, px: 1 }}>
              {range === "12M" ? "1Y" : range === "60M" ? "5Y" : range}
            </Button>
          ))}
        </ButtonGroup>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems="center" spacing={2}>
          <Tabs
            value={tabs.findIndex((tab) => tab.index === currentTabIndex)}
            scrollButtons="auto"
            variant="scrollable"
            sx={{
              borderBottom: 1,
              borderTop: 1,
              borderColor: "divider",
              flexGrow: 1,
              minHeight: 36,
              "& .MuiTabs-scroller": {
                overflowX: "auto !important",
              },
            }}>
            {tabs.map((tab) => (
              <Tab
                key={tab.index}
                label={tab.label}
                sx={{ textTransform: isMobile ? "none" : null }}
                onClick={(event) => {
                  handleTabChange(event, tab.index);
                }}
              />
            ))}
          </Tabs>
          <Box>
            <IconButton
              sx={{ width: "auto", height: "auto" }}
              onClick={(event) => handlePopoverOpen(event, "add")}>
              <BookmarkAddIcon />
            </IconButton>
            <IconButton
              sx={{ width: "auto", height: "auto" }}
              onClick={(event) => handlePopoverOpen(event, "remove")}>
              <BookmarkRemoveIcon />
            </IconButton>
          </Box>
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
        <Paper sx={{ width: "100%", height: "auto", overflow: "hidden", flex: 1 }}>
          <TableContainer sx={{ height: 1, overflowY: "auto", flex: 1 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">Name</TableCell>
                  {headerData.map((data, index) => {
                    return data.headerTitle === "Current Price" ? (
                      <TableCell key={index}>{data.headerTitle}</TableCell>
                    ) : (
                      <HeaderCell
                        key={index}
                        headerTitle={data.headerTitle}
                        tooltip={data.tooltip}
                      />
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {query.isFetching && (
                  <TableRow>
                    <TableCell colSpan={headerData.length + 2} align="center">
                      <CircularProgress
                        size={40}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}></CircularProgress>
                    </TableCell>
                  </TableRow>
                )}
                {!query.isFetching &&
                  tickerData.map((row, index) => {
                    const percentageRoe = row.returnOnEquity * 100;
                    const percentageRoa = row.returnOnAssets * 100;
                    const percentageDividendYield = row.trailingAnnualDividendYield * 100;
                    const percentagePayoutRatio = row.payoutRatio * 100;

                    const peColor = scales.evaluateColorTier("P/E", row.trailingPE);
                    const pegColor = scales.evaluateColorTier("PEG", row.trailingPegRatio);
                    const priceToSalesColor = scales.evaluateColorTier(
                      "P/S",
                      row.priceToSalesTrailing12Months
                    );
                    const priceToBookColor = scales.evaluateColorTier("P/B", row.priceToBook);
                    const roeColor = scales.evaluateColorTier("ROE", percentageRoe);
                    const roaColor = scales.evaluateColorTier("ROA", percentageRoa);
                    const enterpriseToRevenueColor = scales.evaluateColorTier(
                      "EV/Revenue",
                      row.enterpriseToRevenue
                    );
                    const enterpriseToEbitdaColor = scales.evaluateColorTier(
                      "EV/EBITDA",
                      row.enterpriseToEbitda
                    );
                    const dividendYieldColor = scales.evaluateColorTier(
                      "Dividend Yield",
                      percentageDividendYield
                    );
                    const payoutRatioColor = scales.evaluateColorTier(
                      "Payout Ratio",
                      percentagePayoutRatio
                    );
                    const debtToEquityColor = scales.evaluateColorTier(
                      "Debt/Equity",
                      row.debtToEquity
                    );
                    const currentRatioColor = scales.evaluateColorTier(
                      "Current Ratio",
                      row.currentRatio
                    );
                    const betaColor = scales.evaluateColorTier("Beta", row.beta);

                    return (
                      <TableRow key={index}>
                        <TableCell
                          align="right"
                          size="small"
                          sx={{ width: "4", padding: 0, pl: isMobile ? 0 : 1 }}>
                          <IconButton color="error" onClick={() => handleDeleteRow(index)}>
                            <CloseIcon />
                          </IconButton>
                        </TableCell>
                        <TickerNameCell
                          tickerName={row.shortName}
                          tickerSymbol={row.symbol}
                          tickerPrice={row.currentPrice}
                          timeRange={timeRange}></TickerNameCell>
                        <ColorCodedCell value={row.trailingPE} color={peColor} />
                        <ColorCodedCell value={row.trailingPegRatio} color={pegColor} />
                        <ColorCodedCell
                          value={row.priceToSalesTrailing12Months}
                          color={priceToSalesColor}
                        />
                        <ColorCodedCell value={row.priceToBook} color={priceToBookColor} />
                        <ColorCodedCell value={percentageRoe} color={roeColor} suffix="%" />
                        <ColorCodedCell value={percentageRoa} color={roaColor} suffix="%" />
                        <ColorCodedCell
                          value={row.enterpriseToRevenue}
                          color={enterpriseToRevenueColor}
                        />
                        <ColorCodedCell
                          value={row.enterpriseToEbitda}
                          color={enterpriseToEbitdaColor}
                        />
                        <ColorCodedCell
                          value={percentageDividendYield}
                          color={dividendYieldColor}
                          suffix="%"
                        />
                        <ColorCodedCell
                          value={percentagePayoutRatio}
                          color={payoutRatioColor}
                          suffix="%"
                        />
                        <ColorCodedCell
                          value={row.debtToEquity}
                          color={debtToEquityColor}
                          variant="segment"
                        />
                        <ColorCodedCell
                          value={row.currentRatio}
                          color={currentRatioColor}
                          variant="pulse"
                        />
                        <ColorCodedCell value={row.beta} color={betaColor} variant="pulse" />
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Button group at bottom */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <input
            type="file"
            accept="application/json"
            id="import-json-input"
            style={{ display: "none" }}
            onChange={(e) => importFromJson(e, setTabs)}
          />
          <ButtonGroup
            variant="text"
            orientation="horizontal"
            sx={{ borderColor: "#ccc", borderRadius: 1 }}>
            <Button
              onClick={() => {
                const input = document.getElementById("import-json-input") as HTMLInputElement;
                if (input) input.click();
              }}>
              <FileDownloadIcon sx={{ mr: 1 }} />
              Import
            </Button>
            <Button onClick={() => exportToJson(tabs)}>
              <FileUploadButton sx={{ mr: 1 }} />
              Export
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
}
