import { Bank, BankRates, BlackMarketRates } from "@/types/currency_types";
const defaultBank: Bank = {
    name: "",
    buy: 0,
    sell: 0,
    time: "",
    buy_diff: "",
    sell_diff: "",
};

export const defaultBankRates: BankRates[] = [{
    currency: "",
    banks: [defaultBank],
}, {
    currency: "",
    banks: [defaultBank],
} ];

export const defaultBlackMarketRates: BlackMarketRates = {
    USD: 0,
    EUR: 0,
    CHF: 0,
    CAD: 0,
    AUD: 0,
    GBP: 0,
    KWD: 0,
};