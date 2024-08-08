import os
import logging
from flask import Flask, request
from dotenv import load_dotenv
import telebot
import logging
import threading
import requests
from command_handlers.start_handler import handle_start
from command_handlers.about_handler import handle_about

load_dotenv()
TOKEN = os.getenv('MAIN_TOKEN')
BASE_URL = os.getenv('BASE_URL')
WEBHOOK_BASE_URL = os.getenv('WEBHOOK_BASE_URL')
WEB_APP_URL = os.getenv('WEB_APP_URL')
ENV = os.getenv('ENV')
new_user_info = {
    'first_name': '',
    'last_name': '',
    'phone_number': '',
    'email': None,
    'telegram_id': '',
    'role_name': 'user'
}
app = Flask(__name__)
bot = telebot.TeleBot(TOKEN)

# if os.getenv('ENV') == "development":
logger = telebot.logger
telebot.logger.setLevel(logging.DEBUG)

@app.route('/' + TOKEN, methods=['POST'])
def getMessage():
    bot.process_new_updates([telebot.types.Update.de_json(request.stream.read().decode("utf-8"))])
    return "!", 200

@app.route("/")
def webhook():
    bot.remove_webhook()
    bot.set_webhook(url=WEBHOOK_BASE_URL + TOKEN)
    return "!", 200

print(f"Bot Started")
webhook()

@bot.message_handler(commands=['start'])
def start(message):
    handle_start(message, bot)

@bot.message_handler(commands=['about'])
def start(message):
    handle_about(message, bot)

@bot.callback_query_handler(func=lambda call: call.data.startswith("about"))
def handle_info_button(call):
    handle_about(call.message, bot)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv('WEBHOOK_PORT', 88)), debug=ENV == "production")

def keep_alive():
    while True:
        try:
            requests.get(WEBHOOK_BASE_URL + TOKEN)
            print("Sent keep-alive request.")
        except Exception as e:
            print("Error sending keep-alive request:", e)
        threading.Timer(1500, keep_alive).start()

if ENV == "production":
    keep_alive()