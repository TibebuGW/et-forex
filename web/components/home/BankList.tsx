import React, { useState, useEffect } from "react";
import { InfoType, BankListType } from "@/types/currency_types";
import SelectCurrency from "./SelectCurrency";
import banks from "@/constants/Banks";
import BankListTable from "./BankListTable";
import currencies from "@/constants/Currencies";
import { Black } from "@/public/assets/bank-images";
import { USFlag } from "@/public/assets/flags";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";

interface IProps {
  info: InfoType;
}

const BankList: React.FC<IProps> = ({ info }) => {
  const [data, setData] = useState<BankListType[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [selectionChanged] = useHapticFeedback()
  const updateBankList = () => {
    const currentCurrencyBanks = info.bank_rates.find((bank) => bank.currency === selectedCurrency);
    if (currentCurrencyBanks) {
      return banks.filter((bank) => currentCurrencyBanks.banks.some((b) => b.name === bank.name));
    }
    return [];
  };

  const updateData = (curCurrency: string) => {
    const allBanks = updateBankList();
    const BankList: BankListType[] = allBanks.map((bank) => {
      const bankRate = info.bank_rates
        .find((rate) => rate.currency === curCurrency)
        ?.banks.find((b) => b.name === bank.name);
      return {
        bank: { name: bank.name, image: bank.image },
        buyingPrice: bankRate?.buy?.toString() || "0",
        sellingPrice: bankRate?.sell?.toString() || "0",
      };
    });
    const blackRate = info.black_market_rates[curCurrency];
    if (blackRate) {
      BankList.push({
        bank: { name: "Black Market", image: Black },
        buyingPrice: blackRate.toString(),
        sellingPrice: blackRate.toString(),
      });
    }
    BankList.sort((a, b) => parseFloat(b.sellingPrice) - parseFloat(a.sellingPrice));
    setData(BankList);
  };

  useEffect(() => {
    updateData(selectedCurrency);
  }, [info]);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    updateData(currency);
    selectionChanged('heavy')
  };

  return (
    <div>
      <div className="flex justify-around items-center">
        <p className="text-2xl font-bold text-center">Compare Rates</p>
        <Select onValueChange={handleCurrencyChange} value={selectedCurrency}>
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
      </div>
      <div className="mt-4">
        <BankListTable
          data={data}
        />
      </div>
    </div>
  );
};

export default BankList;
