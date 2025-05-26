import {
  TableCell,
  Box,
} from "@mui/material";

export default function ColorCodedCell({
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
          background: value ? colors.interpolatedColor : "transparent",
          padding: "5px",
          border: `2px solid black`,
          width: 1,
          minHeight: "34px",
        }}>
        {value?.toFixed(2)}
      </Box>
    </TableCell>
  );
}