import {
  TableCell,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  Circle,
} from "@mui/icons-material";

export default function ColorCodedCell({
  value,
  color,
  variant = "heatmap",
  intensity = "high", // low, medium, high - for controlling color opacity
  showIcon = false,
  prefix = "",
  suffix = "",
  formatValue = true,
}: {
  value: number;
  color: string;
  variant?: "subtle" | "minimal" | "bar" | "indicator" | "gradient" | "border" | "chip" | "heatmap" | "segment" | "pulse" | "ribbon" | "diamond";
  intensity?: "low" | "medium" | "high";
  showIcon?: boolean;
  prefix?: string;
  suffix?: string;
  formatValue?: boolean;
}) {
  
  const getOpacity = () => {
    switch (intensity) {
      case "low": return { bg: "08", hover: "12", accent: "20" };
      case "medium": return { bg: "15", hover: "25", accent: "35" };
      case "high": return { bg: "25", hover: "35", accent: "50" };
      default: return { bg: "15", hover: "25", accent: "35" };
    }
  };

  const opacity = getOpacity();
  const displayValue = formatValue ? value ? value.toFixed(2) : null: value?.toString();
  const finalValue = `${prefix}${displayValue || "—"}${suffix}`;

  const getIcon = () => {
    if (!showIcon || !value) return undefined;
    return value > 0 ? <TrendingUp sx={{ fontSize: 16 }} /> : <TrendingDown sx={{ fontSize: 16 }} />;
  };

  const renderVariant = () => {
    switch (variant) {
      case "subtle":
        return (
          <Box
            sx={{
              backgroundColor: value ? `${color}${opacity.bg}` : "transparent",
              borderLeft: value ? `3px solid ${color}` : "3px solid transparent",
              padding: "8px 12px",
              borderRadius: "4px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 0.5,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: value ? `${color}${opacity.hover}` : "transparent",
              }
            }}>
            {getIcon()}
            <Typography 
              variant="body2" 
              fontWeight={500}
              sx={{ 
                color: "text.primary",
                fontFamily: "monospace",
                fontSize: "0.875rem"
              }}>
              {finalValue}
            </Typography>
          </Box>
        );

      case "gradient":
        return (
          <Box
            sx={{
              background: value ? 
                `linear-gradient(135deg, ${color}${opacity.bg} 0%, ${color}${opacity.accent} 100%)` : 
                "transparent",
              padding: "8px 12px",
              borderRadius: "6px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 0.5,
              position: "relative",
              overflow: "hidden",
              "&::before": value ? {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: color,
                opacity: 0.6,
              } : {},
            }}>
            {getIcon()}
            <Typography 
              variant="body2" 
              fontWeight={500}
              sx={{ 
                color: "text.primary",
                fontFamily: "monospace",
                fontSize: "0.875rem"
              }}>
              {finalValue}
            </Typography>
          </Box>
        );

      case "border":
        return (
          <Box
            sx={{
              border: value ? `2px solid ${color}${opacity.accent}` : "2px solid transparent",
              backgroundColor: value ? `${color}05` : "transparent",
              padding: "6px 10px",
              borderRadius: "8px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 0.5,
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: value ? color : "transparent",
                backgroundColor: value ? `${color}${opacity.bg}` : "transparent",
              }
            }}>
            {getIcon()}
            <Typography 
              variant="body2" 
              fontWeight={500}
              sx={{ 
                color: "text.primary",
                fontFamily: "monospace",
                fontSize: "0.875rem"
              }}>
              {finalValue}
            </Typography>
          </Box>
        );

      case "chip":
        return (
          <Box
            sx={{
              padding: "8px 12px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            {value && value != undefined && value != null ? (
              <Chip
                label={finalValue}
                size="small"
                icon={getIcon()}
                sx={{
                  backgroundColor: `${color}${opacity.bg}`,
                  color: "text.primary",
                  border: `1px solid ${color}${opacity.accent}`,
                  fontFamily: "monospace",
                  fontWeight: 500,
                  "& .MuiChip-label": {
                    fontSize: "0.875rem",
                  },
                  "&:hover": {
                    backgroundColor: `${color}${opacity.hover}`,
                  }
                }}
              />
            ) : (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "text.secondary",
                  fontFamily: "monospace",
                  fontSize: "0.875rem"
                }}>
                —
              </Typography>
            )}
          </Box>
        );

      case "heatmap":
        return (
          <Box
            sx={{
              backgroundColor: value ? color : "rgba(0,0,0,0.05)",
              padding: "8px 12px",
              borderRadius: "2px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 0.5,
              transition: "all 0.2s ease",
              "&:hover": {
                filter: "brightness(1.1)",
              }
            }}>
            {getIcon()}
            <Typography 
              variant="body2" 
              fontWeight={500}
              sx={{ 
                color: value ? "white" : "text.primary",
                fontFamily: "monospace",
                fontSize: "0.875rem",
                textShadow: value ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
              }}>
              {finalValue}
            </Typography>
          </Box>
        );

      case "segment":
        return (
          <Box
            sx={{
              padding: "8px 12px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}>
            <Box
              sx={{
                display: "flex",
                gap: "2px",
                alignItems: "center",
              }}>
              {[...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: "4px",
                    height: "16px",
                    backgroundColor: value && i < Math.ceil((Math.abs(value) / 100) * 5) ? 
                      color : 
                      "rgba(0,0,0,0.1)",
                    borderRadius: "2px",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {getIcon()}
              <Typography 
                variant="body2" 
                fontWeight={500}
                sx={{ 
                  color: "text.primary",
                  fontFamily: "monospace",
                  fontSize: "0.875rem"
                }}>
                {finalValue}
              </Typography>
            </Box>
          </Box>
        );

      case "pulse":
        return (
          <Box
            sx={{
              padding: "8px 12px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
              position: "relative",
            }}>
            {value && (
              <Box
                sx={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: color,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-2px",
                    left: "-2px",
                    right: "-2px",
                    bottom: "-2px",
                    borderRadius: "50%",
                    border: `2px solid ${color}`,
                    opacity: 0.3,
                    animation: "pulse 2s infinite",
                  },
                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(1)",
                      opacity: 0.3,
                    },
                    "50%": {
                      transform: "scale(1.5)",
                      opacity: 0.1,
                    },
                    "100%": {
                      transform: "scale(1)",
                      opacity: 0.3,
                    },
                  },
                }}
              />
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {getIcon()}
              <Typography 
                variant="body2" 
                fontWeight={500}
                sx={{ 
                  color: "text.primary",
                  fontFamily: "monospace",
                  fontSize: "0.875rem"
                }}>
                {finalValue}
              </Typography>
            </Box>
          </Box>
        );

      case "ribbon":
        return (
          <Box
            sx={{
              padding: "8px 12px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 0.5,
              position: "relative",
              "&::before": value ? {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                width: "4px",
                height: "100%",
                backgroundColor: color,
                borderRadius: "2px 0 0 2px",
              } : {},
              "&::after": value ? {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: "4px",
                height: "2px",
                backgroundColor: `${color}${opacity.bg}`,
              } : {},
            }}>
            {getIcon()}
            <Typography 
              variant="body2" 
              fontWeight={500}
              sx={{ 
                color: "text.primary",
                fontFamily: "monospace",
                fontSize: "0.875rem"
              }}>
              {finalValue}
            </Typography>
          </Box>
        );

      case "diamond":
        return (
          <Box
            sx={{
              padding: "8px 12px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
            }}>
            {value && (
              <Box
                sx={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: color,
                  transform: "rotate(45deg)",
                  flexShrink: 0,
                }}
              />
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {getIcon()}
              <Typography 
                variant="body2" 
                fontWeight={500}
                sx={{ 
                  color: "text.primary",
                  fontFamily: "monospace",
                  fontSize: "0.875rem"
                }}>
                {finalValue}
              </Typography>
            </Box>
          </Box>
        );

      // Keep existing variants
      case "minimal":
        return (
          <Box
            sx={{
              padding: "8px 12px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 0.5,
              position: "relative",
              "&::after": value ? {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
                height: "2px",
                backgroundColor: color,
                borderRadius: "1px",
              } : {}
            }}>
            {getIcon()}
            <Typography 
              variant="body2" 
              fontWeight={500}
              sx={{ 
                color: "text.primary",
                fontFamily: "monospace",
                fontSize: "0.875rem"
              }}>
              {finalValue}
            </Typography>
          </Box>
        );

      case "bar":
        return (
          <Box
            sx={{
              padding: "6px 12px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}>
            <Box
              sx={{
                flex: 1,
                height: "4px",
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: "2px",
                position: "relative",
                overflow: "hidden",
              }}>
              {value && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "70%",
                    backgroundColor: color,
                    borderRadius: "2px",
                    transition: "width 0.3s ease",
                  }}
                />
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {getIcon()}
              <Typography 
                variant="body2" 
                fontWeight={500}
                sx={{ 
                  color: "text.primary",
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  minWidth: "50px",
                  textAlign: "right"
                }}>
                {finalValue}
              </Typography>
            </Box>
          </Box>
        );

      case "indicator":
        return (
          <Box
            sx={{
              padding: "8px 12px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
            }}>
            {value && (
              <Circle
                sx={{
                  fontSize: 8,
                  color: color,
                }}
              />
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {getIcon()}
              <Typography 
                variant="body2" 
                fontWeight={500}
                sx={{ 
                  color: "text.primary",
                  fontFamily: "monospace",
                  fontSize: "0.875rem"
                }}>
                {finalValue}
              </Typography>
            </Box>
          </Box>
        );

      default:
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, padding: "8px 12px" }}>
            {getIcon()}
            <Typography 
              variant="body2" 
              fontWeight={500}
              sx={{ 
                color: "text.primary",
                fontFamily: "monospace",
                fontSize: "0.875rem",
              }}>
              {finalValue}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <TableCell
      align="right"
      sx={{
        padding: "4px 8px",
        borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
      }}>
      {renderVariant()}
    </TableCell>
  );
}

// Usage examples for different stock metrics:
/*
// P/E Ratio with gradient background
<ColorCodedCell 
  value={row.peRatio} 
  colors={peColors} 
  variant="gradient" 
  intensity="medium"
  showIcon={true}
/>

// Market Cap with chip styling
<ColorCodedCell 
  value={row.marketCap} 
  colors={marketCapColors} 
  variant="chip"
  prefix="$"
  suffix="B"
  formatValue={false}
/>

// Beta with pulse indicator for volatility
<ColorCodedCell 
  value={row.beta} 
  colors={volatilityColors} 
  variant="pulse"
  intensity="high"
/>

// Revenue Growth with segment bars
<ColorCodedCell 
  value={row.revenueGrowth} 
  colors={growthColors} 
  variant="segment"
  suffix="%"
  showIcon={true}
/>

// Price Change with heatmap (works great with red/green colors)
<ColorCodedCell 
  value={row.priceChange} 
  colors={priceChangeColors} 
  variant="heatmap"
  prefix="$"
  showIcon={true}
/>

// Risk Score with border emphasis
<ColorCodedCell 
  value={row.riskScore} 
  colors={riskColors} 
  variant="border"
  intensity="high"
/>

// Volume with ribbon accent
<ColorCodedCell 
  value={row.volume} 
  colors={volumeColors} 
  variant="ribbon"
  formatValue={false}
/>

// Dividend Yield with diamond indicator
<ColorCodedCell 
  value={row.dividendYield} 
  colors={dividendColors} 
  variant="diamond"
  suffix="%"
/>
*/