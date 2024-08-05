"use client"
import React from "react";
import Image from "next/image";
interface ISelectBank {
  name: string;
  logo: any;
}

const SelectBank: React.FC<ISelectBank> = ({ name, logo }) => {
    return (
    <div className="flex gap-2 justify-center items-center">

      <div className={`flex justify-center rounded-md items-center h-14 w-14 border-black dark:border-gray-300 border-solid border-2`}>
        <Image
          src={logo}
          alt="something"
          width={60}
          height={60}
          className="rounded-sm object-cover h-12 w-12"
        />
      </div>
      <div className="">
        <div className="text-lg font-bold">{name}</div>
      </div>
    </div>
  );
};

export default SelectBank;
