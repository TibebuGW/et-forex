from fastapi import FastAPI
from dotenv import load_dotenv
import requests
import os

load_dotenv()

BANK_RATE_BASE_URL = os.getenv("BANK_RATE_BASE_URL")
BLACK_MARKET_RATE_BASE_URL = os.getenv("BLACK_MARKET_RATE_BASE_URL")
currencies = ["USD", "EUR", "GBP", "CHF", "KWD", "AUD", "JPY", "CAD"]

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/latest")
async def get_all_currency_info():
    bank_rate_response = requests.get(BANK_RATE_BASE_URL)
    black_market_response = requests.get(BLACK_MARKET_RATE_BASE_URL)
    with open("bank_rate_response.json", "w") as f:
        f.write(bank_rate_response.text)
    with open("black_market_response.json", "w") as f:
        f.write(black_market_response.text)
    response = {"bank_rates": [], "black_market_rates": []}
    if bank_rate_response.status_code == 200:
        bank_rate_data = bank_rate_response.json()
        for currency_info in bank_rate_data:
            if currency_info["currency_code"] in currencies:
                current_info = {
                    "currency": currency_info["currency_code"],
                    "banks": []
                }
                for rate in currency_info["rates"]:
                    flag = False
                    for bank_info in current_info["banks"]:
                        if bank_info["name"] == rate["bank_name"]:
                            flag = True
                            break
                    
                    if flag:
                        continue
                    current_info["banks"].append({
                        "name": rate["bank_name"],
                        "buy": rate["buying_rate"],
                        "sell": rate["selling_rate"],
                        "time": rate["timestamp"],
                        "buy_diff": rate["buyingRateChange"],
                        "sell_diff": rate["sellingRateChange"]
                    })
                response["bank_rates"].append(current_info)
    
    if black_market_response.status_code == 200:
        black_market_data = black_market_response.json()
        black_market_response = {}
        for currency in black_market_data["allLastprice"]:
            if currency in currencies:
                black_market_response[currency] = black_market_data["allLastprice"][currency]
        
        response["black_market_rates"] = black_market_response

    return response