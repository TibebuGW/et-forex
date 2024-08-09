"use client"
import React, { useState, useEffect } from "react";
import BankCurrencyBox from "@/components/home/BankCurrencyBox";
import BlackCurrencyBox from "@/components/home/BlackCurrencyBox";
import LoadingPage from "@/components/general/reusables/LoadingPage";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import { BankRates, BlackMarketRates } from "@/types/currency_types";
import { defaultBlackMarketRates } from "@/constants/Empties";
import axios from "axios";
import { env } from "next-runtime-env";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [bankRate, setBankRate] = useState<BankRates[]>([]);
  const [blackMarketRate, setBlackMarketRate] = useState<BlackMarketRates>(defaultBlackMarketRates);
  
  const fetchRates = async () => {
    const response = await axios.post(`${env("NEXT_PUBLIC_BASE_URL")}latest`);
    setBankRate(response.data.bank_rates);
    setBlackMarketRate(response.data.black_market_rates);
  };

  useEffect(() => {
    fetchRates();
    setLoading(false);

    const interval = setInterval(() => {
      fetchRates();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <Navbar />
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
      )}
    </div>
  );
};

export default Home;
