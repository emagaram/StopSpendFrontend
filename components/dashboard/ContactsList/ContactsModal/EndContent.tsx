import Image from "next/image";
import { Button, Form, Modal } from "react-bootstrap";
import { BsClipboardPlus } from "react-icons/bs";
import friendContactImg from "../../../../public/friendContact.png";
export default function EndContent(props: {
  onClose: () => void;
  inviteString: string;
  openToast: () => void;
}) {
  const inviteLink = `${
    process.env.NODE_ENV === "development" ? "localhost:3000" : "stopspend.com"
  }/invite/${props.inviteString}`;
  const message = `Hey I've decided that I need some support to help manage my spending habits. I’m using an app called StopSpend which notifies "supporters" whenever I break my spending limits. Could you add yourself as one of my supporters with this link?`;
  return (
    <>
      <Modal.Header closeButton>Invite Friends and Family</Modal.Header>
      <Modal.Body className="p-4 pb-5 d-flex align-items-center flex-column">
        <Image
          src={friendContactImg}
          alt="Invite friends."
          width={300}
          height={300}
          objectFit="contain"
        />
        <div className="text-muted">
          Share this unique <b>invite link</b> with anyone you want to be your
          supporter. They can use it to enter their contact info.
        </div>
        <div className="align-self-start pt-3 w-100">
          <h6>Invite link</h6>
          <Form.Control
            className="link pe-none"
            readOnly
            value={`${inviteLink}`}
          ></Form.Control>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(`${inviteLink}`);
              props.openToast();
            }}
            className="mt-3 d-flex align-items-center"
          >
            Copy to Clipboard
            <BsClipboardPlus className="ms-1" />
          </Button>
        </div>
        <div className="align-self-start pt-5 w-100">
          <h6>Invite link + message</h6>
          <Form.Control
            style={{ overflow: "hidden" }}
            contentEditable={false}
            readOnly
            as="p"
          >
            {message}
            <br />
            <br />
            <a style={{ cursor: "pointer" }} href={inviteLink}>
              {inviteLink}
            </a>
          </Form.Control>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(`${message}\n\n${inviteLink}`);
              props.openToast();
            }}
            className="mt-3 d-flex align-items-center"
          >
            Copy to Clipboard
            <BsClipboardPlus className="ms-1" />
          </Button>
        </div>
      </Modal.Body>
    </>
  );
}
