import {
  TableCell,
  Box,
} from "@mui/material";

export function ColorCodedCell({
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