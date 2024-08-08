export type Bank = {
    name: string;
    buy: number;
    sell: number;
    time: string;
    buy_diff: string;
    sell_diff: string;
};

export type BankRates = {
    currency: string;
    banks: Bank[];
};

export type BlackMarketRates = {
    USD: number;
    EUR: number;
    CHF: number;
    CAD: number;
    AUD: number;
    GBP: number;
    KWD: number;
};