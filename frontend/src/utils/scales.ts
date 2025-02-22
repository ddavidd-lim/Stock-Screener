/* eslint-disable @typescript-eslint/no-unused-vars */
function peScale(pe: number): string {
  if (pe < 15) {
    return "green";
  } else if (pe < 25) {
    return "yellow";
  } else {
    return "red";
  }
}

/**
 * PEG < 1 is considered excellent
 * PEG < 2 is considered good
 */
function pegScale(peg: number): string {
  if (peg < 1) {
    return "green";
  } else if (peg < 2) {
    return "yellow";
  } else {
    return "red";
  }
}

/**
 * P/S < 1 is considered excellent
 * P/S 1.0 - 2.0 is considered good
 * P/S > 2 is considered poor
 */
function priceToSalesScale(priceToSales: number): string {
  if (priceToSales < 1) {
    return "green";
  } else if (priceToSales < 2) {
    return "yellow";
  } else {
    return "red";
  }
}

/**
 * P/B < 1 is considered excellent
 * P/B 1.0 - 3.0 is considered good
 * P/B > 3.0 is considered poor
 */
function priceToBookScale(priceToBook: number): string {
  if (priceToBook < 1) {
    return "green";
  } else if (priceToBook < 2) {
    return "yellow";
  } else {
    return "red";
  }
}

function dividendYieldScale(dividendYield: number): string {
  if (dividendYield > 4) {
    return "green";
  } else if (dividendYield > 2) {
    return "yellow";
  } else {
    return "red";
  }
}

/**
 * Lower payout ratio is better
 * Payout ratio < 50% is considered excellent
 * Payout ratio 50% - 60% is considered good
 * Payout ratio 60% - 70% is considered ok
 * Beware of high payout ratios, as they may not be sustainable
 *
 */
function payoutRatioScale(payoutRatio: number): string {
  if (payoutRatio < 40) {
    return "green";
  } else if (payoutRatio < 60) {
    return "yellow";
  } else {
    return "red";
  }
}
 
/**
 * Lower debt to equity is better
 * Debt to equity <= 1 is considered excellent: no debt
 * Debt to equity 1 - 2 is considered good
 * Debt to equity > 2 is considered poor/risky
 */
function debtToEquityScale(debtToEquity: number): string {
  if (debtToEquity <= 1) {
    return "green";
  } else if (debtToEquity < 2) {
    return "yellow";
  } else {
    return "red";
  }
}

function currentRatioScale(currentRatio: number): string {
  if (currentRatio > 2) {
    return "green";
  } else if (currentRatio > 1) {
    return "yellow";
  } else {
    return "red";
  }
}

function betaScale(beta: number): string {
  if (beta < 1) {
    return "green";
  } else if (beta < 2) {
    return "yellow";
  } else {
    return "red";
  }
}

/**
 * Higher ROE is better
 * ROE > 20% is considered excellent
 * ROE 10% - 20% is considered good
 * ROE < 10% is considered poor
 */
function roeScale(roe: number): string {
  if (roe > 20) {
    return "green";
  } else if (roe > 10) {
    return "yellow";
  } else {
    return "red";
  }
}

/**
 * Higher ROA is better
 * ROA > 10% is considered excellent
 * ROA 5% - 10% is considered good
 * ROA < 5% is considered poor
 */
function roaScale(roa: number): string {
  if (roa > 10) {
    return "green";
  } else if (roa > 5) {
    return "yellow";
  } else {
    return "red";
  }
}

/**
 * Lower EV/Revenue is better
 * EV/Revenue < 1 is considered excellent
 * EV/Revenue 1.0 - 3.0 is considered good
 */
function evToRevenueScale(evToRevenue: number) {
  if (evToRevenue < 1) {
    return "green";
  } else if (evToRevenue < 3) {
    return "yellow";
  } else {
    return "red";
  }
}

/**
 * Lower EV/EBITDA is better
 * EV/EBITDA < 8.0 is considered excellent
 * EV/EBITDA < 10 is considered good
 */
function evToEbitdaScale(evToEbitda: number) {
  if (evToEbitda < 10) {
    return "green";
  } else if (evToEbitda < 20) {
    return "yellow";
  } else {
    return "red";
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
};
