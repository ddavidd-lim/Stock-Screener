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
  Badge,
  Typography,
  Popover,
} from "@mui/material";

import Grid from "@mui/material/Grid2";

import { Close as CloseIcon } from "@mui/icons-material";

import { useEffect, useState } from "react";
import axios from "axios";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as columnScales from "../../utils/scales";

import { storeList, retrieveList } from "../../utils/store";
import React from "react";

import { colors } from "../../utils/scales";
import * as scales from "../../utils/scales";

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
  {
    tooltip:
      "Dividend yield, a financial ratio that shows how much a company pays out in dividends each year relative to its stock price",
    headerTitle: "Dividend Yield",
  },
  {
    tooltip: "Payout ratio, the proportion of earnings paid out as dividends to shareholders",
    headerTitle: "Payout Ratio",
  },
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
        onMouseLeave={handlePopoverClose}>
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
  colors: { interpolatedColor: string; basicColor: string };
}) {
  return (
    <TableCell
      align="right"
      sx={{
        padding: "10px",
      }}>
      <Badge
        badgeContent={" "}
        color={
          colors.basicColor == "#00FF00"
            ? "success"
            : colors.basicColor == "#FFFF00"
            ? "warning"
            : "error"
        }
        sx={{ width: 1 }}>
        <Box
          sx={{
            background: colors.interpolatedColor,
            padding: "5px",
            border: `2px solid black`,
            width: 1,
          }}>
          {value.toFixed(2)}
        </Box>
      </Badge>
    </TableCell>
  );
}

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
  interface TickerData {
    shortName: string;
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

  const queryClient = useQueryClient();

  const [rows, setRows] = useState<TickerData[]>([]);

  const [tickerSymbol, setTickerSymbol] = useState<string>("");

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
      storeList(
        "tickerList",
        [...rows, query.data].map((row) => JSON.stringify(row))
      );
    }
  }, [query.isSuccess, query.data]);

  const handleDeleteRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
    storeList(
      "tickerList",
      rows.filter((_, i) => i !== index).map((row) => JSON.stringify(row))
    );
  };

  useEffect(() => {
    const storedList = retrieveList("tickerList");
    setRows(storedList.map((row) => JSON.parse(row)));
  }, []);

  return (
    <Box
      sx={{
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        overflow: "hidden",
      }}>
      <Stack spacing={2} direction={"row"}>
        <TextField
          id="contained"
          label="Ticker Symbol"
          variant="outlined"
          value={tickerSymbol}
          onChange={(event) => setTickerSymbol(event.target.value)}
          onKeyDown={handleSubmitTicker}
          sx={{ overflow: "hidden" }}
        />
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 650, flexGrow: 1, height: 0 }}
            aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                {headerData.map((data, index) => (
                  <HeaderCell key={index} headerTitle={data.headerTitle} tooltip={data.tooltip} />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                const peColors = columnScales.peScale(row.trailingPE);
                const pegColors = columnScales.pegScale(row.trailingPegRatio);
                const priceToSalesColors = columnScales.priceToSalesScale(
                  row.priceToSalesTrailing12Months
                );
                const priceToBookColors = columnScales.priceToBookScale(row.priceToBook);
                const dividendYieldColors = columnScales.dividendYieldScale(
                  row.trailingAnnualDividendYield
                );
                const payoutRatioColors = columnScales.payoutRatioScale(row.payoutRatio);
                const debtToEquityColors = columnScales.debtToEquityScale(row.debtToEquity);
                const currentRatioColors = columnScales.currentRatioScale(row.currentRatio);
                const betaColors = columnScales.betaScale(row.beta);

                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.shortName}
                    </TableCell>
                    <TableCell align="right">{row.currentPrice}</TableCell>
                    <ColorCodedCell value={row.trailingPE} colors={peColors} />
                    <ColorCodedCell value={row.trailingPegRatio} colors={pegColors} />
                    <ColorCodedCell
                      value={row.priceToSalesTrailing12Months}
                      colors={priceToSalesColors}
                    />
                    <ColorCodedCell value={row.priceToBook} colors={priceToBookColors} />
                    <ColorCodedCell
                      value={row.trailingAnnualDividendYield}
                      colors={dividendYieldColors}
                    />
                    <ColorCodedCell value={row.payoutRatio} colors={payoutRatioColors} />
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
