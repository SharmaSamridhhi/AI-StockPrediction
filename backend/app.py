from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from yahooquery import search
import yfinance as yf

from model import predict_stock

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "StockAI PRO working fine 🚀"}

@app.get("/predict/{symbol}")
def predict(symbol: str):
    return predict_stock(symbol)

@app.get("/history")
def get_history(symbol: str, period: str = "1y", interval: str = "1d"):
    stock = yf.Ticker(symbol)
    data = stock.history(period=period, interval=interval)

    data.reset_index(inplace=True)
    data["Date"] = data["Date"].astype(str)

    return {"history": data.to_dict(orient="records")}

@app.get("/search_stock")
def search_stock(query: str = Query(..., description="Stock name or symbol to search")):
    try:
        # Query Yahoo Finance search API
        results = search(query)

        # Extract relevant fields
        quotes = results.get("quotes", [])
        stocks = []
        for item in quotes:
            stocks.append({
                "symbol": item.get("symbol"),
                "name": item.get("shortname") or item.get("longname"),
                "exchange": item.get("exchange"),
                "type": item.get("quoteType"),
                "logo": f"https://s.yimg.com/cv/apiv2/default/finance/{item.get('symbol')}.png"  # fallback guess
            })

        return {"count": len(stocks), "results": stocks[:10]}  # limit to top 10 results
    except Exception as e:
        return {"error": str(e)}