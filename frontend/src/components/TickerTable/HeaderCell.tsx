import {
  TableCell,
  Box,
  Typography,
  Popover,
} from "@mui/material";

import Grid from "@mui/material/Grid2";

import * as scales from "../../utils/scales";

import React from "react";

const colors = scales.colorScales.flat();

interface HeaderData {
  tooltip: string;
  headerTitle: string;
}

export default function HeaderCell({ headerTitle, tooltip }: HeaderData) {
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