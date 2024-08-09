"use client";
import { Exo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/wrappers/ThemeProvider";
import AuthProvider from "@/wrappers/AuthProvider";
import GoogleAnalytics from "@/wrappers/GoogleAnalytics";
import { PublicEnvScript } from "next-runtime-env";
import Script from "next/script";

const exo = Exo({ subsets: [] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
        <link rel="icon" type="image/x-icon" href="/public/assets/logo.png" />
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5056135639877632"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
      </head>
      <body className={exo.className}>
        <GoogleAnalytics />
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
