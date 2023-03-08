import { Modal } from "react-bootstrap";
import { ActivityItemKind } from "shared";
import { ActivityItem } from "../../../types";
import useDeviceDetect from "../../../utils/useDeviceDetect";
import MessageActivityContentController from "./message/MessageContentController";
import TransactionActivityContentController from "./transaction/TransactionActivityContentController";
function ContentController(props: {
  activity: ActivityItem;
  onClose: () => void;
}) {
  switch (props.activity.kind) {
    case ActivityItemKind.transactionResponse:
      return (
        <TransactionActivityContentController
          {...props}
          activity={props.activity}
        />
      );
    case ActivityItemKind.greetingsTextMessage:
    case ActivityItemKind.alertTextMessage:
    case ActivityItemKind.progressTextMessage:
      return (
        <MessageActivityContentController
          {...props}
          activity={props.activity}
        />
      );
    case ActivityItemKind.userAlertTextMessage:
      return <></>;
  }
  console.error("Invalid Activity Kind");
}
export default function ActivityModal(props: {
  show: boolean;
  onClose: () => void;
  activity: ActivityItem;
}) {
  const { isMobile } = useDeviceDetect();

  return (
    <Modal
      show={props.show}
      onHide={props.onClose}
      // fullscreen={"sm-down"}
      animation={!isMobile}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ContentController {...props} />
    </Modal>
  );
}
