import os
from telebot import types
from dotenv import main

main.load_dotenv()
WEB_APP_URL = os.getenv('WEB_APP_URL')


# Start functionality
def handle_start(message, bot):
    bot.send_chat_action(message.chat.id, action='typing')
    markup = types.InlineKeyboardMarkup()
    button1 = types.InlineKeyboardButton(text="🚀 Launch App", web_app=types.WebAppInfo(url=f"{WEB_APP_URL}/"))
    button2 = types.InlineKeyboardButton(text="ℹ About", callback_data="about")
    markup.add(button1)
    markup.add(button2)
    first_name = message.chat.first_name
    response = [f"👋 Welcome to the ET Forex Bot *{first_name}!* 👋 \n\n", "Click on the launch button to get started.\n\n"]
    bot.send_message(message.chat.id, "".join(response), parse_mode='Markdown', reply_markup=markup)