import Head from "next/head";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import MyAccountCard from "../components/myAccount/myAccountCard/MyAccountCard";
import MySubscriptionCard from "../components/myAccount/mySubscriptionCard/MySubscriptionCard";
import NavigationApp from "../components/navigation/NavigationApp";
import WithPrivateRoute from "../components/navigation/WithPrivateRoute";
import { useGlobal } from "../contexts/GlobalContext";
export default function MyAccountPage() {
  const hooks = useGlobal();
  return (
    <>
      <WithPrivateRoute>
        <NavigationApp />
        <Head>
          <title>StopSpend - Account</title>
        </Head>
        <Container className="below-navbar-app px-4 my-account">
          <Row className="gy-5">
            <Col xs={12} lg={8}>
              <MyAccountCard {...hooks} />
            </Col>
            <Col xs={12} lg={4}>
              <MySubscriptionCard />
            </Col>
          </Row>
        </Container>
      </WithPrivateRoute>
    </>
  );
}
