import React from "react";
import Logo from "@/public/assets/logo.png";
// import Typewriter from "typewriter-effect";
import Image from "next/image";
import { useTheme } from "next-themes";

const LoadingPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen my-[-20px]">
      <Image src={Logo} alt="logo" width={80} height={80} />
      <p
        style={{
          fontSize: "50px",
          color: theme === "dark" ? "white" : "black",
          textShadow: theme
            ? "1px 1px 0 #00ffff, -1px -1px 0 #ff00ff"
            : "1px 1px 0 #ff00ff, -1px -1px 0 #00ffff",
          fontWeight: "bold",
        }}
      >
        ET Forex
      </p>
      {/* <div className="mt-2 mb-4 text-center">
        <h1 className="text-transparent text-3xl bg-clip-text bg-gradient-to-r from-green-600 via-yellow-600 to-red-600">
          <Typewriter
            options={{
              strings: [" ኢትዮጵያ ለዘላለም ትኑር። "],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
      </div> */}
      <div className="animate-spin-slow rounded-full h-5 w-5 border-t-4 border-blue-500 border-solid flex justify-center items-center"></div>
    </div>
  );
};

export default LoadingPage;
