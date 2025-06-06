# Stock-Screener
My custom stock screener is designed to identify desirable valuation metrics for stock quotes. It retrieves data using a web scraper powered by yFinance, to maintain up-to-date market data.


## Quickstart
```bash
git clone https://github.com/ddavidd-lim/Stock-Screener.git
```
### Backend
To get started with the backend, follow these steps:

```bash
# Navigate to the backend directory
cd Stock-Screener/backend

# Create and initialize environment
python -m venv .venv
.venv/Scripts/activate

# Install the required dependencies
pip install -r requirements.txt

# Run the backend server
fastapi dev src/main.py
```

### Frontend 
To get started with the frontend, follow these steps:

```bash
# Navigate to the frontend directory
cd Stock-Screener/frontend

# Install the required dependencies
npm install

# Start the frontend server
npm run dev
```


## TODO:
- [x] Adding/Removing Watchlists
- [x] Fix refetch on local storage load
- [x] Modify endpoint to accept multiple tickers
- [x] Price Graphs
- [x] Loading indicators when switching tabs
- [ ] Import/Export functionality
- [x] Proper visuals on null/negative numbers
- [ ] Future price simulation
  - [ ] Input target % gain/loss per ticker
  - [ ] Auto Calculate potential profit/loss, total value
  - [ ] Slider for global change
- [ ] Dollar-Cost Averaging Simulator
- [ ] Top Movers Highlight
  - [ ] Finnhub to get news