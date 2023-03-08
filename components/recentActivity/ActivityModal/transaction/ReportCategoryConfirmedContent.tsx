import { Button, Modal } from "react-bootstrap";

export default function ReportCategoryConfirmedContent(props: {
  onClose: () => void;
}) {
  return (
    <>
      <Modal.Header className="px-4" closeButton>
        <Modal.Title className="ms-auto" id="contained-modal-title-vcenter">
          Report Submitted
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Thanks for your feedback, a report has been submitted!</div>
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
