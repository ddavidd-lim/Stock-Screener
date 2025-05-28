
from Scraper import Scraper
import json

elements_to_scrape = {}

f = open("src/scrape.json")
data = f.read()
f.close()
elements_to_scrape = json.loads(data)
# print("Elements to scrape:", elements_to_scrape)

s = Scraper("AAPL", elements_to_scrape)
print(s.summary())