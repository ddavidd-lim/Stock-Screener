import { alpha } from '@mui/material/styles';

/* eslint-disable @typescript-eslint/no-unused-vars */

const green = "#00FF00";
const yellow = "#FFFF00";
const red = "#FF0000";

// Threshold variables
const peThresholds = { excellent: 15, good: 25, poor: 35 };
const pegThresholds = { excellent: 1, good: 2, poor: 25 };
const priceToSalesThresholds = { excellent: 1, good: 2, poor: 25 };
const priceToBookThresholds = { excellent: 1, good: 3, poor: 25 };
const dividendYieldThresholds = { excellent: 2, good: 4 };
const payoutRatioThresholds = { excellent: 50, good: 60, poor: 80 };
const debtToEquityThresholds = { excellent: 1, good: 2, poor: 3 };
const currentRatioThresholds = { excellent: 1, good: 2 };
const betaThresholds = { excellent: 1, good: 2, poor: 3 };
const roeThresholds = { excellent: 10, good: 20 };
const roaThresholds = { excellent: 5, good: 10 };
const evToRevenueThresholds = { excellent: 1, good: 3, poor: 5 };
const evToEbitdaThresholds = { excellent: 8, good: 10, poor: 12 };

function interpolateColor(value: number, min: number, max: number, color1: string, color2: string): string {
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const hex = (color: string) => {
    const bigint = parseInt(color.slice(1), 16);
    return [bigint >> 16 & 255, bigint >> 8 & 255, bigint & 255];
  };
  const [r1, g1, b1] = hex(color1);
  const [r2, g2, b2] = hex(color2);
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

function peScale(pe: number): { interpolatedColor: string, basicColor: string } {
  if (pe < peThresholds.excellent) {
    return { interpolatedColor: green, basicColor: green };
  } else if (pe < peThresholds.good) {
    return { interpolatedColor: interpolateColor(pe, peThresholds.excellent, peThresholds.good, green, yellow), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(pe, peThresholds.good, peThresholds.poor, yellow, red), basicColor: red };
  }
}

function pegScale(peg: number): { interpolatedColor: string, basicColor: string } {
  if (peg < pegThresholds.excellent) {
    return { interpolatedColor: green, basicColor: green };
  } else if (peg < pegThresholds.good) {
    return { interpolatedColor: interpolateColor(peg, pegThresholds.excellent, pegThresholds.good, green, yellow), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(peg, pegThresholds.good, pegThresholds.poor, yellow, red), basicColor: red };
  }
}

function priceToSalesScale(priceToSales: number): { interpolatedColor: string, basicColor: string } {
  if (priceToSales < priceToSalesThresholds.excellent) {
    return { interpolatedColor: green, basicColor: green };
  } else if (priceToSales < priceToSalesThresholds.good) {
    return { interpolatedColor: interpolateColor(priceToSales, priceToSalesThresholds.excellent, priceToSalesThresholds.good, green, yellow), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(priceToSales, priceToSalesThresholds.good, priceToSalesThresholds.poor, yellow, red), basicColor: red };
  }
}

function priceToBookScale(priceToBook: number): { interpolatedColor: string, basicColor: string } {
  if (priceToBook < priceToBookThresholds.excellent) {
    return { interpolatedColor: green, basicColor: green };
  } else if (priceToBook < priceToBookThresholds.good) {
    return { interpolatedColor: interpolateColor(priceToBook, priceToBookThresholds.excellent, priceToBookThresholds.good, green, yellow), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(priceToBook, priceToBookThresholds.good, priceToBookThresholds.poor, yellow, red), basicColor: red };
  }
}

function dividendYieldScale(dividendYield: number): { interpolatedColor: string, basicColor: string } {
  if (dividendYield > dividendYieldThresholds.good) {
    return { interpolatedColor: green, basicColor: green };
  } else if (dividendYield > dividendYieldThresholds.excellent) {
    return { interpolatedColor: interpolateColor(dividendYield, dividendYieldThresholds.excellent, dividendYieldThresholds.good, yellow, green), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(dividendYield, 0, dividendYieldThresholds.excellent, red, yellow), basicColor: red };
  }
}

function payoutRatioScale(payoutRatio: number): { interpolatedColor: string, basicColor: string } {
  if (payoutRatio < payoutRatioThresholds.excellent) {
    return { interpolatedColor: green, basicColor: green };
  } else if (payoutRatio < payoutRatioThresholds.good) {
    return { interpolatedColor: interpolateColor(payoutRatio, payoutRatioThresholds.excellent, payoutRatioThresholds.good, green, yellow), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(payoutRatio, payoutRatioThresholds.good, payoutRatioThresholds.poor, yellow, red), basicColor: red };
  }
}

function debtToEquityScale(debtToEquity: number): { interpolatedColor: string, basicColor: string } {
  if (debtToEquity <= debtToEquityThresholds.excellent) {
    return { interpolatedColor: green, basicColor: green };
  } else if (debtToEquity < debtToEquityThresholds.good) {
    return { interpolatedColor: interpolateColor(debtToEquity, debtToEquityThresholds.excellent, debtToEquityThresholds.good, green, yellow), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(debtToEquity, debtToEquityThresholds.good, debtToEquityThresholds.poor, yellow, red), basicColor: red };
  }
}

function currentRatioScale(currentRatio: number): { interpolatedColor: string, basicColor: string } {
  if (currentRatio > currentRatioThresholds.good) {
    return { interpolatedColor: green, basicColor: green };
  } else if (currentRatio > currentRatioThresholds.excellent) {
    return { interpolatedColor: interpolateColor(currentRatio, currentRatioThresholds.excellent, currentRatioThresholds.good, yellow, green), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(currentRatio, 0, currentRatioThresholds.excellent, red, yellow), basicColor: red };
  }
}

function betaScale(beta: number): { interpolatedColor: string, basicColor: string } {
  if (beta < betaThresholds.excellent) {
    return { interpolatedColor: green, basicColor: green };
  } else if (beta < betaThresholds.good) {
    return { interpolatedColor: interpolateColor(beta, betaThresholds.excellent, betaThresholds.good, green, yellow), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(beta, betaThresholds.good, betaThresholds.poor, yellow, red), basicColor: red };
  }
}

function roeScale(roe: number): { interpolatedColor: string, basicColor: string } {
  if (roe > roeThresholds.good) {
    return { interpolatedColor: green, basicColor: green };
  } else if (roe > roeThresholds.excellent) {
    return { interpolatedColor: interpolateColor(roe, roeThresholds.excellent, roeThresholds.good, yellow, green), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(roe, 0, roeThresholds.excellent, red, yellow), basicColor: red };
  }
}

function roaScale(roa: number): { interpolatedColor: string, basicColor: string } {
  if (roa > roaThresholds.good) {
    return { interpolatedColor: green, basicColor: green };
  } else if (roa > roaThresholds.excellent) {
    return { interpolatedColor: interpolateColor(roa, roaThresholds.excellent, roaThresholds.good, yellow, green), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(roa, 0, roaThresholds.excellent, red, yellow), basicColor: red };
  }
}

function evToRevenueScale(evToRevenue: number): { interpolatedColor: string, basicColor: string } {
  if (evToRevenue < evToRevenueThresholds.excellent) {
    return { interpolatedColor: green, basicColor: green };
  } else if (evToRevenue < evToRevenueThresholds.good) {
    return { interpolatedColor: interpolateColor(evToRevenue, evToRevenueThresholds.excellent, evToRevenueThresholds.good, green, yellow), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(evToRevenue, evToRevenueThresholds.good, evToRevenueThresholds.poor, yellow, red), basicColor: red };
  }
}

function evToEbitdaScale(evToEbitda: number): { interpolatedColor: string, basicColor: string } {
  if (evToEbitda < evToEbitdaThresholds.excellent) {
    return { interpolatedColor: green, basicColor: green };
  } else if (evToEbitda < evToEbitdaThresholds.good) {
    return { interpolatedColor: interpolateColor(evToEbitda, evToEbitdaThresholds.excellent, evToEbitdaThresholds.good, green, yellow), basicColor: yellow };
  } else {
    return { interpolatedColor: interpolateColor(evToEbitda, evToEbitdaThresholds.good, evToEbitdaThresholds.poor, yellow, red), basicColor: red };
  }
}

export {
  peScale,
  pegScale,
  priceToSalesScale,
  priceToBookScale,
  dividendYieldScale,
  payoutRatioScale,
  debtToEquityScale,
  currentRatioScale,
  betaScale,
  roeScale,
  roaScale,
  evToRevenueScale,
  evToEbitdaScale,
};
