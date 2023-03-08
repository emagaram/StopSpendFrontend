import { useState } from "react";
import { Modal } from "react-bootstrap";
import useDeviceDetect from "../../../../utils/useDeviceDetect";
import ChangePasswordContent from "./ChangePasswordContent";
import SuccessContent from "./SuccessContent";

export default function ChangePasswordModal(props: {
  show: boolean;
  onClose: () => void;
}) {
  const { isMobile } = useDeviceDetect();
  const [displayChangeContent, setDisplayChangeContent] = useState(true);
  const exit = () => {
    setDisplayChangeContent(true);
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
      {displayChangeContent ? (
        <ChangePasswordContent
          onSubmit={() => setDisplayChangeContent(false)}
        />
      ) : (
        <SuccessContent />
      )}
    </Modal>
  );
}
