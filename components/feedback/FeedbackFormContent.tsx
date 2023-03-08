import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { sendFeedback } from "./FeedbackAPI";
import { FeedbackScreenProps } from "./FeedbackModal";
export default function FeedbackFormContent(props: FeedbackScreenProps) {
  const [text, setText] = useState("");
  return (
    <>
      <Modal.Header className="px-4" closeButton>
        <Modal.Title className="ms-auto">Beta Test Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>
          Enter suggestions, bug reports, feature requests, or anything else
          below. Your feedback is greatly appreciated!
        </Form.Label>
        <Form.Control
          onChange={(e) => setText(e.target.value)}
          value={text}
          as="textarea"
          rows={6}
        />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          onClick={async () => {
            await sendFeedback(text);
            props.setScreen("Confirmed");
          }}
          size="lg"
          className="w-100 h-100 m-0"
          variant="primary"
          disabled={text.length === 0}
        >
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
}
