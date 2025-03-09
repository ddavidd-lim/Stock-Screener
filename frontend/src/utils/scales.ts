import { alpha } from '@mui/material/styles';

/* eslint-disable @typescript-eslint/no-unused-vars */

const green = "#00FF00";
const yellow = "#FFFF00";
const red = "#FF0000";

function interpolateColor(value: number, min: number, max: number, color: string): string {
  const ratio = Math.max(0.5, Math.min(1, (value - min) / (max - min)));
  return alpha(color, ratio);
}

function peScale(pe: number): string {
  if (pe < 15) {
    return green;
  } else if (pe < 25) {
    return interpolateColor(pe, 15, 25, yellow);
  } else {
    return interpolateColor(pe, 25, 35, red);
  }
}

function pegScale(peg: number): string {
  if (peg < 1) {
    return green;
  } else if (peg < 2) {
    return interpolateColor(peg, 1, 2, yellow);
  } else {
    return interpolateColor(peg, 2, 3, red);
  }
}

function priceToSalesScale(priceToSales: number): string {
  if (priceToSales < 1) {
    return green;
  } else if (priceToSales < 2) {
    return interpolateColor(priceToSales, 1, 2, yellow);
  } else {
    return interpolateColor(priceToSales, 2, 3, red);
  }
}

function priceToBookScale(priceToBook: number): string {
  if (priceToBook < 1) {
    return green;
  } else if (priceToBook < 2) {
    return interpolateColor(priceToBook, 1, 2, yellow);
  } else {
    return interpolateColor(priceToBook, 2, 3, red);
  }
}

function dividendYieldScale(dividendYield: number): string {
  if (dividendYield > 4) {
    return green;
  } else if (dividendYield > 2) {
    console.log(interpolateColor(dividendYield, 2, 4, yellow));
    return interpolateColor(dividendYield, 2, 4, yellow);
  } else {
    return interpolateColor(dividendYield, 0, 2, red);
  }
}

function payoutRatioScale(payoutRatio: number): string {
  if (payoutRatio < 40) {
    return green;
  } else if (payoutRatio < 60) {
    return interpolateColor(payoutRatio, 40, 60, yellow);
  } else {
    return interpolateColor(payoutRatio, 60, 80, red);
  }
}

function debtToEquityScale(debtToEquity: number): string {
  if (debtToEquity <= 1) {
    return green;
  } else if (debtToEquity < 2) {
    return interpolateColor(debtToEquity, 1, 2, yellow);
  } else {
    return interpolateColor(debtToEquity, 2, 3, red);
  }
}

function currentRatioScale(currentRatio: number): string {
  if (currentRatio > 2) {
    return green;
  } else if (currentRatio > 1) {
    return interpolateColor(currentRatio, 1, 2, yellow);
  } else {
    return interpolateColor(currentRatio, 0, 1, red,);
  }
}

function betaScale(beta: number): string {
  if (beta < 1) {
    return green;
  } else if (beta < 2) {
    return interpolateColor(beta, 1, 2, yellow);
  } else {
    return interpolateColor(beta, 2, 3, red);
  }
}

function roeScale(roe: number): string {
  if (roe > 20) {
    return green;
  } else if (roe > 10) {
    return interpolateColor(roe, 10, 20, yellow);
  } else {
    return interpolateColor(roe, 0, 10, red);
  }
}

function roaScale(roa: number): string {
  if (roa > 10) {
    return green;
  } else if (roa > 5) {
    return interpolateColor(roa, 5, 10, yellow);
  } else {
    return interpolateColor(roa, 0, 5, red);
  }
}

function evToRevenueScale(evToRevenue: number): string {
  if (evToRevenue < 1) {
    return green;
  } else if (evToRevenue < 3) {
    return interpolateColor(evToRevenue, 1, 3, yellow);
  } else {
    return interpolateColor(evToRevenue, 3, 5, red);
  }
}

function evToEbitdaScale(evToEbitda: number): string {
  if (evToEbitda < 8) {
    return green;
  } else if (evToEbitda < 10) {
    return interpolateColor(evToEbitda, 8, 10, yellow);
  } else {
    return interpolateColor(evToEbitda, 10, 12, red);
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
