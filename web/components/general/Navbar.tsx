"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";
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
          <Image src={Logo} alt="Logo" height={80} width={80} className="object-cover" />
          <p
            style={{
              fontSize: "20px",
              color: theme === "dark" ? "white" : "black",
              textShadow: theme
                ? "1px 1px 0 #00ffff, -1px -1px 0 #ff00ff"
                : "1px 1px 0 #ff00ff, -1px -1px 0 #00ffff",
              fontWeight: "bold",
            }}
          >
            ET Forex
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
