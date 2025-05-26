import { TableCell, Box, Typography, Popover, Link, Stack } from "@mui/material";

import TradingViewWidget from "../TradingViewWidget";
import React from "react";

type TickerProps = {
  tickerName: string;
  tickerSymbol: string;
};

export default function TickerNameCell(props: TickerProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableCell align="right">
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        variant="subtitle2"
        sx={{
          cursor: "pointer",
          textDecoration: "underline",
          color: "primary.main",
        }}>
        {props.tickerName}
      </Typography>
      <Popover
        id="mouse-over-popover"
        open={open}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableRestoreFocus>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            padding: 1,
            width: "800px",
            height: "450px",
          }}>
          <Box sx={{ alignSelf: "flex-end" }} width={"100%"}>
            <Stack direction="row" spacing={1} justifyContent={"space-between"} width={"100%"}>
              <Link href={`https://finance.yahoo.com/quote/${props.tickerSymbol}`}>
                {props.tickerSymbol} on Yahoo Finance
              </Link>
              <Typography
                variant="caption"
                onClick={handlePopoverClose}
                sx={{ cursor: "pointer", color: "grey.500" }}>
                Close ✕
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
            <TradingViewWidget tickerSymbol={props.tickerSymbol} />
          </Box>
        </Box>
      </Popover>
    </TableCell>
  );
}
