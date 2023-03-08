import classnames from "classnames";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import { IconContext } from "react-icons";
import { BsFillPersonFill } from "react-icons/bs";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import { Contact, TextMessage } from "shared";
import { useAuth } from "../../../contexts/AuthContext";
import {
  calculateEditStatus as ces,
  unselectRow as ur,
} from "../../../pages/my-setup";
import { ContactsFormData, EditStatus, FormSelectStatus } from "../../../types";
import useDeviceDetect from "../../../utils/useDeviceDetect";
import { editContact as fbEditContact, removeContact } from "../MySetupAPI";
import ContactInfoButton from "./ContactInfoButton/ContactInfoButton";
import ContactsFormRow from "./ContactsFormRow/ContactsFormRow";
import ContactsModal from "./ContactsModal/ContactsModal";
type ContactsListProps = {
  contacts: Contact[];
  editContact: (c: Contact, n: number) => void;
  removeContact: (n: number) => void;
  addContactToBack: (c: Contact) => void;
  lockedMode: boolean;
  setMessages: React.Dispatch<React.SetStateAction<TextMessage[]>>;
  inviteString: string;
  firstName: string;
};

//TODO fix gap between button and rest
export default function ContactsList(props: ContactsListProps) {
  const [selectedRow, setSelectedRow] = useState(
    FormSelectStatus.NoRowSelected
  );

  const { isMobile } = useDeviceDetect();
  const hoverClass = !isMobile ? " hover-bg " : "";
  const shouldDisabledAddButton =
    selectedRow !== FormSelectStatus.NoRowSelected;
  const disableAddButtonClass = shouldDisabledAddButton ? " disabled " : "";
  const [showAddModal, setShowAddModal] = useState(false);

  function unselectRow() {
    ur(setSelectedRow);
  }
  function calculateEditStatus(rowNum: number) {
    return ces(rowNum, selectedRow);
  }

  return (
    <>
      <Stack gap={2}>
        {props.contacts.map((row, j) => (
          <ContactRow
            editStatus={calculateEditStatus(j)}
            key={j}
            row={row}
            rowId={j}
            contacts={props.contacts}
            setMessages={props.setMessages}
            setSelectedRow={setSelectedRow}
            unselectRow={unselectRow}
            lockedMode={props.lockedMode}
          ></ContactRow>
        ))}
      </Stack>

      {props.contacts.length !== 3 && selectedRow !== -1 && (
        <>
          <Row
            className={classnames("align-items-center " + hoverClass, {
              "d-none d-lg-flex": selectedRow >= 0,
            })}
            onClick={() => setShowAddModal(true)}
          >
            <Col xs="auto">
              <IconContext.Provider value={{ size: "4em" }}>
                <BsFillPersonFill color={"#b4d1b2"} />
              </IconContext.Provider>
            </Col>
            <Col>
              <div
                className={classnames(
                  "add-button hover-bg-highlight " + disableAddButtonClass
                )}
                onClick={() => {
                  if (selectedRow >= 0) return;
                  setShowAddModal(true);
                }}
              >
                +Supporter
              </div>
            </Col>
          </Row>

          <ContactsModal
            inviteString={props.inviteString}
            firstTime={props.firstName === ""}
            currentName={props.firstName}
            closeModal={() => setShowAddModal(false)}
            show={showAddModal}
            setMessages={props.setMessages}
          />
        </>
      )}
    </>
  );
}

function ContactRow(props: {
  row: Contact;
  rowId: number;
  editStatus: EditStatus;
  contacts: Contact[];
  unselectRow: () => void;
  setSelectedRow: (row: number) => void;
  lockedMode?: boolean;
  setMessages: React.Dispatch<React.SetStateAction<TextMessage[]>>;
}) {
  const { isMobile } = useDeviceDetect();

  function allSameCountryCode(phones: string[]): boolean {
    if (phones.length === 0) return true;
    let code = formatPhoneNumberIntl(phones[0]).split(" ")[0];
    let allSame = true;
    phones.forEach((value) => {
      if (formatPhoneNumberIntl(value).split(" ")[0] !== code) {
        allSame = false;
      }
    });
    return allSame;
  }
  const { currentUser } = useAuth()!;

  if (props.editStatus === EditStatus.inEdit) {
    const sameFieldsStarting = {
      error: "",
      hasBlurred: true,
      beenEdited: true,
    };
    const startingData: ContactsFormData = {
      name: {
        value: props.row.name,
        ...sameFieldsStarting,
      },
      phone: {
        value: props.row.phone,
        ...sameFieldsStarting,
      },
      canSubmit: false,
      fieldEdited: false,
    };
    const copy = [...props.contacts];
    copy.splice(props.rowId, 1);
    return (
      <ContactsFormRow
        otherContacts={copy}
        formData={startingData}
        confirmAction={(c: Contact) => {
          //  props.editContact(c, props.rowId)
          fbEditContact(c, props.rowId, currentUser!.uid, props.contacts)
            .then()
            .catch();
          props.unselectRow();
        }}
        closeAction={() => props.unselectRow()}
        deleteAction={async () => {
          await removeContact(props.row, currentUser!.uid);
          props.unselectRow();
        }}
        deletable
        lockedMode={props.lockedMode}
        setMessages={props.setMessages}
      ></ContactsFormRow>
    );
  } else {
    const phones: string[] = [];
    props.contacts.forEach((contact) => phones.push(contact.phone));
    const sameCodes = allSameCountryCode(phones);
    const disabled = props.editStatus === EditStatus.cantEdit;
    const disableClass = disabled ? "d-none d-md-flex" : "";
    const editAction = () => props.setSelectedRow(props.rowId);
    const hoverClass = !isMobile && !props.lockedMode ? " hover-bg " : " ";
    return (
      <>
        <Row
          onClick={!isMobile && !props.lockedMode ? editAction : undefined}
          className={"align-items-center " + disableClass + hoverClass}
        >
          <Col xs="auto">
            <IconContext.Provider value={{ size: "4em" }}>
              <BsFillPersonFill className={disabled ? "disabled" : "primary"} />
            </IconContext.Provider>{" "}
          </Col>
          <Col>
            <ContactInfoButton
              name={props.row.name}
              locked={props.lockedMode || false}
              phone={
                sameCodes
                  ? formatPhoneNumber(props.row.phone)
                  : formatPhoneNumberIntl(props.row.phone)
              }
              disabled={disabled}
              editAction={editAction}
            />
          </Col>
        </Row>
      </>
    );
  }
}
