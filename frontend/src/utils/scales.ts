/* eslint-disable @typescript-eslint/no-unused-vars */

const greenScale = ["#228B22", "#32CD32", "#00FF00"];
const yellowScale = ["#FFFF00", "#FFDD00", "#FFBB00"];
const redScale = ["#FF4D4D", "#FF0000", "#CC0000"];

export const colorScales = [greenScale, yellowScale, redScale];

function getColorFromScale(
  value: number,
  min: number,
  max: number,
  colorScale: Array<string>
): string {
  const range = max - min;
  const third = range / 3;
  let index = Math.floor((value - min) / third);

  if (index >= colorScale.length) {
    index = colorScale.length - 1;
  }

  return colorScale[index];
}

function calculateScale(
  value: number,
  thresholds: number[]
): { interpolatedColor: string; basicColor: string } {
  for (let i = 0; i < thresholds.length; i++) {
    if (value < thresholds[i]) {
      if (i == 0) {
        return {
          interpolatedColor: getColorFromScale(value, 0, thresholds[i], colorScales[i]),
          basicColor: colorScales[i][0],
        };
      } else {
        return {
          interpolatedColor: getColorFromScale(
            value,
            thresholds[i - 1],
            thresholds[i],
            colorScales[i]
          ),
          basicColor: colorScales[i][0],
        };
      }
    }
  }
  return {
    interpolatedColor: colorScales[colorScales.length - 1][2],
    basicColor: colorScales[colorScales.length - 1][2],
  };
}

// Threshold variables
export const peThresholds = { excellent: 15, good: 25, poor: 35 };
export const pegThresholds = { excellent: 1, good: 2, poor: 5 };
export const priceToSalesThresholds = { excellent: 1, good: 2, poor: 5 };
export const priceToBookThresholds = { excellent: 1, good: 3, poor: 6 };
export const dividendYieldThresholds = { excellent: 2, good: 4 };
export const payoutRatioThresholds = { excellent: 50, good: 60, poor: 80 };
export const debtToEquityThresholds = { excellent: 1, good: 2, poor: 3 };
export const currentRatioThresholds = { excellent: 1, good: 2, poor: 3 };
export const betaThresholds = { excellent: 1, good: 2, poor: 3 };
export const roeThresholds = { excellent: 10, good: 20, poor: 30 };
export const roaThresholds = { excellent: 5, good: 10, poor: 15 };
export const evToRevenueThresholds = { excellent: 1, good: 3, poor: 5 };
export const evToEbitdaThresholds = { excellent: 8, good: 10, poor: 12 };

function generateScale(
  metric: string,
  value: number
): { interpolatedColor: string; basicColor: string } {
  const thresholds = getThresholds(metric);
  const thresholdValues = Object.values(thresholds) as number[];
  return calculateScale(value, thresholdValues);
}

export { generateScale };
export function getThresholds(metric: string) {
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
      return {};
  }
}
