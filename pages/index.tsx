import { NextSeo } from "next-seo";

import React from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import {
  homeObj1,
  homeObj2,
  homeObj3,
  homeObj4,
} from "../components/landing/landing/InfoSection/Data";
import InfoSection from "../components/landing/landing/InfoSection/InfoSection";
import NavigationLanding from "../components/navigation/NavigationLanding";
import DefaultSEO from "../config/next-seo.config";
interface LandingPageProps {
  isLoggedIn: boolean;
}
export default function LandingPage(props: LandingPageProps) {
  return (
    <>
      <NextSeo
        titleTemplate="StopSpend - %s"
        title="Make Better Financial Decisions"
        description={DefaultSEO.description}
      />
      <NavigationLanding isLoggedIn={props.isLoggedIn || false} />
      {/* <Head>
        <title>StopSpend - Make Better Financial Decisions</title>
      </Head> */}
      <main>
        <Container fluid>
          {/* <Row className="bgc-primary" style={{ paddingTop: "5.625em" }} /> */}
          <InfoSection
            {...homeObj1}
            className="curve-primary"
            style={{ color: "white", paddingTop: "7.2rem" }}
          />
          <InfoSection
            {...homeObj2}
            className="mt-md-5"
            style={{ marginTop: "-5.625em" }}
          />
          <InfoSection {...homeObj3} style={{ background: "#fafafa" }} />
          <InfoSection
            {...homeObj4}
            style={{ background: "rgb(233 238 231)" }}
          />
        </Container>
        <Footer style={{ background: "rgb(233 238 231)" }} />
      </main>
    </>
  );
}
