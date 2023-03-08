import { Timestamp } from "firebase/firestore";
import { DateTime } from "luxon";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useTime } from "../../../contexts/TimeContext";
import useDeviceDetect from "../../../utils/useDeviceDetect";
import { updateLockedMode } from "../MySetupAPI";

export default function ConfirmationModal(props: {
  show: boolean;
  onClose: () => void;
  numDays: number;
}) {
  const { isMobile } = useDeviceDetect();
  const { currentUser } = useAuth();
  const [confirmed, setConfirmed] = useState(false);
  const reset = () => {
    setConfirmed(false);
  };
  const now = useTime();
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onClose();
        if (isMobile) {
          reset();
        }
      }}
      animation={!isMobile}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExited={reset}
    >
      {!confirmed ? (
        <>
          <Modal.Header className="px-4" closeButton>
            <Modal.Title className="ms-auto" id="contained-modal-title-vcenter">
              Confirm Locked Mode
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are about to enable locked mode{" "}
            <span style={{ whiteSpace: "nowrap" }}>
              {" "}
              for{" "}
              <b>
                {props.numDays} day{props.numDays > 1 ? "s" : ""}.
              </b>
            </span>
            <br /> Would you like to proceed?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                await updateLockedMode(
                  { lastEndDate: addDays(props.numDays, now) },
                  currentUser!.uid
                );
                setConfirmed(true);
              }}
              disabled={!(props.numDays > 0)}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <ConfirmationContent
          numDays={props.numDays}
          onClose={props.onClose}
        ></ConfirmationContent>
      )}
    </Modal>
  );
}

function ConfirmationContent(props: { numDays: number; onClose: () => void }) {
  const now = useTime();
  return (
    <>
      <Modal.Header className="px-4" closeButton>
        <Modal.Title className="ms-auto" id="contained-modal-title-vcenter">
          Confirmed!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>Thanks for being responsible!</b> Locked mode is on{" "}
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          for {props.numDays} day{props.numDays > 1 ? "s" : ""}
        </span>{" "}
        and will end on {lockedModeEndDateString(props.numDays, now)}.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onClose}>Close</Button>
      </Modal.Footer>
    </>
  );
}

function lockedModeEndDateString(numDays: number, now: number): string {
  return DateTime.fromMillis(now)
    .plus({ days: numDays })
    .toLocaleString(DateTime.DATE_SHORT);
}
function addDays(days: number, now: number) {
  const SECONDS_IN_DAY = 86400;
  const nowToSecs = now / 1000;
  return new Timestamp(nowToSecs + SECONDS_IN_DAY * days, 0);
}
