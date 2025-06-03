import { TableCell, Box, Typography, Popover, Link, Stack, Chip } from "@mui/material";
import TradingViewWidget from "../TradingViewWidget";
import React from "react";
import { useIsMobile } from "../../hooks/MobileContext";

type TickerProps = {
  tickerName: string;
  tickerSymbol: string;
  tickerPrice: number;
  timeRange: string;
};

export default function TickerNameCell(props: TickerProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const isMobile = useIsMobile();

  const { tickerName, tickerSymbol, tickerPrice, timeRange } = props;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableCell align="left">
      <Box
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onClick={handlePopoverOpen}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          padding: "8px 12px",
          borderRadius: 2,
          width: "200px",
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          "&:hover": {
            borderColor: "success.main",
            backgroundColor: "action.hover",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            "& .ticker-name": {
              color: "success.main",
            },
            "& .ticker-symbol": {
              opacity: 1,
            },
            "& .ticker-price": {
              opacity: 1,
            },
          },
        }}>
        <Stack direction={"column"} width={"100%"}>
          <Typography
            className="ticker-name"
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              transition: "color 0.2s ease",
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "fit-content",
            }}>
            {tickerName}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="space-between" width={"100%"}>
            <Typography
              className="ticker-symbol"
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "0.7rem",
                letterSpacing: "0.5px",
                opacity: 0.7,
                transition: "opacity 0.2s ease",
                textTransform: "uppercase",
                width: "fit-content",
              }}>
              {tickerSymbol}
            </Typography>
            <Typography
              className="ticker-price"
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "0.7rem",
                letterSpacing: "0.5px",
                opacity: 0.7,
                transition: "opacity 0.2s ease",
                textTransform: "uppercase",
                width: "fit-content",
              }}>
              {tickerPrice?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Popover
        id="mouse-over-popover"
        open={open}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: isMobile ? "bottom" : "bottom",
          horizontal: isMobile ? "center" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: isMobile ? "center" : "left",
        }}
        disableRestoreFocus
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            // Mobile-specific styles
            width: "100vw",
            maxWidth: isMobile ? "95vw" : "100dvh",
            height: isMobile ? "80vh" : "auto",
            maxHeight: isMobile ? "80vh" : "450px",
          },
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: isMobile ? 1.5 : 2,
            width: "100%",
            height: isMobile ? "100%" : "450px",
            backgroundColor: "background.paper",
            overflow: "hidden",
          }}>
          {/* Header */}
          <Box sx={{ width: "100%", pb: isMobile ? 1 : 2,}}>
            <Stack
              direction={"row"}
              spacing={isMobile ? 1 : 2}
              justifyContent="space-between"
              alignItems={"center"}
              width="100%">
              <Link
                href={`https://finance.yahoo.com/quote/${props.tickerSymbol}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: 500,
                  fontSize: isMobile ? "0.8rem" : "0.875rem",
                  textAlign: isMobile ? "center" : "left",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}>
                View {props.tickerSymbol} on Yahoo Finance
              </Link>

              <Chip
                label="Close"
                size={isMobile ? "medium" : "small"}
                variant="outlined"
                onClick={handlePopoverClose}
                sx={{
                  cursor: "pointer",
                  borderColor: "divider",
                  minHeight: isMobile ? 36 : "auto",
                  alignSelf: isMobile ? "center" : "auto",
                  "&:hover": {
                    backgroundColor: "error.main",
                    color: "white",
                    borderColor: "error.main",
                  },
                }}
              />
            </Stack>
          </Box>

          {/* Chart container */}
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              height: "100%",
              minHeight: 0, // Important for flex child
              position: "relative",
              overflow: "hidden",
            }}>
            <TradingViewWidget tickerSymbol={props.tickerSymbol} timeRange={timeRange}/>
          </Box>
        </Box>
      </Popover>
    </TableCell>
  );
}
