import Head from "next/head";
import Image from "next/image";
import React from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { NextSeo } from "next-seo";
import SignupForm from "../components/auth/signup/SignupForm";
import NavigationLanding from "../components/navigation/NavigationLanding";
import WithPublicRoute from "../components/navigation/withPublicRoute";
import laptopTreeImg from "../public/laptopTree.png";

export default function SignupPage() {
  return (
    //79px is close to the navbar
    <WithPublicRoute>
      <NavigationLanding isLoggedIn={false} />
      <Container className="container-center-below-navbar px-4 justify-content-center">
        <NextSeo
          title="StopSpend - Signup"
          description="Create a StopSpend account. Create financial accountability today."
        />
        <Row className="pb-5">
          <Col className="d-none d-lg-flex justify-content-center ">
            <Image
              priority
              width={450}
              height={500}
              objectFit="contain"
              src={laptopTreeImg}
              alt="Working on laptop"
            />
          </Col>
          <Col xs={12} lg={6}>
            <SignupForm />
          </Col>
        </Row>
      </Container>
    </WithPublicRoute>
  );
}
