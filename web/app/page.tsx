"use client";
import React, { useState, useEffect } from "react";
import BankCurrencyBox from "@/components/home/BankCurrencyBox";
import BlackCurrencyBox from "@/components/home/BlackCurrencyBox";
import LoadingPage from "@/components/general/reusables/LoadingPage";
import BankList from "@/components/home/BankList";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import { BankRates, BlackMarketRates, InfoType } from "@/types/currency_types";
import { defaultBlackMarketRates, defaultInfo } from "@/constants/Empties";
import axios from "axios";
import { env } from "next-runtime-env";

const Home: React.FC = () => {
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" }));
  const [loading, setLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<InfoType>(defaultInfo);
  const [bankRate, setBankRate] = useState<BankRates[]>([]);
  const [blackMarketRate, setBlackMarketRate] = useState<BlackMarketRates>(defaultBlackMarketRates);
  

  const fetchRates = async () => {
    const response = await axios.post(`${env("NEXT_PUBLIC_BASE_URL")}latest`);
    setBankRate(response.data.bank_rates);
    setBlackMarketRate(response.data.black_market_rates);
    setInfo(response.data);
  };

  useEffect(() => {
    fetchRates();
    setLoading(false);

    const interval = setInterval(() => {
      fetchRates();
      setLastUpdatedTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" }));
    }, 60000);

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
            {(() => {
              const formattedDate = new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });
              return (
                <p className="text-lg font-bold">
                  <span className="pr-5">Last Updated At: </span>
                  {formattedDate} {lastUpdatedTime}
                </p>
              );
            })()}
          </div>
          <div className="w-full grid grid-cols-2 justify-center items-center gap-3">
            <div className="col-span-2 md:col-span-1">
              <BankCurrencyBox info={bankRate} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <BlackCurrencyBox info={blackMarketRate} />
            </div>
          </div>
          <div className="md:max-w-[90%] mx-auto px-2 my-10">
            <BankList info={info} />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Home;
