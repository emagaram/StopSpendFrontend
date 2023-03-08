import { NextSeo } from "next-seo";

import React from "react";
import Footer from "../components/Footer";
import GetSetupContainer from "../components/landing/product/GetSetup/GetSetupContainer";
import NavigationLanding from "../components/navigation/NavigationLanding";
export default function ProductPage(props: { isLoggedIn?: boolean }) {
  return (
    <>
      <NextSeo
        title="StopSpend - Product"
        description="How StopSpend works. Get StopSpend setup in 3 simple steps."
      />
      <NavigationLanding isLoggedIn={props.isLoggedIn || false} />
      <GetSetupContainer />
      <Footer />
    </>
  );
}
