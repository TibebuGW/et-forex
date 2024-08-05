"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";
import { MdSunny } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setTheme("dark");
  }, []);

  if (!mounted) return null;
  return (
    <div className="pt-3 w-full pb-[16px]">
      <div className="flex flex-row justify-between w-full h-16 py-2 lg:px-8 px-4 pt-4 ">
        <div className="flex items-center gap-4 mx-auto">
          <Image src={Logo} alt="Logo" height={50} width={50} className="object-cover" />
          <p className="text-xl font-bold">ET Forex</p>
        </div>
        <div className="lg:flex flex-row items-center hidden ">
          <nav></nav>
        </div>
        {/* <div className="flex flex-row">
          {theme === "dark" ? (
            <MdSunny
              className="h-[40px] w-[40px]"
              onClick={() => {
                setTheme("light");
              }}
            />
          ) : (
            <IoIosMoon
              className="h-[40px] w-[40px]"
              onClick={() => {
                setTheme("dark");
              }}
            />
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
