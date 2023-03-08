import { NextSeo } from "next-seo";
import Image from "next/image";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LoginForm from "../components/auth/login/LoginForm";
import NavigationLanding from "../components/navigation/NavigationLanding";
import WithPublicRoute from "../components/navigation/withPublicRoute";
import holdingHandsImg from "../public/holdingHands.png";
export default function LoginPage() {
  return (
    //79px is close to the navbar
    <WithPublicRoute>
      <NextSeo
        title="StopSpend - Login"
        description="Create an account or login to StopSpend. Create financial accountability today."
      />
      <NavigationLanding isLoggedIn={false} />
      <Container className="container-center-below-navbar px-4 justify-content-center">
        <Row className="pb-5">
          <Col className="d-none d-lg-flex justify-content-center ">
            <Image
              priority
              width={450}
              height={500}
              objectFit="contain"
              src={holdingHandsImg}
              alt="Friends"
            />
          </Col>
          <Col xs={12} lg={6}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </WithPublicRoute>
  );
}
