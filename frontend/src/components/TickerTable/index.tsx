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
  Link,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import Grid from "@mui/material/Grid2";

import {
  BookmarkAdd as BookmarkAddIcon,
  BookmarkRemove as BookmarkRemoveIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import axios from "axios";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as scales from "../../utils/scales";

import { storeList, retrieveList } from "../../utils/store";
import React from "react";

const colors = scales.colorScales.flat();

const headerData = [
  { tooltip: "The current trading price of the stock", headerTitle: "Current Price" },
  {
    tooltip:
      "Price-to-Earnings ratio, a valuation metric for determining the relative value of a company's shares",
    headerTitle: "P/E",
  },
  {
    tooltip:
      "Price/Earnings to Growth ratio, used to determine a stock's value while taking the company's earnings growth into account",
    headerTitle: "PEG",
  },
  {
    tooltip:
      "Price-to-Sales ratio, a valuation ratio that compares a company's stock price to its revenues",
    headerTitle: "P/S",
  },
  {
    tooltip: "Price-to-Book ratio, used to compare a firm's market value to its book value",
    headerTitle: "P/B",
  },
  // {
  //   tooltip:
  //     "Dividend yield, a financial ratio that shows how much a company pays out in dividends each year relative to its stock price",
  //   headerTitle: "Dividend Yield",
  // },
  // {
  //   tooltip: "Payout ratio, the proportion of earnings paid out as dividends to shareholders",
  //   headerTitle: "Payout Ratio",
  // },
  {
    tooltip:
      "Debt-to-Equity ratio, a measure of a company's financial leverage calculated by dividing its total liabilities by stockholders' equity",
    headerTitle: "Debt/Equity",
  },
  {
    tooltip:
      "Current ratio, a liquidity ratio that measures a company's ability to pay short-term obligations",
    headerTitle: "Current Ratio",
  },
  {
    tooltip: "Beta, a measure of a stock's volatility in relation to the overall market",
    headerTitle: "Beta",
  },
];

interface HeaderData {
  tooltip: string;
  headerTitle: string;
}

function HeaderCell({ headerTitle, tooltip }: HeaderData) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const metricThresholds: { excellent?: string; good?: string; poor?: string } =
    scales.getThresholds(headerTitle); // Dynamically fetch colors based on metric

  return (
    <TableCell align="right">
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="subtitle2">
        {headerTitle}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 1,
          }}>
          <Typography sx={{ mb: 1 }}>{tooltip}</Typography>
          <Grid container direction={"row"}>
            {colors.map((color, index) => (
              <Grid container key={index} alignItems="center" direction={"column"}>
                <Grid
                  sx={{
                    background: color,
                    width: 25,
                    height: 25,
                    border: "2px solid black",
                  }}
                />
                <Grid>
                  {index === 2 && <Typography>{metricThresholds.excellent}</Typography>}
                  {index === 5 && <Typography>{metricThresholds.good}</Typography>}
                  {index === 8 && <Typography>{metricThresholds.poor}</Typography>}
                </Grid>
                <Grid>
                  {index === 2 && <Typography sx={{ width: 0 }}>Excellent</Typography>}
                  {index === 5 && <Typography sx={{ width: 0 }}>Good</Typography>}
                  {index === 8 && <Typography sx={{ width: 0 }}>Poor</Typography>}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Popover>
    </TableCell>
  );
}

function ColorCodedCell({
  value,
  colors,
}: {
  value: number;
  colors: { interpolatedColor: string };
}) {
  return (
    <TableCell
      align="right"
      sx={{
        padding: "10px",
      }}>
      <Box
        sx={{
          background: colors.interpolatedColor,
          padding: "5px",
          border: `2px solid black`,
          width: 1,
        }}>
        {value?.toFixed(2)}
      </Box>
    </TableCell>
  );
}

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
  rows: TickerData[];
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
  const queryClient = useQueryClient();

  const [tickerSymbol, setTickerSymbol] = useState<string>("");

  const [tabs, setTabs] = useState<TabData[]>([{ label: "General", index: 0, rows: [] }]);

  const [rows, setRows] = useState<TickerData[]>(tabs[0].rows);

  const [currentTab, setCurrentTab] = useState<TabData>(tabs[0]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [tabOperation, setTabOperation] = useState<string>("");
  const [newTabName, setNewTabName] = useState<string>("");

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, tabOperation: string) => {
    setTabOperation(tabOperation);
    setAnchorEl(event.currentTarget);
  };

  const query = useQuery({
    queryKey: ["tickerData"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8000/stock${tickerSymbol ? `?ticker=${tickerSymbol}` : ""}`
      );
      return response.data;
    },
    retry: false,
    enabled: false,
  });

  const handleSubmitTicker = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return;
    queryClient.invalidateQueries({ queryKey: ["tickerData"] });
    query.refetch();
    setTickerSymbol("");
  };

  useEffect(() => {
    if (query.isSuccess) {
      setRows((prev) => [...prev, query.data]);

      // Change data of tab # where query took place
      const newTabs = tabs.map((tab) =>
        tab.index === currentTab.index ? { ...tab, rows: [...tab.rows, query.data] } : tab
      );

      setTabs(newTabs);
      storeList(`tickerTabs`, newTabs);
    }
  }, [query.isSuccess, query.data]);

  const handleDeleteRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));

    // Remove the row from the current tab
    const updatedTabs = tabs.map((tab) =>
      tab.index === currentTab.index
        ? { ...tab, rows: tab.rows.filter((_, i) => i !== index) }
        : tab
    );

    setTabs(updatedTabs);
    storeList("tickerTabs", updatedTabs);
  };

  const handleAddTab = (newTabName: string) => {
    console.log("Adding new tab", newTabName);
    const newTab: TabData = {
      label: newTabName,
      index: tabs.length,
      rows: [],
    };
    setTabs((prev) => [...prev, newTab]);
    storeList("tickerTabs", [...tabs, newTab]);
  };

  useEffect(() => {
    const storedList = retrieveList("tickerTabs") as unknown as TabData[];
    console.log("Parsed Tabs", storedList);
    if (storedList.length > 0) {
      const parsedTabs: TabData[] = storedList.map((tab) => ({
        label: tab.label,
        index: tab.index,
        rows: tab.rows || [],
      }));
      setTabs(parsedTabs);
      setRows(parsedTabs[0].rows);
      setCurrentTab(parsedTabs[0]);
    } else {
      setTabs([{ label: "General", index: 0, rows: [] }]);
      setCurrentTab({ label: "General", index: 0, rows: [] });
      setRows([]);
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(tabs[newValue]);
    setRows(tabs[newValue].rows);
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
      <Stack spacing={1} direction={"row"} sx={{ width: "auto", height: "auto" }}>
        <TextField
          id="contained"
          label="Ticker Symbol"
          variant="outlined"
          value={tickerSymbol}
          onChange={(event) => setTickerSymbol(event.target.value)}
          onKeyDown={handleSubmitTicker}
        />
        <Tabs
          value={currentTab.index}
          onChange={handleTabChange}
          scrollButtons="auto"
          variant="scrollable">
          {tabs.map((tab) => (
            <Tab
              key={tab.index}
              label={tab.label}
              onClick={() => {
                setCurrentTab(tab);
                setRows(tab.rows);
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
                      const newTabs = tabs.filter((tab) => tab.label !== event.target.value);
                      setTabs(newTabs);
                      storeList("tickerTabs", newTabs);
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
              {rows.map((row, index) => {
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
                    <TableCell component="th" scope="row">
                      <Link
                        href={`https://finance.yahoo.com/quote/${row.symbol}`}
                        target="_blank"
                        underline="hover">
                        {row.shortName}
                      </Link>
                    </TableCell>
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
