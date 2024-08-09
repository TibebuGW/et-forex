"use client";
import React, { useState, useEffect } from "react";
import { ETFlag, USFlag } from "@/public/assets/flags";
import { Black } from "@/public/assets/bank-images";
import currencies, { type ICurrency } from "@/constants/Currencies";
import { GoArrowSwitch } from "react-icons/go";
import SelectCurrency from "./SelectCurrency";
import { BlackMarketRates } from "@/types/currency_types";
import SelectBank from "./SelectBank";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  info: BlackMarketRates;
}

const BlackCurrencyBox: React.FC<IProps> = ({ info }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [filteredCurrency, setFilteredCurrency] = useState<ICurrency[]>([]);
  const [baseCurrencyValue, setBaseCurrencyValue] = useState("1");
  const [quoteCurrencyValue, setQuoteCurrencyValue] = useState("-");
  const currencyMap = (type: string) => {
    switch (type) {
      case "USD":
        return info.USD.toString();
      case "EUR":
        return info.EUR.toString();
      case "CHF":
        return info.CHF.toString();
      case "CAD":
        return info.CAD.toString();
      case "AUD":
        return info.AUD.toString();
      case "GBP":
        return info.GBP.toString();
      case "KWD":
        return info.KWD.toString();
      default:
        return "0";
    }
  };
  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };
  useEffect(() => {
    setFilteredCurrency(
      currencies.filter((currency) => Object.prototype.hasOwnProperty.call(info, currency.name))
    );
    setQuoteCurrencyValue(
      (parseFloat(baseCurrencyValue) * parseFloat(currencyMap(selectedCurrency))).toFixed(4)
    );
  }, [info]);
  const handleBaseCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseCurrencyValue(e.target.value);
    setQuoteCurrencyValue(
      (parseFloat(e.target.value) * parseFloat(currencyMap(selectedCurrency))).toFixed(4)
    );
  };

  const handleQuoteCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuoteCurrencyValue(e.target.value);
    setBaseCurrencyValue(
      (parseFloat(e.target.value) / parseFloat(currencyMap(selectedCurrency))).toFixed(4)
    );
  };
  return (
    <div className="w-[100%] h-[450px] md:w-[600px] rounded-lg border-2 mx-auto shadow-sm shadow-gray-400 transition duration-300 p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="h-full w-full rounded-sm bg-white dark:bg-black p-2">
        <div className="w-[90%] flex items-center justify-between my-3 mx-auto">
          <p className="text-2xl font-bold">Black Market Rate</p>
          <div className="flex items-center justify-center border-2 border-green-600 text-green-600 rounded-full py-3 px-5">
            <div className="blink flex justify-center items-center gap-3">
              <div className="bg-green-600 rounded-full p-2"></div>
              <span>LIVE</span>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-evenly items-center mx-auto my-2 gap-2">
          <Select onValueChange={handleCurrencyChange}>
            <SelectTrigger className="">
              <SelectValue placeholder={<SelectCurrency name="USD" flag={USFlag} value="1" />} />
            </SelectTrigger>
            <SelectContent>
              {filteredCurrency.map((currency) => (
                <SelectItem key={currency.name} value={currency.name}>
                  <SelectCurrency name={currency.name} flag={currency.flag} value="1" />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-3xl">
            <GoArrowSwitch className="w-[20px] h-[20px]" />
          </span>
          <SelectCurrency name="ETB" flag={ETFlag} value={currencyMap(selectedCurrency)} />
        </div>
        <div className="py-2">
          <SelectBank name="Black Market" logo={Black} />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <div className="flex justify-center items-center w-[90%]">
            <div className="w-full relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 font-bold">
                {selectedCurrency}
              </span>
              <input
                type="text"
                className="w-full pl-16 border-2 border-gray-300 h-14 rounded-lg px-2"
                placeholder="Enter Amount"
                value={!isNaN(parseFloat(baseCurrencyValue)) ? baseCurrencyValue : "1"}
                onChange={handleBaseCurrencyChange}
              />
            </div>
          </div>
          <div className="flex justify-center items-center w-[90%]">
            <div className="w-full relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 font-bold">
                ETB
              </span>
              <input
                type="text"
                className="w-full pl-16 border-2 border-gray-300 h-14 rounded-lg px-2"
                placeholder="Enter Amount"
                value={!isNaN(parseFloat(quoteCurrencyValue)) ? quoteCurrencyValue : ""}
                onChange={handleQuoteCurrencyChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackCurrencyBox;
