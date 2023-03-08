import { Row, Col, Form } from "react-bootstrap";
import ConfirmButtons from "../../../dashboard/ConfirmButtons";
import { useState } from "react";
export default function NameFormRow(props: {
  cancelAction: () => void;
  confirmAction: (s: string) => void;
  firstName: string;
}) {
  const [firstName, setFirstName] = useState(props.firstName);

  return (
    <>
      <Row className="gx-2 mb-2">
        <Col className="position-relative mt-0">
          <Form.Control
            type="text"
            autoComplete="zyx"
            placeholder="John"
            style={{ whiteSpace: "normal", height: "2.5em" }}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <ConfirmButtons
            cancelAction={props.cancelAction}
            canSubmit={firstName !== undefined && firstName.length !== 0}
            confirmAction={() => {
              if (firstName === undefined) return;
              props.confirmAction(firstName);
            }}
            deleteAction={() => {}}
            deletable={false}
          />
        </Col>
      </Row>
    </>
  );
}
