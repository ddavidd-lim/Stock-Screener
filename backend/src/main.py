import json
import yfinance as yf
import pprint
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request


app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# @app.get("/stock")
# async def ticker(request: Request):
#     print("/stock")
#     ticker_symbol = request.query_params.get("ticker", "NVDA")
#     print(ticker_symbol)
#     data = yf.Ticker(ticker_symbol)

#     info = data.info

#     return info


@app.get("/stock")
async def ticker(request: Request):
    print("/stock")
    tickers_param = request.query_params.get("tickers", "NVDA")
    ticker_symbols = [t.strip().upper() for t in tickers_param.split(",") if t.strip()]
    print("tickers_param", tickers_param)
    print("ticker_symbols", ticker_symbols)
    if not ticker_symbols:
        return {"error": "No ticker symbols provided."}
    if len(ticker_symbols) > 50:
        return {"error": "Maximum of 50 ticker symbols allowed."}

    tickers_data = []
    data = yf.Tickers(ticker_symbols)
    print("data", data)
    for ticker in data:
        try:
            pass
            # Simulate fetching data
            # tickers_data.append(
            #     {
            #         "symbol": symbol,
            #         "longName": "Rate Limited",
            #         "trailingPE": 0,
            #         "trailingPEGRatio": 0,
            #         "priceToSalesTrailing12Months": 0,
            #         "priceToBook": 0,
            #         "trailingEps": 0,
            #         "trailingAnnualDividendYield": 0,
            #         "payoutRatio": 0,
            #         "returnOnAssets": 0,
            #         "returnOnEquity": 0,
            #         "profitMargins": 0,
            #         "debtToEquity": 0,
            #         "currentRatio": 0,
            #         "beta": 0,
            #         "52WeekChange": 0,
            #         "fiftyTwoWeekHigh": 0,
            #         "fiftyTwoWeekLow": 0,
            #         "currentPrice": 0,
            #     }
            # )
        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")
            return {"error": f"Failed to fetch data for {symbol}: {str(e)}"}

    return tickers_data


if __name__ == "__main__":
    print("hello world")

    data = yf.Ticker("BMBL")

    info = data.info
    pprint.pprint(info)
    trailing_pe = info["trailingPE"]

    # < 1.0 means good price relative to earnings and growth
    peg_ratio = info["trailingPegRatio"]  # ideal: < 1.0, good: 1.0 - 2.0, >3.0 is high
    price_to_sales = info[
        "priceToSalesTrailing12Months"
    ]  # lower is better, good for tech if they havent made earnings yet
    price_to_book = info["priceToBook"]  # EXCELLENT: <1.0, GOOD: 1.0 - 3.0

    earnings_per_share = info["trailingEps"]  # 5.92 pretty high

    # Dividend

    # dividend per share
    dividend_yield = info["trailingAnnualDividendYield"]

    # percentage of net earnings paid as dividends
    payout_ratio = info["payoutRatio"]  # !! ideal: <70%

    #
    return_on_assets = info["returnOnAssets"]  # higher number is better

    return_on_equity = info["returnOnEquity"]  # higher number is better

    profit_margin = info["profitMargins"]  # dependent on companies - 22% decent - coke

    # Debt
    debt_to_equity = info["debtToEquity"]  # lower number is better: <100% ideal

    # ability to pay off current
    # lower than 1 means trouble paying current debts
    # hhigher than 1 means more assets than liabilities
    current_ratio = info["currentRatio"]  # higher number is better: >1.0

    # how well a company matches the market. 1.0 matches market.
    beta = info["beta"]  # volatility - higher number is more volatile

    fifty_two_week_change = info["52WeekChange"]
    fifty_two_week_high = info["fiftyTwoWeekHigh"]
    fifty_two_week_low = info["fiftyTwoWeekLow"]
    stock_price = info["currentPrice"]
