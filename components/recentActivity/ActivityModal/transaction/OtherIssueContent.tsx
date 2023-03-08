import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { TransactionResponse } from "shared";
import { createOtherIssueReport } from "../../RecentActivityAPI";
import { Screen } from "./TransactionActivityContentController";

export default function OtherIssueContent(props: {
  setScreen: (s: Screen) => void;
  transaction: TransactionResponse;
}) {
  const [issue, setIssue] = useState<string>();
  return (
    <>
      <Modal.Header className="px-4" closeButton>
        <Button
          variant="back"
          onClick={() => props.setScreen(Screen.Transaction)}
        ></Button>
        <Modal.Title className="ms-auto" id="contained-modal-title-vcenter">
          Other Issue
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          className="mb-2"
          placeholder="Enter issue here"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          as="textarea"
          rows={3}
        />
        <Button
          onClick={async () => {
            await createOtherIssueReport(props.transaction, issue!);
            props.setScreen(Screen.ReportCategoryConfirmed);
          }}
          disabled={issue === undefined}
        >
          Submit
        </Button>
      </Modal.Body>
    </>
  );
}
