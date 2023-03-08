import { FirebaseError } from "firebase/app";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import holdingHands from "../../public/holdingHands.png";
import PhoneFormInput from "../dashboard/ContactsList/ContactsFormRow/PhoneInput/PhoneFormInputUnlocked";
import FormErrorResponse from "../shared/FormErrorResponse";
import LoadingButton from "../shared/LoadingButton";
export default function ValidInvite(props: {
  userName: string;
  onSubmit: (
    name: string,
    phone: string,
    kind: "Set" | "Remove"
  ) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const router = useRouter();
  const validInput = name.length > 0 && phone && isPossiblePhoneNumber(phone);
  return (
    <Container
      style={{ maxWidth: "40em", gap: "1.875em" }}
      className="below-navbar-landing px-5 d-flex align-items-center justify-content-center flex-column pb-5 mb-5 mb-lg-2"
    >
      <Image width={300} height={300} src={holdingHands} alt="Friends" />
      <h2>Help Support {props.userName}</h2>
      <div className="text-muted text-center">
        Enter your name and phone number. We will alert you whenever{" "}
        {props.userName}’s spending limits are broken.
      </div>
      <Form
        className="d-flex flex-column"
        style={{ gap: "0.625em" }}
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            setError("");
            setDisplayError(false);
            if (!validInput) return;
            setLoading(true);
            await props.onSubmit(name, phone, "Set");
            router.push({
              pathname: "/invite-confirmed",
              query: {
                mode: "Add",
                userName: props.userName,
              },
            });
          } catch (error) {
            setDisplayError(true);
            if (error instanceof FirebaseError) {
              console.log(error.code);
              console.log(error.message);
              setError(error.message);
            } else
              setError(
                "Could not complete the request. Please try again later."
              );
          } finally {
            setLoading(false);
          }
        }}
      >
        <FormErrorResponse message={error} display={displayError} />
        <Form.Group>
          <Form.Label>First name*</Form.Label>
          <Form.Control
            name={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone*</Form.Label>
          <PhoneFormInput phone={phone} setPhone={setPhone} submit={() => {}} />
        </Form.Group>
        <LoadingButton disabled={!validInput} type="submit" loading={loading}>
          Confirm
        </LoadingButton>
      </Form>
      {/* <LinkContainer to="/forgot-password">
        <a href="/forgot-password">Trying to remove yourself as a contact?</a>
      </LinkContainer> */}
    </Container>
  );
}
