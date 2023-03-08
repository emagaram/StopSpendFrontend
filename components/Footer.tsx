import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { CSSProperties } from "styled-components";
import NavBrandLink from "./navigation/NavBrandLink";

function FooterSecondary() {
  return (
    <Container style={{ color: "gray" }} className="bgc-primary1" fluid>
      <Row>
        <Col xs={12}>{/* <hr style={{ color: "white" }} /> */}</Col>
      </Row>
      <Row>
        <Col className="text-center" xs={12}>
          StopSpend.com
        </Col>
        <Col
          className="text-center d-flex justify-content-center gap-4"
          xs={12}
        >
          <Link href="/privacy">
            <a style={{ color: "gray", fontSize: "12px" }}>Privacy Policy</a>
          </Link>
          <Link href="/terms-and-conditions">
            <a style={{ color: "gray", fontSize: "12px" }}>
              Terms and Conditions
            </a>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default function Footer(props: {
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      style={props.style}
      className={classnames("px-3 bgc-primary1 pt-3 pb-4", props.className)}
    >
      <Container className="bgc-primary1" fluid>
        {/* <Row>
          <Col>
            <NavBrandLink href={"/home"} />
          </Col>
        </Row> */}
      </Container>
      <FooterSecondary />
    </div>
  );
}
