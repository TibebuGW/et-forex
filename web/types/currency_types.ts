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

export interface BlackMarketRates {
  [key: string]: number;
};

export type InfoType = {
  bank_rates: BankRates[];
  black_market_rates: BlackMarketRates;
};

export type BankType = {
  name: string;
  image: any;
};

export type BankListType = {
  bank: BankType;
  buyingPrice: string;
  sellingPrice: string;
};
