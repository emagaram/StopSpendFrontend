import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { animated, useSpring } from "react-spring";
import { COLORS } from "../../../pages/_app";
import BanksMiniScreen from "../../landing/product/GetSetup/MiniScreenCard/BanksMiniScreen";
import ProgressCircles from "./ProgressCircles";

export function BanksContent(props: { confirmAction: () => void }) {
  const [currentDot, setCurrentDot] = useState(1);
  useEffect(() => {
    setCurrentDot(2);
  }, []);
  const styles = useSpring({
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
    config: { duration: 600 },
  });

  return (
    <Modal.Body
      style={{ color: "white", background: COLORS.primary, height: "670px" }}
      className="p-4 p-sm-5 welcome-modal-content justify-content-end"
    >
      <animated.div style={styles} className="">
        <BanksMiniScreen className="w-100 mb-5" />
        <div className="fs-3 mb-3 text-center fw-bold">
          Connect banks to track spending
        </div>
        <div className="fs-6 mb-4 fw-lighter spx-3">
          To view and analyze your transactions, StopSpend uses{" "}
          <b>
            <a
              target="_blank"
              style={{ whiteSpace: "nowrap", color: "white" }}
              href="https://plaid.com"
              rel="noreferrer"
            >
              Plaid
            </a>
          </b>{" "}
          to connect your bank account.{" "}
          {/* <b>
            <a
              target="_blank"
              style={{ color: "white", whiteSpace: "nowrap" }}
              href="https://identitytheft.org/faqs/is-plaid-safe/"
              rel="noreferrer"
            >
              Is Plaid safe?
            </a>
          </b> */}
        </div>
      </animated.div>
      <div className="d-flex flex-column">
        <ProgressCircles
          className="mb-5 mt-2"
          style={{ width: "7.5em" }}
          numSteps={3}
          current={currentDot}
        />
        <Button variant="outline-white" size="lg" onClick={props.confirmAction}>
          Next
        </Button>
      </div>
    </Modal.Body>
  );
}
