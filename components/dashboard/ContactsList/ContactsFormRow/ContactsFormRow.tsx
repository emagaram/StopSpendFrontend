import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsFillPersonFill, BsX } from "react-icons/bs";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { Contact, TextMessage } from "shared";
import { ContactsFormData } from "../../../../types";
import LoadingButton from "../../../shared/LoadingButton";
import ContactInfoButton from "../ContactInfoButton/ContactInfoButton";

type ContactsFormRowProps = {
  otherContacts: Contact[];
  formData: ContactsFormData;
  closeAction: () => void;
  confirmAction: (c: Contact) => void;
  deleteAction?: () => Promise<void>;
  deletable: boolean;
  setMessages: React.Dispatch<React.SetStateAction<TextMessage[]>>;
  lockedMode?: boolean;
};

//TODO this code is very messy, I suggest later on fixing it
export default function ContactsFormRow(props: ContactsFormRowProps) {
  const [loading, setLoading] = useState(false);
  return (
    <Row className="py-2 align-items-center user-select-none">
      <Col xs="auto">
        <IconContext.Provider value={{ size: "4em" }}>
          <BsFillPersonFill className={"disabled"} />
        </IconContext.Provider>
      </Col>
      <Col>
        <ContactInfoButton
          locked={props.lockedMode || false}
          disabled
          editAction={() => {}}
          name={props.formData.name.value || ""}
          phone={formatPhoneNumberIntl(props.formData.phone.value || "")}
        />
      </Col>
      <Col xs={"auto"}>
        <Button
          className="me-1"
          variant="outline-primary"
          onClick={props.closeAction}
        >
          Cancel
          <BsX />
        </Button>

        <LoadingButton
          loading={loading}
          variant="outline-danger"
          onClick={async () => {
            if (!props.deleteAction) return;
            setLoading(true);
            await props.deleteAction();
          }}
        >
          Delete
        </LoadingButton>
      </Col>
    </Row>
  );
}
