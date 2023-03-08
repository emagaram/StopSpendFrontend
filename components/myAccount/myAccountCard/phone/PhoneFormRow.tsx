import { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { isPossiblePhoneNumber } from "react-phone-number-input";
import ConfirmButtons from "../../../dashboard/ConfirmButtons";
import PhoneFormInput from "../../../dashboard/ContactsList/ContactsFormRow/PhoneInput/PhoneFormInputUnlocked";
export default function PhoneFormRow(props: {
  cancelAction: () => void;
  confirmAction: (s: string) => void;
  phone: string;
}) {
  const [phone, setPhone] = useState<string | undefined>(props.phone);
  const isValidPhone = phone !== undefined && isPossiblePhoneNumber(phone);

  return (
    <>
      <Row className="gx-2 mb-2">
        <Col className="position-relative mt-0">
          <PhoneFormInput
            phone={props.phone}
            setPhone={setPhone}
            submit={() => {
              if (isValidPhone || !phone) {
                props.confirmAction(phone || "");
              }
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <ConfirmButtons
            cancelAction={props.cancelAction}
            canSubmit={isValidPhone || !phone}
            confirmAction={() => {
              if (isValidPhone || !phone) {
                props.confirmAction(phone || "");
              }
            }}
            deleteAction={() => {}}
            deletable={false}
          />
        </Col>
      </Row>
    </>
  );
}
