import React from "react"
import Typewriter from 'typewriter-effect';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin-slow rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      <div className="mt-4 text-center">
        <h1 className="text-transparent text-3xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <Typewriter
            options={{
              strings: [
                "ET Forex - bank and black market rates",
              ],
              autoStart: true,
              loop: false,
            }}
          />
        </h1>
      </div>
    </div>
  );
};

export default LoadingPage;