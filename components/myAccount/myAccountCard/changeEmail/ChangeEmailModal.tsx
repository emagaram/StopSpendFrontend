import { useState } from "react";
import { Modal } from "react-bootstrap";
import useDeviceDetect from "../../../../utils/useDeviceDetect";
import ChangeEmailContent from "./ChangeEmailContent";
import SentConfirmationContent from "./SentConfirmationContent";

export default function ChangeEmailModal(props: {
  show: boolean;
  onClose: () => void;
}) {
  const { isMobile } = useDeviceDetect();
  const [displaySentContent, setDisplaySentContent] = useState(false);
  const [newEmail, setNewEmail] = useState<string | undefined>();
  const exit = () => {
    setNewEmail(undefined);
    setDisplaySentContent(false);
  };

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onClose();
        if (isMobile) exit();
      }}
      animation={!isMobile}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExited={exit}
    >
      {displaySentContent ? (
        <SentConfirmationContent newEmail={newEmail!} />
      ) : (
        <ChangeEmailContent
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          onSubmit={() => setDisplaySentContent(true)}
        />
      )}
    </Modal>
  );
}
