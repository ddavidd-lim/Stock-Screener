# Stock-Screener
This is a personal stock screener designed to highlight stocks based on customizable valuation metrics. It fetches live market data using yFinance and presents the data in a way to make understanding stock fundamentals easier.

## Features

- **Real-time data**: Uses a web scraper backed by yFinance to keep stock information up to date.
- **Valuation filters**: Screen stocks based on fundamental metrics with simple, high level descriptions.
- **Interactive graphs**: View historical stock data through dynamic charts.
- **Custom legend system**: Color-coded and labeled legends for each metric to make data interpretation quick and clear for beginners.
- **Watchlists**: Managing custom groups of companies for easy comparison within watchlists
- **Sessions**: Results in watchlists are automatically saved and loaded from the browser.
- **Import/Export**: Download your watchlists as JSON and load your data into other devices.

## Deployment
Frontend is deployed using Vercel at https://stock-screener-pearl.vercel.app. Backend is hosted on Amazon EC2.


## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/) (v3.10 or higher)

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


## Future Improvements:
- [x] Adding/Removing Watchlists
- [x] Price Graphs
- [x] Import/Export functionality
- [ ] More configuration for default views
- [ ] More metrics
- [ ] Top Movers Highlight
  - [ ] Finnhub to get news