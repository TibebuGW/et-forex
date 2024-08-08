"use client"
import React, {useState, useEffect} from "react";
import BankCurrencyBox from "@/components/home/BankCurrencyBox";
import BlackCurrencyBox from "@/components/home/BlackCurrencyBox";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import {BankRates, BlackMarketRates} from "@/types/currency_types";
import {defaultBlackMarketRates} from "@/constants/Empties";
import axios from "axios";
import {env} from "next-runtime-env";

const Home: React.FC = () => {

  const [bankRate, setBankRate] = useState<BankRates[]>([]);
  const [blackMarketRate, setBlackMarketRate] = useState<BlackMarketRates>(defaultBlackMarketRates);
  const fetchRates = async () => {
    const response = await axios.post(`${env("NEXT_PUBLIC_BASE_URL")}latest`);
    setBankRate(response.data.bank_rates);
    setBlackMarketRate(response.data.black_market_rates);
  }

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full grid grid-cols-2 justify-center items-center gap-3">
        <div className="col-span-2 md:col-span-1">
          <BankCurrencyBox info={bankRate} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <BlackCurrencyBox info={blackMarketRate} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
