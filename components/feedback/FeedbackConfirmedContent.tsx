import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FeedbackScreenProps } from "./FeedbackModal";
export default function FeedbackConfirmedContent(props: FeedbackScreenProps) {
  return (
    <>
      <Modal.Header className="px-4" closeButton>
        <Modal.Title className="ms-auto">Feedback Received</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your feedback has been received and will be viewed shortly. Thanks for
        helping StopSpend!
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          onClick={props.onClose}
          size="lg"
          className="w-100 h-100 m-0"
          variant="primary"
        >
          Close
        </Button>
      </Modal.Footer>
    </>
  );
}
