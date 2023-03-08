import classnames from "classnames";
import { Modal } from "react-bootstrap";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { Contact } from "shared";
import { Screen } from "./MessageContentController";
export default function MessageContent(props: {
  message: string;
  setScreen: (s: Screen) => void;
  contacts: Contact[];
}) {
  return (
    <>
      <Modal.Header className="px-4" closeButton>
        <Modal.Title className="ms-auto" id="contained-modal-title-vcenter">
          Message Sent
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          To:{" "}
          {props.contacts.map((contact, i) => {
            return (
              <div
                key={`contact-${contact.phone}`}
                className={classnames({
                  "d-inline": props.contacts.length === 1,
                })}
              >
                <span className="fw-bold me-2">{contact.name}</span>
                <span className="text-muted">
                  {formatPhoneNumberIntl(contact.phone)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-2">
          Text message:
          <br />
          <p style={{ fontSize: "14px" }} className="text-muted fst-italic">
            {props.message}
          </p>
        </div>
      </Modal.Body>
    </>
  );
}
