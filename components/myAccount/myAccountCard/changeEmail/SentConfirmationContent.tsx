import Image from "next/image";
import { Modal } from "react-bootstrap";
import emailUpdateImg from "../../../../public/emailUpdate.png";
export default function SentConfirmationContent(props: { newEmail: string }) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto" id="contained-modal-title-vcenter">
          Confirmation Email Sent
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4">
        <div className="d-flex flex-column">
          <Image
            style={{
              alignSelf: "center",
            }}
            width={250}
            height={250}
            objectFit="contain"
            src={emailUpdateImg}
            alt="Confirmation email"
          />
          <div>
            A confirmation email has been sent to{" "}
            <span>
              <b>{props.newEmail}</b>.
            </span>{" "}
            Once you click the link inside, your email will update.
          </div>
          <br />
          <div style={{ color: "red" }}>
            After your email changes, you will be logged out and will need to
            sign in again.
          </div>
        </div>
      </Modal.Body>
    </>
  );
}
