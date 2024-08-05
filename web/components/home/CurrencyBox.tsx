import React from "react";
import { ETFlag, USFlag } from "@/public/assets/flags";
import { Black } from "@/public/assets/bank-images";
import currencies from "@/constants/Currencies";
import banks from "@/constants/Banks";
import SelectCurrency from "./SelectCurrency";
import SelectBank from "./SelectBank";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  type: string;
}

const CurrencyBox: React.FC<IProps> = ({ type }) => {
  return (
    <div className="w-[90%] h-[450px] md:w-[600px] rounded-lg border-2 mx-auto shadow-sm shadow-gray-400 transition duration-300 p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="h-full w-full rounded-sm bg-white dark:bg-black p-5">
        <div className="flex items-center justify-around my-3">
          <p className="text-2xl font-bold">{type}</p>
          <div className="flex items-center justify-center border-2 border-green-600 text-green-600 rounded-full py-3 px-5">
            <p className="blink flex justify-center items-center gap-3">
              <div className="bg-green-600 rounded-full p-2"></div>
              LIVE
            </p>
          </div>
        </div>
        <div className="w-[85%] flex justify-between items-center mx-auto my-2">
          <Select>
            <SelectTrigger className="">
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
          <span className="text-3xl">=</span>
          <SelectCurrency name="ETB" flag={ETFlag} value="130" />
        </div>
        {type === "Bank Rate" ? (
          <div className="flex justify-center">
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder={<SelectBank name={banks[0].name} logo={banks[0].image} />} />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank.name} value={bank.name}>
                    <SelectBank name={bank.name} logo={bank.image} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="py-2">
            <SelectBank name="Black Market" logo={Black} />
          </div>
        )}
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <div className="flex justify-center items-center w-[90%]">
            <input
              type="text"
              className="w-full border-2 border-gray-300 h-14 rounded-lg px-2"
              placeholder="Enter Amount"
            />
          </div>
          <div className="flex justify-center items-center w-[90%]">
            <input
              type="text"
              className="w-full border-2 border-gray-300 h-14 rounded-lg px-2"
              placeholder="Enter Amount"
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <p className="text-xl font-bold">
            <span className="pr-5">Today&apos;s Date:</span>
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyBox;
