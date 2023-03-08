import { logEvent } from "firebase/analytics";
import { sendEmailVerification } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import NavigationApp from "../components/navigation/NavigationApp";
import WithPrivateRoute from "../components/navigation/WithPrivateRoute";
import { analytics, db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { useGlobal } from "../contexts/GlobalContext";
import mailSentImg from "../public/mailSent.png";
import useIsomorphicLayoutEffect from "../utils/useIsomorphicLayoutEffect";
export default function VerifyEmailPage() {
  //TODO look up nextjs way of doing this
  useIsomorphicLayoutEffect(() => {
    document.body.className = "bgc-primary";
    return () => {
      document.body.className = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WithPrivateRoute>
      <NavigationApp />
      <Container className="container-center-below-navbar flex-lg-column">
        <Head>
          <title>StopSpend - Verify Email</title>
        </Head>
        <Row className="mb-5">
          <Col style={{ color: "white" }} className="text-center fs-3">
            Verify your email.
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center" style={{ maxWidth: "34.375em" }}>
            <VerifyCard />
          </Col>
        </Row>
      </Container>
    </WithPrivateRoute>
  );
}

function VerifyCard() {
  const { currentUser } = useAuth();
  const { reload } = useGlobal();
  const [sendingEmail, setSendingEmail] = useState(false);

  if (!currentUser) throw Error("User doesn't exist");
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/my-setup");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        <div
          style={{
            background: "white",
            borderRadius: "0.5em",
            color: "black",
            marginBottom: "100px",
          }}
          className="shadow-sm d-flex flex-column align-items-center px-5 pt-2"
        >
          <Image
            width="350"
            height="350"
            objectFit="contain"
            src={mailSentImg}
            alt="Mail sent"
            priority
          />
          <div>
            We sent a verification email to{" "}
            <span>
              <b>{currentUser!.email!}</b>.
            </span>{" "}
            Click the link inside and then come back to proceed!
          </div>
          <div className="mt-3" style={{ color: "red" }}>
            {error}
          </div>
          <div>
            <Button
              size="lg"
              className="my-3"
              onClick={async () => {
                setError("");
                reload();
                await currentUser.reload();
                if (!currentUser.emailVerified) {
                  setError("Email not verified.");
                } else {
                  router.push("/my-setup");
                  logEvent(analytics, "signup_finish");
                }
              }}
            >
              Proceed
            </Button>
            <div
              className="my-3"
              onClick={async () => {
                setSendingEmail(true);
                await sendEmailVerification(currentUser, {
                  url: `${
                    process.env.NODE_ENV === "development"
                      ? "localhost:3000"
                      : "https://stopspend.com"
                  }/my-setup`,
                });
                setSendingEmail(false);
              }}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "green",
              }}
            >
              Resend email
            </div>
            {sendingEmail && (
              <Spinner className="my-3" animation="border"></Spinner>
            )}
          </div>
        </div>
      }
    </>
  );
}
