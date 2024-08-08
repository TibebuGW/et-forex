import os
from telebot import types
from dotenv import main

main.load_dotenv()
WEB_APP_URL = os.getenv('WEB_APP_URL')

# About functionality
def handle_about(message, bot):
    bot.send_chat_action(message.chat.id, action="typing")
    markup = types.InlineKeyboardMarkup()
    button1 = types.InlineKeyboardButton(text="🚀 Launch App", web_app=types.WebAppInfo(url=f"{WEB_APP_URL}/"))
    markup.add(button1)
    first_name = message.chat.first_name
    response = [
        f"👋 Welcome to the ET Forex Bot, *{first_name}*! 👋\n\n",
        "❓ Have you found yourself in need of a reliable source to keep track of the current Ethiopian foreign exchange trends? \n\n"
        "💱 The ET Forex bot is the tool you *need* for staying updated with the latest *bank* and *black market* foreign exchange rates and currency conversions.\n\n",
        "🌍 With ET Forex, you can easily check the exchange rates for various currencies and banks and convert between them effortlessly.\n\n",
        "📈 ET Forex provides real-time data and accurate exchange rates, ensuring that you have the most up-to-date information at your fingertips.\n\n",
        "🚀 Click on the Launch App button to get started.\n\n",
    ]
    bot.send_message(message.chat.id, "".join(response), parse_mode="Markdown", reply_markup=markup)
