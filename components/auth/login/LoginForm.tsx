import { FirebaseError } from "firebase/app";
import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../../contexts/AuthContext";
import useDeviceDetect from "../../../utils/useDeviceDetect";
import userErrorMessages from "../../../utils/userErrorMessages";
import LoadingButton from "../../shared/LoadingButton";
import PasswordControlWithLabel from "../PasswordControlWithLabel";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signinWithGoogle } = useAuth();
  const { isMobile } = useDeviceDetect();

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      router.push("/my-setup");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(userErrorMessages(error) || "Failed to log in");
      }

      setLoading(false);
    }
  }

  return (
    <Form onSubmit={onLogin}>
      <h1 className="mb-5 display-4 fw-bold">
        Login<span className="d-none d-xl-inline"> to StopSpend</span>
      </h1>
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
          onClick={() => signinWithGoogle(isMobile)}
        >
          <div className="d-flex align-items-center justify-content-center">
            <FcGoogle />
            <span className="ms-1">Continue with Google</span>
          </div>
        </Button>
      </Form.Group>
      <hr />
      <Form.Group
        className="mb-3"
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        controlId="formBasicEmail"
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-1"
          size="lg"
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <PasswordControlWithLabel
          password={password}
          setPassword={setPassword}
        />
      </Form.Group>

      <Form.Group className="ms-md-auto text-lg-ensd">
        <LoadingButton
          loading={loading}
          size="lg"
          className="w-100 w-lg-auto mb-5 px-lg-5 py-lg-2"
          variant="primary"
          type="submit"
        >
          Login
        </LoadingButton>
        <h4 className="fw-bold">Can't Login?</h4>
        <div>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <div>
          <Link href="/signup">
            <a href="signup">Don't have an account?</a>
          </Link>
        </div>
      </Form.Group>
    </Form>
  );
}
