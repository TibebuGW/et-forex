import React from "react";
import Image from "next/image";

interface ISelectCurrency {
  name: string;
  value: string;
  flag: any;
}

const SelectCurrency: React.FC<ISelectCurrency> = ({ name, value, flag }) => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <div className="flex justify-center rounded-full items-center h-14 w-14 border-yellow-600 border-solid border-2">
        <Image
          src={flag}
          alt="something"
          width={60}
          height={60}
          className="rounded-full object-cover h-12 w-12"
        />
      </div>
      <div className="">
        <div className="text-md font-bold"><span className="text-2xl">{value !== "1" ? parseFloat(value).toFixed(2) : value}</span> {name}</div>
      </div>
    </div>
  );
};

export default SelectCurrency;
