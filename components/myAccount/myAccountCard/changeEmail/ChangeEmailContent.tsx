import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useAuth } from "../../../../contexts/AuthContext";
import PasswordControlWithLabel from "../../../auth/PasswordControlWithLabel";
import LoadingButton from "../../../shared/LoadingButton";
export default function ChangeEmailContent(props: {
  onSubmit: () => void;
  newEmail: string | undefined;
  setNewEmail: (s: string | undefined) => void;
}) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!props.newEmail) {
      setError("The email you entered is invalid.");
      return;
    }
    if (password.length === 0) {
      setError("To change your email, please enter your password.");
      return;
    }
    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        currentUser!.email!,
        password
      );
      const newUserCred = await reauthenticateWithCredential(
        currentUser!,
        credential
      );
      await verifyBeforeUpdateEmail(newUserCred.user, props.newEmail);
      props.onSubmit();
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/invalid-new-email":
            setError("The email you entered isn't valid.");
            break;
          case "auth/requires-recent-login":
            setError("Cannot reset email, requires recent login.");
            break;
          case "auth/wrong-password":
            setError("The password you entered is incorrect.");
            break;
          default:
            setError("Failed to send reset email link.");
        }
      }
      setLoading(false);
    }
  }

  return (
    <>
      <Modal.Header closeButton>
        {" "}
        <Modal.Title className="ms-auto">Change Email</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>New email</Form.Label>
            <Form.Control
              value={props.newEmail}
              onChange={(e) => props.setNewEmail(e.target.value)}
              className="mb-1"
              size="lg"
              type="email"
              placeholder="Enter new email"
            />
          </Form.Group>
          <Form.Group
            className="mb-2 d-flex flex-column"
            controlId="formBasicPassword"
          >
            <PasswordControlWithLabel
              label="Current Password"
              password={password}
              setPassword={setPassword}
            />
            <span className="mt-1 add-button text-decoration-underline">
              <Link href="/forgot-password">Forgot Password?</Link>
            </span>
          </Form.Group>

          <div className="mb-3" style={{ color: "red" }}>
            {error}
          </div>
          <LoadingButton
            size="lg"
            className="w-100 w-lg-auto mb-5 px-lg-5 py-lg-2"
            variant="primary"
            type="submit"
            loading={loading}
          >
            Change email
          </LoadingButton>
        </Form>
      </Modal.Body>
    </>
  );
}
