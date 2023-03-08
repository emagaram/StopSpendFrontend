import { DefaultSeo } from "next-seo";
import Head from "next/head";
import Script from "next/script";
import React, { FunctionComponent } from "react";
import FeedbackButton from "../components/feedback/FeedbackButton";
import DefaultSEO from "../config/next-seo.config";
import useAppCheckAndAnalytics from "../config/useAppCheckAndAnalytics";
import { AuthProvider } from "../contexts/AuthContext";
import { GlobalProvider } from "../contexts/GlobalContext";
import { OnlineStatusProvider } from "../contexts/OnlineContext";
import { TimeProvider } from "../contexts/TimeContext";
import "../styles/App.scss";
import onClientNext from "../utils/onClientNext";
interface AppProps {
  Component: FunctionComponent;
  pageProps: any;
}
export default function App({ Component, pageProps }: AppProps) {
  if (
    onClientNext &&
    process.env.NODE_ENV === "production" &&
    window.location.hostname.includes("stopspend.com")
  ) {
    console.log = function () {};
  }

  return (
    <div>
      <React.StrictMode>
        <Head>
          <meta charSet="utf-8" />
          <meta name="author" content="StopSpend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <Script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" />
        </Head>
        <AuthProvider>
          <TimeProvider>
            <GlobalProvider>
              <OnlineStatusProvider>
                <>
                  <DefaultSeo {...DefaultSEO} />
                  <FeedbackButton />
                  <Component {...pageProps} />
                </>
              </OnlineStatusProvider>
            </GlobalProvider>
          </TimeProvider>
        </AuthProvider>
      </React.StrictMode>
    </div>
  );
}
export const COLORS = {
  primary: "#48853c",
  primaryWelcomeModal: "#6aad5c",
};
