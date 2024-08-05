import React from "react";
import CurrencyBox from "@/components/home/CurrencyBox";
import Navbar from "@/components/general/Navbar";

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full grid grid-cols-2 justify-center items-center gap-3">
        <div className="col-span-2 md:col-span-1">
          <CurrencyBox type="Bank Rate" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <CurrencyBox type="Black Market Rate" />
        </div>
      </div>
    </div>
  );
};

export default Home;
