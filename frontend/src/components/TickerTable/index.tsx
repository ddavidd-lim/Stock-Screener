import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TextField,
  Box,
  Stack,
  IconButton,
} from "@mui/material";

import { Close as CloseIcon } from "@mui/icons-material";

import { useEffect, useState } from "react";
import axios from "axios";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as columnScales from "../../utils/scales";

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
  });

  const handleSubmitTicker = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return;
    queryClient.invalidateQueries({ queryKey: ["tickerData"] });
    setTickerSymbol("");
  };

  useEffect(() => {
    if (query.isSuccess) {
      console.log(query.data);
      setRows((prev) => [...prev, query.data]);
    }
  }, [query.isSuccess, query.data]);

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
        <TextField variant="outlined" label="" />
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
                <Tooltip title="The current trading price of the stock" placement="bottom">
                  <TableCell align="right">Current Price</TableCell>
                </Tooltip>
                <Tooltip
                  title="Price-to-Earnings ratio, a valuation metric for determining the relative value of a company's shares"
                  placement="bottom">
                  <TableCell align="right">P/E</TableCell>
                </Tooltip>
                <Tooltip
                  title="Price/Earnings to Growth ratio, used to determine a stock's value while taking the company's earnings growth into account"
                  placement="bottom">
                  <TableCell align="right">PEG</TableCell>
                </Tooltip>
                <Tooltip
                  title="Price-to-Sales ratio, a valuation ratio that compares a company's stock price to its revenues"
                  placement="bottom">
                  <TableCell align="right">P/S</TableCell>
                </Tooltip>
                <Tooltip
                  title="Price-to-Book ratio, used to compare a firm's market value to its book value"
                  placement="bottom">
                  <TableCell align="right">P/B</TableCell>
                </Tooltip>
                <Tooltip
                  title="Dividend yield, a financial ratio that shows how much a company pays out in dividends each year relative to its stock price"
                  placement="bottom">
                  <TableCell align="right">Dividend Yield</TableCell>
                </Tooltip>
                <Tooltip
                  title="Payout ratio, the proportion of earnings paid out as dividends to shareholders"
                  placement="bottom">
                  <TableCell align="right">Payout Ratio</TableCell>
                </Tooltip>
                <Tooltip
                  title="Debt-to-Equity ratio, a measure of a company's financial leverage calculated by dividing its total liabilities by stockholders' equity"
                  placement="bottom">
                  <TableCell align="right">Debt/Equity</TableCell>
                </Tooltip>
                <Tooltip
                  title="Current ratio, a liquidity ratio that measures a company's ability to pay short-term obligations"
                  placement="bottom">
                  <TableCell align="right">Current Ratio</TableCell>
                </Tooltip>
                <Tooltip
                  title="Beta, a measure of a stock's volatility in relation to the overall market"
                  placement="bottom">
                  <TableCell align="right">Beta</TableCell>
                </Tooltip>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                const peColor = columnScales.peScale(row.trailingPE);
                const pegColor = columnScales.pegScale(row.trailingPegRatio);
                const priceToSalesColor = columnScales.priceToSalesScale(
                  row.priceToSalesTrailing12Months
                );
                const priceToBookColor = columnScales.priceToBookScale(row.priceToBook);
                const dividendYieldColor = columnScales.dividendYieldScale(
                  row.trailingAnnualDividendYield
                );
                console.log(dividendYieldColor);
                const payoutRatioColor = columnScales.payoutRatioScale(row.payoutRatio);
                const debtToEquityColor = columnScales.debtToEquityScale(row.debtToEquity);
                const currentRatioColor = columnScales.currentRatioScale(row.currentRatio);
                const betaColor = columnScales.betaScale(row.beta);

                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.shortName}
                    </TableCell>
                    <TableCell align="right">{row.currentPrice}</TableCell>
                    <TableCell
                      align="right"
                      sx={{ background: peColor, border: `1px solid ${peColor}` }}>
                      {row.trailingPE}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ background: pegColor, border: `1px solid ${pegColor}` }}>
                      {row.trailingPegRatio}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        background: priceToSalesColor,
                        border: `1px solid ${priceToSalesColor}`,
                      }}>
                      {row.priceToSalesTrailing12Months}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        background: priceToBookColor,
                        border: `1px solid ${priceToBookColor}`,
                      }}>
                      {row.priceToBook}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        background: dividendYieldColor,
                        border: `1px solid ${dividendYieldColor}`,
                      }}>
                      {row.trailingAnnualDividendYield}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        background: payoutRatioColor,
                        border: `1px solid ${payoutRatioColor}`,
                      }}>
                      {row.payoutRatio}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        background: debtToEquityColor,
                        border: `1px solid ${debtToEquityColor}`,
                      }}>
                      {row.debtToEquity}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        background: currentRatioColor,
                        border: `1px solid ${currentRatioColor}`,
                      }}>
                      {row.currentRatio}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ background: betaColor, border: `1px solid ${betaColor}` }}>
                      {row.beta}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setRows(rows.filter((_, i) => i !== index));
                        }}>
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
