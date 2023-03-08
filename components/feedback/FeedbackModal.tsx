import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import useDeviceDetect from "../../utils/useDeviceDetect";
import FeedbackConfirmedContent from "./FeedbackConfirmedContent";
import FeedbackFormContent from "./FeedbackFormContent";
export type Screen = "Form" | "Confirmed";
export interface FeedbackScreenProps {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  onClose: () => void;
}
function CurrentScreen(props: FeedbackScreenProps) {
  switch (props.screen) {
    case "Confirmed":
      return <FeedbackConfirmedContent {...props} />;
    case "Form":
      return <FeedbackFormContent {...props} />;
    default:
      return <></>;
  }
}

export default function FeedbackModal(props: {
  show: boolean;
  onClose: () => void;
}) {
  const [screen, setScreen] = useState<Screen>("Form");
  const { isMobile } = useDeviceDetect();
  const onClose = () => {
    props.onClose();
    if (isMobile) {
      setScreen("Form");
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={onClose}
      onExit={onClose}
      onExited={() => setScreen("Form")}
      animation={!isMobile}
      centered
    >
      <CurrentScreen screen={screen} setScreen={setScreen} onClose={onClose} />
    </Modal>
  );
}
