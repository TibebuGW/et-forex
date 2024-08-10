"use client";
import React, { useState, useEffect } from "react";
import { ETFlag, USFlag } from "@/public/assets/flags";
import currencies from "@/constants/Currencies";
import banks, { type IBank } from "@/constants/Banks";
import SelectCurrency from "./SelectCurrency";
import { BankRates } from "@/types/currency_types";
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";
import { GoArrowSwitch } from "react-icons/go";
import SelectBank from "./SelectBank";
import SelectType from "./SelectType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  info: BankRates[];
}

const BankCurrencyBox: React.FC<IProps> = ({ info }) => {
  const [type, setType] = useState("sell");
  const [selectedBank, setSelectedBank] = useState<IBank | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [currentRate, setCurrentRate] = useState<string>("0");
  const [filteredBanks, setFilteredBanks] = useState<IBank[]>([]);
  const [baseCurrencyValue, setBaseCurrencyValue] = useState("1");
  const [quoteCurrencyValue, setQuoteCurrencyValue] = useState("-");
  const [selectionChanged] = useHapticFeedback();

  const updateBankList = () => {
    const currentCurrencyBanks = info.find((bank) => bank.currency === selectedCurrency);
    if (currentCurrencyBanks) {
      return banks.filter((bank) => currentCurrencyBanks.banks.some((b) => b.name === bank.name));
    }
    return [];
  };

  const getBankRate = (curCurrency: string, curBank: string) => {
    const bank = info.find((bank) => bank.currency === curCurrency);
    if (type === "buy") {
      return bank?.banks.find((b) => b.name === curBank)?.buy.toString() || "0";
    }
    return bank?.banks.find((b) => b.name === curBank)?.sell.toString() || "0";
  };

  useEffect(() => {
    const allBanks = updateBankList();
    setFilteredBanks(allBanks);

    if (!allBanks.some((bank) => bank.name === selectedBank?.name)) {
      const firstBank = allBanks.length ? allBanks[0] : null;
      setSelectedBank(firstBank);
      const rate = getBankRate(selectedCurrency, firstBank?.name || "");
      setCurrentRate(rate);
      setQuoteCurrencyValue((parseFloat(baseCurrencyValue) * parseFloat(rate)).toFixed(4));
    } else {
      const rate = getBankRate(selectedCurrency, selectedBank?.name || "");
      setCurrentRate(rate);
      setQuoteCurrencyValue((parseFloat(baseCurrencyValue) * parseFloat(rate)).toFixed(4));
    }
  }, [selectedCurrency, info, type]);

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
    selectionChanged("heavy");
  };

  const handleBankChange = (value: string) => {
    const selected = banks.find((bank) => bank.name === value) || null;
    setSelectedBank(selected);
    const rate = getBankRate(selectedCurrency, value);
    setCurrentRate(rate);
    setQuoteCurrencyValue((parseFloat(baseCurrencyValue) * parseFloat(rate)).toFixed(4));
    selectionChanged("heavy");
  };

  const handleBaseCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectionChanged('heavy')
    setBaseCurrencyValue(e.target.value);
    setQuoteCurrencyValue((parseFloat(e.target.value) * parseFloat(currentRate)).toFixed(4));
  };

  const handleQuoteCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectionChanged('heavy')
    setQuoteCurrencyValue(e.target.value);
    setBaseCurrencyValue((parseFloat(e.target.value) / parseFloat(currentRate)).toFixed(4));
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    selectionChanged("heavy");
  };

  return (
    <div className="w-[100%] h-[450px] md:w-[600px] rounded-lg border-2 mx-auto shadow-sm shadow-gray-400 transition duration-300 p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="h-full w-full rounded-sm bg-white dark:bg-black p-2">
        <div className="w-[92%] flex items-center justify-between my-3 mx-auto">
          <p className="text-2xl font-bold">Bank Rate</p>
          <div className="flex items-center justify-center border-2 border-green-600 text-green-600 rounded-full py-3 px-5">
            <div className="blink flex justify-center items-center gap-3">
              <div className="bg-green-600 rounded-full p-2"></div>
              <span>LIVE</span>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-evenly items-center mx-auto my-2">
          <Select onValueChange={handleCurrencyChange} defaultValue="USD">
            <SelectTrigger>
              <SelectValue placeholder={<SelectCurrency name="USD" flag={USFlag} value="1" />} />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.name} value={currency.name}>
                  <SelectCurrency name={currency.name} flag={currency.flag} value="1" />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-3xl">
            <GoArrowSwitch className="w-[20px] h-[20px]" />
          </span>
          <SelectCurrency name="ETB" flag={ETFlag} value={currentRate} />
        </div>
        <div className="flex justify-center">
          {filteredBanks.length ? (
            <Select onValueChange={handleBankChange} value={selectedBank?.name || ""}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    <SelectBank name={filteredBanks[0].name} logo={filteredBanks[0].image} />
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {filteredBanks.map((bank) => (
                  <SelectItem key={bank.name} value={bank.name}>
                    <SelectBank name={bank.name} logo={bank.image} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p>Loading...</p>
          )}
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
        <div className="w-full flex justify-center items-center my-3">
          <Select onValueChange={handleTypeChange} value={type}>
            <SelectTrigger>
              <SelectValue placeholder={<SelectType type="sell" />} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">
                <SelectType type="buy" />
              </SelectItem>
              <SelectItem value="sell">
                <SelectType type="sell" />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BankCurrencyBox;
