const greenScale = ["#004d00", "#007a33", "#00b86b"]; // dark green → medium green → light green
const yellowScale = ["#a3cc00", "#ffd000", "#ffa000"]; // gold → orange → dark orange
const redScale = ["#ff5c00", "#d10000", "#8b0000"]; // orange-red → crimson → dark red

export const colorScales = [greenScale, yellowScale, redScale];

function getColorFromScale(
  value: number,
  min: number,
  max: number,
  colorScale: Array<string>,
  direction: "asc" | "desc" = "asc"
): string {
  const range = Math.abs(max - min);

  if (range === 0) {
    return colorScale[1]; // fallback to middle
  }

  if (direction === "desc") {
    // Reverse the scale for descending metrics
    colorScale = colorScale.slice().reverse();
  }

  // Calculate relative position of value within the range
  const relative = (value - min) / (max - min);

  // Clamp relative to [0, 1]
  const clampedRelative = Math.max(0, Math.min(1, relative));

  if (clampedRelative < 0.33) return colorScale[0]; // first color
  if (clampedRelative < 0.66) return colorScale[1]; // middle color
  return colorScale[2]; // last color
}

function calculateScale(
  value: number,
  thresholds: number[],
  direction: "asc" | "desc" = "asc"
): string {
  // For ascending: lower values are better (green), higher values are worse (red)
  // For descending: higher values are better (green), lower values are worse (red)
  console.log(
    "Calculating scale for value:",
    value,
    "with thresholds:",
    thresholds,
    "and direction:",
    direction
  );
  const isAscending = direction === "asc";

  if (isAscending) {
    // Ensure thresholds are in ascending order for ascending metrics
    // 1 2 5
    thresholds.sort((a, b) => a - b);
    for (let i = 0; i < thresholds.length; i++) {
      if (value <= thresholds[i]) {
        // Determine color scale index based on range position
        const colorScale = colorScales[i];
        return getColorFromScale(
          value,
          thresholds[i - 1] ?? 0,
          thresholds[i],
          colorScale,
          direction
        );
      }
    }
  } else {
    // Ensure thresholds are in descending order for descending metrics
    // 30 20 10
    thresholds.sort((a, b) => b - a);
    for (let i = 0; i < thresholds.length; i++) {
      if (value >= thresholds[i]) {
        // Determine color scale index based on range position
        const colorScale = colorScales[i];
        return getColorFromScale(
          value,
          thresholds[i - 1] ?? 0,
          thresholds[i],
          colorScale,
          direction
        );
      }
    }
  }

  // If we reach here, value is outside all thresholds
  if (isAscending) {
    // Value is above the highest threshold
    const colorScale = colorScales[colorScales.length - 1]; // red scale
    return colorScale[colorScale.length - 1]; // lightest shade
  } else {
    // Value is below the lowest threshold
    const colorScale = colorScales[2]; // green scale
    return colorScale[2]; // darkest shade
  }
}

type ThresholdDefinition = {
  excellent: number;
  good: number;
  poor?: number;
  direction: "asc" | "desc"; // "asc" = higher is worse, "desc" = higher is better
};

// Threshold variables
export const peThresholds: ThresholdDefinition = {
  excellent: 15,
  good: 25,
  poor: 35,
  direction: "asc",
};
export const pegThresholds: ThresholdDefinition = {
  excellent: 1,
  good: 2,
  poor: 5,
  direction: "asc",
};
export const priceToSalesThresholds: ThresholdDefinition = {
  excellent: 1,
  good: 2,
  poor: 5,
  direction: "asc",
};
export const priceToBookThresholds: ThresholdDefinition = {
  excellent: 1,
  good: 3,
  poor: 6,
  direction: "asc",
};
export const roeThresholds: ThresholdDefinition = {
  excellent: 30,
  good: 20,
  poor: 10,
  direction: "desc",
};
export const roaThresholds: ThresholdDefinition = {
  excellent: 15,
  good: 10,
  poor: 5,
  direction: "desc",
};
export const evToRevenueThresholds: ThresholdDefinition = {
  excellent: 1,
  good: 3,
  poor: 5,
  direction: "asc",
};
export const evToEbitdaThresholds: ThresholdDefinition = {
  excellent: 8,
  good: 10,
  poor: 12,
  direction: "asc",
};
export const currentRatioThresholds: ThresholdDefinition = {
  excellent: 1,
  good: 2,
  poor: 3,
  direction: "desc",
};
export const dividendYieldThresholds: ThresholdDefinition = {
  excellent: 4,
  good: 3,
  poor: 2,
  direction: "desc",
};
export const payoutRatioThresholds: ThresholdDefinition = {
  excellent: 50,
  good: 60,
  poor: 80,
  direction: "asc",
};
export const debtToEquityThresholds: ThresholdDefinition = {
  excellent: 1,
  good: 2,
  poor: 3,
  direction: "asc",
};
export const betaThresholds: ThresholdDefinition = {
  excellent: 1,
  good: 2,
  poor: 3,
  direction: "asc",
};

export function evaluateColorTier(metric: string, value: number): string {
  if (value < 0 || value === null || value === undefined) {
    return "#000000"; // black for negative values
  }
  const thresholds = getThresholds(metric);
  const { excellent, good, poor, direction } = thresholds;

  const thresholdValues = [excellent, good];
  if (poor !== undefined) thresholdValues.push(poor);

  return calculateScale(value, thresholdValues, direction);
}

export function getThresholds(metric: string): ThresholdDefinition {
  switch (metric) {
    case "P/E":
      return peThresholds;
    case "PEG":
      return pegThresholds;
    case "P/S":
      return priceToSalesThresholds;
    case "P/B":
      return priceToBookThresholds;
    case "Dividend Yield":
      return dividendYieldThresholds;
    case "Payout Ratio":
      return payoutRatioThresholds;
    case "Debt/Equity":
      return debtToEquityThresholds;
    case "Current Ratio":
      return currentRatioThresholds;
    case "Beta":
      return betaThresholds;
    case "ROE":
      return roeThresholds;
    case "ROA":
      return roaThresholds;
    case "EV/Revenue":
      return evToRevenueThresholds;
    case "EV/EBITDA":
      return evToEbitdaThresholds;
    default:
      throw new Error(`Unknown metric: ${metric}`);
  }
}

// console.log("=== TEST COLORS ===");

// // Test P/E values (ascending - lower is better)
// console.log("P/E 10:", evaluateColorTier("P/E", 10)); // should be GREEN (excellent)
// console.log("P/E 20:", evaluateColorTier("P/E", 20)); // should be YELLOW (good)
// console.log("P/E 30:", evaluateColorTier("P/E", 30)); // should be RED (poor)
// console.log("P/E 40:", evaluateColorTier("P/E", 40)); // should be RED (worse than poor)

// // Test ROE values (descending - higher is better)
// console.log("ROE 57.42:", evaluateColorTier("ROE", 57.42)); // should be GREEN (better than excellent)
// console.log("ROE 35:", evaluateColorTier("ROE", 35)); // should be GREEN (excellent)
// console.log("ROE 25:", evaluateColorTier("ROE", 25)); // should be YELLOW (good)
// console.log("ROE 5:", evaluateColorTier("ROE", 5)); // should be RED (poor)

// // Test Current Ratio (descending - higher is better, but not too high)
// console.log("Current Ratio 2.5:", evaluateColorTier("Current Ratio", 2.5)); // should be GREEN
// console.log("Current Ratio 1.5:", evaluateColorTier("Current Ratio", 1.5)); // should be YELLOW
// console.log("Current Ratio 0.5:", evaluateColorTier("Current Ratio", 0.5)); // should be RED
