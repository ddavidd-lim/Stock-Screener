import requests
from bs4 import BeautifulSoup


class Scraper:

    def __init__(self, symbol, elements):
        url = f"https://finance.yahoo.com/quote/{symbol}/key-statistics/"

        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/113.0.0.0 Safari/537.36"
            )
        }

        r = requests.get(url, headers=headers)

        print("Requesting URL:", url)
        print("Status Code:", r.url, r.status_code)

        if r.url != url:  # redirect occurred
            raise requests.TooManyRedirects()

        r.raise_for_status()

        self.soup = BeautifulSoup(r.text, "html.parser")
        self.__summary = {}

        # Extract PE, PEG, P/S, P/B, EV/Revenue, and EV/EBITDA from table
        alt_table_rows = self.soup.select(".yf-kbx2lo.alt")
        pe = alt_table_rows[1].find_all("td")[1].get_text(strip=True)
        peg = alt_table_rows[2].find_all("td")[1].get_text(strip=True)
        pb = alt_table_rows[3].find_all("td")[1].get_text(strip=True)
        ev_ebitda = alt_table_rows[4].find_all("td")[1].get_text(strip=True)

        table_rows = self.soup.select("[data-testid='qsp-statistics'] .yf-kbx2lo")
        ps = table_rows[2].find_all("td")[1].get_text(strip=True)
        ev_revenue = table_rows[3].find_all("td")[1].get_text(strip=True)

        self.__summary["PE"] = pe
        self.__summary["PEG"] = peg
        self.__summary["P/S"] = ps
        self.__summary["P/B"] = pb
        self.__summary["EV/Revenue"] = ev_revenue
        self.__summary["EV/EBITDA"] = ev_ebitda
        
        # Find all card containers under Financial Highlights
        print("Extracting financial highlights...")
        cards = self.soup.select(
            '[data-testid="stats-highlight"] [data-testid="card-container"]'
        )
        for card in cards:
            h3 = card.select_one("header > div > h3")
            print("Card header:", h3.get_text(strip=True) if h3 else "No header found")
            if h3 and "Management Effectiveness" in h3.get_text():
                print("Found Management Effectiveness card")
                rows = card.select("table tr.row.yf-vaowmx")
                roa = rows[0].find_all("td")[1].get_text(strip=True)
                roe = rows[1].find_all("td")[1].get_text(strip=True)

                self.__summary["ROA"] = roa.replace("%", "")
                self.__summary["ROE"] = roe.replace("%", "")
            if h3 and "Balance Sheet" in h3.get_text():
                print("Found Balance Sheet card")
                rows = card.select("table tr.row.yf-vaowmx")
                debt_to_equity = rows[3].find_all("td")[1].get_text(strip=True)
                current_ratio = rows[4].find_all("td")[1].get_text(strip=True)

                self.__summary["Current Ratio"] = current_ratio
                self.__summary["Debt To Equity"] = debt_to_equity
            if h3 and "Stock Price History" in h3.get_text():
                print("Found Stock Price History card")
                rows = card.select("table tr.row.yf-vaowmx")
                beta = rows[0].find_all("td")[1].get_text(strip=True)

                self.__summary["Beta"] = beta
            if h3 and "Dividends & Splits" in h3.get_text():
                print("Found Dividends & Splits card")
                rows = card.select("table tr.row.yf-vaowmx")
                dividend_yield = rows[1].find_all("td")[1].get_text(strip=True)
                payout_ratio = rows[5].find_all("td")[1].get_text(strip=True)

                self.__summary["Dividend Yield"] = dividend_yield
                self.__summary["Payout Ratio"] = payout_ratio

    def summary(self):
        return self.__summary
