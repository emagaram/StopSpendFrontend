import { addDoc, doc, setDoc } from "@firebase/firestore";
import { logEvent } from "firebase/analytics";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";
import { UserPublicData, UserPublicDataDefault } from "shared";
import { analytics, db } from "../../../config/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";
import createBasicConverter from "../../../converters/createBasicConverter";
import useDeviceDetect from "../../../utils/useDeviceDetect";
import { createUserDocIfFirst } from "../../dashboard/MySetupAPI";
import LoadingButton from "../../shared/LoadingButton";
import PasswordControlWithLabel from "../PasswordControlWithLabel";
import PasswordRequirements from "../PasswordRequirements";
export default function SignupForm() {
  const { signupWithEmail, signinWithGoogle } = useAuth();
  const { isMobile } = useDeviceDetect();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const hooks = useGlobal();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setError("Password doesn't meet requirements.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await signupWithEmail(email, password);
      logEvent(analytics, "signup_start");
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("The email you entered isn't valid.");
            break;
          case "auth/user-not-found":
            setError("The email you entered does not exist.");
            break;
          case "auth/wrong-password":
            setError("The password you entered is incorrect.");
            break;
          case "auth/weak-password":
            setError("The password you entered is weak");
            break;
          case "auth/email-already-in-use":
            setError("A user already exists with that email address.");
            break;
          case "auth/too-many-requests":
            setError(
              "Too many failed attempts have been made recently, please try again later."
            );
            break;
          default:
            setError("Failed to sign up");
        }
      } else setError("Failed to sign up");
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onRegister}>
      <h1 className="display-4 mb-5 fw-bold">Sign up for the Beta Test</h1>
      {error.length > 0 && (
        <div
          className="fs-6 my-2 p-4"
          style={{
            color: "white",
            borderRadius: "0.3125em",
            fontWeight: "400",
            background: "#a42e18",
          }}
        >
          {error}
        </div>
      )}
      <Form.Group className="mb-4" controlId="socialSignIn">
        <Button
          className="w-100 fs-5"
          style={{ border: "1px solid #ced4d0" }}
          variant="light"
          onClick={() => {
            signinWithGoogle(isMobile);
          }}
        >
          <div className="d-flex align-items-center justify-content-center">
            <FcGoogle />
            <span className="ms-1">Continue with Google</span>
          </div>
        </Button>
      </Form.Group>
      <hr />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="lg"
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group
        onBlur={() => setPasswordBlurred(true)}
        onFocus={() => setPasswordClicked(true)}
        className="mb-4"
        controlId="formBasicPassword"
      >
        <PasswordControlWithLabel
          password={password}
          setPassword={setPassword}
        />
        <PasswordRequirements
          className="ms-0"
          password={password}
          expanded={passwordClicked}
          wasClickedOut={passwordBlurred}
          setIsPasswordValid={setIsPasswordValid}
        />
      </Form.Group>

      <Form.Group className="ms-md-auto">
        <LoadingButton
          loading={loading}
          size="lg"
          className="w-100 w-lg-auto mb-2 px-lg-5 py-lg-2"
          variant="primary"
          type="submit"
        >
          Sign up
        </LoadingButton>
        <small className="d-block mb-4 text-muted">
          By continuing with Google or Email, you agree to StopSpend's{" "}
          <span className="text-nowrap">
            <Link href="terms-and-conditions">Terms and Conditions</Link>
          </span>{" "}
          and{" "}
          <span className="text-nowrap">
            <Link href="privacy">Privacy Policy</Link>
          </span>
          .
        </small>
        <h4 className="fw-bold">Already have an account?</h4>
        <div>
          <Link href="/login">Login here</Link>
        </div>
        <div>
          <Link href="/forgot-password">Reset your password</Link>
        </div>
      </Form.Group>
    </Form>
  );
}
