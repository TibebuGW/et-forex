"use client";
import { Exo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/wrappers/ThemeProvider";
import AuthProvider from "@/wrappers/AuthProvider";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/redux/store";
import { PublicEnvScript } from "next-runtime-env";

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
        <link rel="icon" type="image/x-icon" href="/public/assets/logo.png"></link>
      </head>
      <body className={exo.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <StoreProvider store={store}>{children}</StoreProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
