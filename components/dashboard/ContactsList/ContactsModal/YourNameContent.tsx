import Image from "next/image";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import whoAmI from "../../../../public/whoAmI.png";
export default function YourNameContent(props: {
  onSubmit: (s: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState<string | undefined>();
  return (
    <Modal.Body className="px-3 px-sm-5 py-5 d-flex flex-column">
      <Image
        src={whoAmI}
        width={240}
        height={300}
        objectFit="contain"
        alt="Identity"
      />
      <div className="fs-5">
        What should we call you when we text your Supporters?
      </div>
      <Form.Group className="mt-3">
        <Form.Label className="mb-1 text-muted">First Name</Form.Label>
        <Form.Control
          className="fs-5"
          type="text"
          value={name ? name : ""}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></Form.Control>
      </Form.Group>
      <div className="d-flex mt-4 align-items-center justify-content-end">
        <span
          className="add-button hover-bg hover-bg-highlight me-2"
          onClick={props.onClose}
        >
          Cancel
        </span>
        <Button
          className="ms-2 "
          onClick={() => props.onSubmit(name!)}
          variant="primary"
          disabled={!name || name.length === 0}
        >
          Continue
        </Button>
      </div>
    </Modal.Body>
  );
}
