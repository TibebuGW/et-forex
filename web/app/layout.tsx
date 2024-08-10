/* eslint-disable @next/next/no-sync-scripts */
"use client";
import { Exo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/wrappers/ThemeProvider";
import { WebAppProvider } from "@/wrappers/WebAppWrapper";
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
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
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
            <WebAppProvider>{children}</WebAppProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
