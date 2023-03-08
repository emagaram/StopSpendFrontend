import { Head, Html, Main, NextScript } from "next/document";
import React from "react";
export default function Document() {
  return (
    <Html>
      <Head />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="StopSpend helps you make better decisions with support from friends and family."
      />
      {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo2.png" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700&display=swap"
        rel="stylesheet"
      />
      <title>StopSpend - Make Better Financial Decisions</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
