import { useState } from "react";
import { LockedMode } from "shared";
import ConfirmationModal from "./ConfirmationModal";
import EnableLockedMode from "./EnableLockedMode";
interface IProps {
  lockedMode: LockedMode | null;
}
export default function LockedCard(props: IProps) {
  const [showModal, setShowModal] = useState(false);
  const [numDays, setNumDays] = useState(0);

  return (
    <>
      <div>
        <div
          style={{ pointerEvents: "none" }}
          className="ss-card-label ps-3 ps-lg-0 lg-invisible"
        >
          Locked Mode
        </div>
        <div className="ss-card">
          <div className="ss-subcard-title d-none d-lg-block">
            Locked Mode (Optional)
            {/* <FaLock className="ms-1" size={20} /> */}
          </div>
          <div className="ss-subcard-subtitle mb-3">
            To help preserve financial freedom, use Locked Mode to prevent
            removing any Problem Spending, Banks, or Supporters.
          </div>
          <EnableLockedMode
            numDays={numDays}
            setNumDays={setNumDays}
            continueAction={() => setShowModal(true)}
            className="mt-3"
            lockedMode={props.lockedMode}
          />
        </div>
      </div>
      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        numDays={numDays}
      />
    </>
  );
}
