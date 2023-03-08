import { NextSeo } from "next-seo";

import { useRouter } from "next/router";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import NavigationLanding from "../components/navigation/NavigationLanding";
interface PricingPageProps {
  isLoggedIn: boolean;
}
export default function PricingPage(props: PricingPageProps) {
  return (
    <main className="background">
      <NavigationLanding isLoggedIn={props.isLoggedIn || false} />
      <NextSeo
        title="StopSpend - Pricing"
        description="While StopSpend is in beta testing, it's free and no credit card is needed! Start your journey today."
      />
      <Container style={{ paddingTop: "7.5rem" }}>
        <Row className="mb-5">
          <Col style={{ color: "white" }} className="text-center">
            <h1 className="fs-3">Free during testing.</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center" style={{ maxWidth: "28.125em" }}>
            <FreeCard />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

function FreeCard() {
  const router = useRouter();
  return (
    <div
      style={{ background: "white", borderRadius: "0.5em", color: "black" }}
      className="shadow-sm "
    >
      <div
        className="py-2 fs-5 position-relative"
        style={{ borderBottom: "1px solid gainsboro" }}
      >
        BETA
        <hr
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            width: "1.563em",
            bottom: "-1px",
            opacity: 1,
            height: "0.188em",
            backgroundColor: "green",
          }}
          className="position-absolute my-0 mx-auto"
        />
      </div>
      <div className="px-3 lh-lg">
        <div className="mt-2 mb-4">
          <span style={{ fontSize: "2.875em" }}>$0</span>
          <span style={{ fontSize: "1.25em" }}>/month</span>
        </div>
        <div className="fs-5 mb-4 fw-light">
          While StopSpend undergoes beta testing, it is free and no credit card
          is needed to sign up!
        </div>
        <div className="pb-5 pt-2">
          <Button size="lg" onClick={() => router.push("/signup")}>
            Start Today
          </Button>
        </div>
      </div>
    </div>
  );
}
