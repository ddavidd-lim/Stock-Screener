/* eslint-disable @typescript-eslint/no-unused-vars */

const green = "#00FF00";
const yellow = "#FFFF00";
const red = "#FF0000";

const greenScale = [green, "#55FF00", "#AAFF00"];
const yellowScale = [yellow, "#FFDD00", "#FFBB00"];
const redScale = [red, "#FF3333", "#CC0000"];

const colorScales = [greenScale, yellowScale, redScale];

function getColorFromScale(
  value: number,
  min: number,
  max: number,
  colorScale: Array<string>
): string {
  const index = Math.max(
    0,
    Math.floor((value - min) / (max - min))
    // 28 - 25 / 35 - 25 = 3 / 10 = 0.3
  );
  return colorScale[index];
}

// Threshold variables
export const peThresholds = { excellent: 15, good: 25, poor: 35 };
export const pegThresholds = { excellent: 1, good: 2, poor: 25 };
export const priceToSalesThresholds = { excellent: 1, good: 2, poor: 25 };
export const priceToBookThresholds = { excellent: 1, good: 3, poor: 25 };
export const dividendYieldThresholds = { excellent: 2, good: 4 };
export const payoutRatioThresholds = { excellent: 0.5, good: 0.6, poor: 0.8 };
export const debtToEquityThresholds = { excellent: 1, good: 2, poor: 3 };
export const currentRatioThresholds = { excellent: 1, good: 2 };
export const betaThresholds = { excellent: 1, good: 2, poor: 3 };
export const roeThresholds = { excellent: 10, good: 20 };
export const roaThresholds = { excellent: 5, good: 10 };
export const evToRevenueThresholds = { excellent: 1, good: 3, poor: 5 };
export const evToEbitdaThresholds = { excellent: 8, good: 10, poor: 12 };

function peScale(pe: number): { interpolatedColor: string; basicColor: string } {
  const thresholds = [peThresholds.excellent, peThresholds.good, peThresholds.poor];
  const colors = [green, yellow, red];

  for (let i = 0; i < thresholds.length; i++) {
    if (pe < thresholds[i]) {
      return {
        interpolatedColor:
          i === 0
            ? colors[i]
            : getColorFromScale(pe, thresholds[i - 1], thresholds[i], colorScales[i]),
        basicColor: colors[i],
      };
    }
  }

  return { interpolatedColor: colors[colors.length - 1], basicColor: colors[colors.length - 1] };
}

function pegScale(peg: number): { interpolatedColor: string; basicColor: string } {
  const thresholds = [pegThresholds.excellent, pegThresholds.good, pegThresholds.poor];
  const colors = [green, yellow, red];

  for (let i = 0; i < thresholds.length; i++) {
    if (peg < thresholds[i]) {
      return {
        interpolatedColor:
          i === 0
            ? colors[i]
            : getColorFromScale(peg, thresholds[i - 1], thresholds[i], colorScales[i]),
        basicColor: colors[i],
      };
    }
  }

  return { interpolatedColor: colors[colors.length - 1], basicColor: colors[colors.length - 1] };
}

function priceToSalesScale(priceToSales: number): {
  interpolatedColor: string;
  basicColor: string;
} {
  const thresholds = [
    priceToSalesThresholds.excellent,
    priceToSalesThresholds.good,
    priceToSalesThresholds.poor,
  ];
  const colors = [green, yellow, red];

  for (let i = 0; i < thresholds.length; i++) {
    if (priceToSales < thresholds[i]) {
      return {
        interpolatedColor:
          i === 0
            ? colors[i]
            : getColorFromScale(priceToSales, thresholds[i - 1], thresholds[i], colorScales[i]),
        basicColor: colors[i],
      };
    }
  }

  return { interpolatedColor: colors[colors.length - 1], basicColor: colors[colors.length - 1] };
}

function priceToBookScale(priceToBook: number): { interpolatedColor: string; basicColor: string } {
  const thresholds = [
    priceToBookThresholds.excellent,
    priceToBookThresholds.good,
    priceToBookThresholds.poor,
  ];
  const colors = [green, yellow, red];

  for (let i = 0; i < thresholds.length; i++) {
    if (priceToBook < thresholds[i]) {
      return {
        interpolatedColor:
          i === 0
            ? colors[i]
            : getColorFromScale(priceToBook, thresholds[i - 1], thresholds[i], colorScales[i]),
        basicColor: colors[i],
      };
    }
  }

  return { interpolatedColor: colors[colors.length - 1], basicColor: colors[colors.length - 1] };
}

function dividendYieldScale(dividendYield: number): {
  interpolatedColor: string;
  basicColor: string;
} {
  const thresholds = [dividendYieldThresholds.excellent, dividendYieldThresholds.good];
  const colors = [red, yellow, green];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (dividendYield > thresholds[i]) {
      return {
        interpolatedColor:
          i === thresholds.length - 1
            ? colors[i + 1]
            : getColorFromScale(dividendYield, thresholds[i], thresholds[i + 1], colorScales[i]),
        basicColor: colors[i + 1],
      };
    }
  }

  return { interpolatedColor: colors[0], basicColor: colors[0] };
}

function payoutRatioScale(payoutRatio: number): { interpolatedColor: string; basicColor: string } {
  const thresholds = [
    payoutRatioThresholds.excellent,
    payoutRatioThresholds.good,
    payoutRatioThresholds.poor,
  ];
  const colors = [green, yellow, red];

  for (let i = 0; i < thresholds.length; i++) {
    if (payoutRatio < thresholds[i]) {
      return {
        interpolatedColor:
          i === 0
            ? colors[i]
            : getColorFromScale(payoutRatio, thresholds[i - 1], thresholds[i], colorScales[i]),
        basicColor: colors[i],
      };
    }
  }

  return { interpolatedColor: colors[colors.length - 1], basicColor: colors[colors.length - 1] };
}

function debtToEquityScale(debtToEquity: number): {
  interpolatedColor: string;
  basicColor: string;
} {
  const thresholds = [
    debtToEquityThresholds.excellent,
    debtToEquityThresholds.good,
    debtToEquityThresholds.poor,
  ];
  const colors = [green, yellow, red];

  for (let i = 0; i < thresholds.length; i++) {
    if (debtToEquity < thresholds[i]) {
      return {
        interpolatedColor:
          i === 0
            ? colors[i]
            : getColorFromScale(debtToEquity, thresholds[i - 1], thresholds[i], colorScales[i]),
        basicColor: colors[i],
      };
    }
  }

  return { interpolatedColor: colors[colors.length - 1], basicColor: colors[colors.length - 1] };
}

function currentRatioScale(currentRatio: number): {
  interpolatedColor: string;
  basicColor: string;
} {
  const thresholds = [currentRatioThresholds.excellent, currentRatioThresholds.good];
  const colors = [red, yellow, green];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (currentRatio > thresholds[i]) {
      return {
        interpolatedColor:
          i === thresholds.length - 1
            ? colors[i + 1]
            : getColorFromScale(currentRatio, thresholds[i], thresholds[i + 1], colorScales[i]),
        basicColor: colors[i + 1],
      };
    }
  }

  return { interpolatedColor: colors[0], basicColor: colors[0] };
}

function betaScale(beta: number): { interpolatedColor: string; basicColor: string } {
  const thresholds = [betaThresholds.excellent, betaThresholds.good, betaThresholds.poor];
  const colors = [green, yellow, red];

  for (let i = 0; i < thresholds.length; i++) {
    if (beta < thresholds[i]) {
      return {
        interpolatedColor:
          i === 0
            ? colors[i]
            : getColorFromScale(beta, thresholds[i - 1], thresholds[i], colorScales[i]),
        basicColor: colors[i],
      };
    }
  }

  return { interpolatedColor: colors[colors.length - 1], basicColor: colors[colors.length - 1] };
}

function roeScale(roe: number): { interpolatedColor: string; basicColor: string } {
  const thresholds = [roeThresholds.excellent, roeThresholds.good];
  const colors = [red, yellow, green];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (roe > thresholds[i]) {
      return {
        interpolatedColor:
          i === thresholds.length - 1
            ? colors[i + 1]
            : getColorFromScale(roe, thresholds[i], thresholds[i + 1], colorScales[i]),
        basicColor: colors[i + 1],
      };
    }
  }

  return { interpolatedColor: colors[0], basicColor: colors[0] };
}

function roaScale(roa: number): { interpolatedColor: string; basicColor: string } {
  const thresholds = [roaThresholds.excellent, roaThresholds.good];
  const colors = [red, yellow, green];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (roa > thresholds[i]) {
      return {
        interpolatedColor:
          i === thresholds.length - 1
            ? colors[i + 1]
            : getColorFromScale(roa, thresholds[i], thresholds[i + 1], colorScales[i]),
        basicColor: colors[i + 1],
      };
    }
  }

  return { interpolatedColor: colors[0], basicColor: colors[0] };
}

function evToRevenueScale(evToRevenue: number): { interpolatedColor: string; basicColor: string } {
  const thresholds = [
    evToRevenueThresholds.excellent,
    evToRevenueThresholds.good,
    evToRevenueThresholds.poor,
  ];
  const colors = [green, yellow, red];

  for (let i = 0; i < thresholds.length; i++) {
    if (evToRevenue < thresholds[i]) {
      return {
        interpolatedColor:
          i === 0
            ? colors[i]
            : getColorFromScale(evToRevenue, thresholds[i - 1], thresholds[i], colorScales[i]),
        basicColor: colors[i],
      };
    }
  }

  return { interpolatedColor: colors[colors.length - 1], basicColor: colors[colors.length - 1] };
}

function evToEbitdaScale(evToEbitda: number): { interpolatedColor: string; basicColor: string } {
  const thresholds = [
    evToEbitdaThresholds.excellent,
    evToEbitdaThresholds.good,
    evToEbitdaThresholds.poor,
  ];
  const colors = [green, yellow, red];

  for (let i = 0; i < thresholds.length; i++) {
    if (evToEbitda < thresholds[i]) {
      return {
        interpolatedColor:
          i === 0
            ? colors[i]
            : getColorFromScale(evToEbitda, thresholds[i - 1], thresholds[i], colorScales[i]),
        basicColor: colors[i],
      };
    }
  }

  return { interpolatedColor: colors[colors.length - 1], basicColor: colors[colors.length - 1] };
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
