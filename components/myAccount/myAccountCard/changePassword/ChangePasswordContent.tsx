import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAuth } from "../../../../contexts/AuthContext";
import PasswordControlWithLabel from "../../../auth/PasswordControlWithLabel";
import PasswordRequirements from "../../../auth/PasswordRequirements";
export default function ChangePasswordContent(props: { onSubmit: () => void }) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isNewPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword.length === 0 || currentPassword.length === 0) {
      setError("To change your password, please fill in both fields.");
      return;
    }
    if (!isNewPasswordValid) {
      setError("New password doesn't meet requirements.");
      return;
    }
    if (currentPassword === newPassword) {
      setError(
        "Can't update, current password is the same as the new password."
      );
      return;
    }
    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        currentUser!.email!,
        currentPassword
      );
      const newUserCred = await reauthenticateWithCredential(
        currentUser!,
        credential
      );
      await updatePassword(newUserCred.user, newPassword);
      props.onSubmit();
    } catch (error) {
      //TODO Figure out how to get rid of all this duplicate error handling, maybe reusable customizable function. Research
      console.error(error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/requires-recent-login":
            setError("Cannot change password, requires recent login.");
            break;
          case "auth/wrong-password":
            setError("The current password you entered is incorrect.");
            break;
          case "auth/too-many-requests":
            setError(
              "Too many failed attempts have been made recently, please try again later."
            );
            break;
          default:
            setError("Failed to change password.");
        }
      }
      setLoading(false);
    }
  }

  return (
    <>
      <Modal.Header closeButton>
        {" "}
        <Modal.Title className="ms-auto">Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <PasswordControlWithLabel
              password={currentPassword}
              setPassword={setCurrentPassword}
              label={"Current Password"}
              placeholder={"Current Password"}
            />
            <div className="mt-1">
              <Link href="/forgot-password">Forgot Password?</Link>
            </div>
          </Form.Group>

          <Form.Group
            onBlur={() => setPasswordBlurred(true)}
            onFocus={() => setPasswordClicked(true)}
            className="mb-3"
            controlId="formBasicNewPassword"
          >
            <PasswordControlWithLabel
              password={newPassword}
              setPassword={setNewPassword}
              label={"New Password"}
              placeholder={"New Password"}
            />
            <PasswordRequirements
              expanded={passwordClicked}
              wasClickedOut={passwordBlurred}
              setIsPasswordValid={setIsPasswordValid}
              password={newPassword}
            />
          </Form.Group>
          <div className="mb-4" style={{ color: "red" }}>
            {error}
          </div>
          <Button
            size="lg"
            className="w-100 w-lg-auto mb-5 px-lg-5 py-lg-2"
            variant="primary"
            type="submit"
          >
            Change password{" "}
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
