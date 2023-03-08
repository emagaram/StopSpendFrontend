import { FirebaseError } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import NavigationLanding from "../components/navigation/NavigationLanding";
import { useAuth } from "../contexts/AuthContext";
import forgotEmailSentImg from "../public/forgotEmailSent.png";
import forgotPasswordImg from "../public/forgotPassword.png";
import userErrorMessages from "../utils/userErrorMessages";
export default function ForgotPasswordPage(props: { isLoggedIn?: boolean }) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const auth = getAuth();
  const [error, setError] = useState("");

  return (
    <>
      <NavigationLanding isLoggedIn={props.isLoggedIn || false} />
      <Container
        className="d-flex position-relative px-4 justify-content-center align-items-center"
        style={{ height: "calc(100vh - 85px)", top: "65px" }}
      >
        <Row className="d-flex justify-content-center">
          {!emailSent ? (
            <>
              <Col className="d-none d-lg-flex justify-content-end ">
                <Image
                  priority={true}
                  objectFit="contain"
                  width={450}
                  height={450}
                  src={forgotPasswordImg}
                  alt="Forgot Password"
                />
              </Col>

              <Col
                className="d-flex flex-column justify-content-center"
                xs={12}
                lg={6}
              >
                <h1 className="display-6 fw-bold">Forgot Password?</h1>
                <br />
                <div className="mb-3 text-muted">
                  No worries. We’ll email you reset instructions.
                </div>
                <Form.Group
                  className="mb-5 text-start"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="">Email address</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-1"
                    size="lg"
                    type="email"
                    placeholder="Enter email"
                  />
                  <div style={{ color: "red" }}>{error}</div>
                </Form.Group>
                <div>
                  <Button
                    className="me-4 my-3"
                    size="lg"
                    disabled={email.length === 0}
                    onClick={async () => {
                      try {
                        if (email.length === 0) return;
                        setLoading(true);
                        await sendPasswordResetEmail(auth, email);
                        setEmailSent(true);
                      } catch (error) {
                        setLoading(false);
                        if (error instanceof FirebaseError) {
                          setError(
                            userErrorMessages(error) ||
                              "An error has occured, we aplogize for the inconvinience. Please try again later."
                          );
                        }
                        console.error(error);
                      }
                    }}
                  >
                    Reset Password{" "}
                    {loading && (
                      <Spinner
                        color="white"
                        animation="border"
                        size="sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    )}
                  </Button>
                  {currentUser ? (
                    <Link href="/">
                      <a href="/" className="">
                        Return to Home
                      </a>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <a href="/login" className="text-nowrap">
                        Return to Login
                      </a>
                    </Link>
                  )}
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col className="d-none d-lg-flex justify-content-end ">
                <Image
                  priority={true}
                  objectFit="contain"
                  width={450}
                  src={forgotEmailSentImg}
                  alt="Mailman"
                />
              </Col>

              <Col
                xs={12}
                lg={6}
                className="d-flex flex-column justify-content-center"
              >
                <h1 className="display-6 fw-bold">Email Sent!</h1>

                <br />
                <div className="mb-3 text-muted">
                  An email with reset instructions has been sent to{" "}
                  <b>{email}</b>. If you don't see it, please check your spam
                  folder.
                </div>
                <div>
                  {currentUser ? (
                    <Link href="/">
                      <Button size="lg" href="/">
                        Return to Home
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <Button size="lg" href="/login">
                        Return to Login
                      </Button>
                    </Link>
                  )}
                </div>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}
