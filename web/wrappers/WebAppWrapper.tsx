"use client"
import dynamic from "next/dynamic";

export const WebAppProvider = dynamic(
  () =>
    import("@vkruglikov/react-telegram-web-app").then(
      (v) => v.WebAppProvider
    ),
  {
    ssr: false,
  }
);