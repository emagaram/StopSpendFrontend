import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { animated, useSpring } from "react-spring";
import { COLORS } from "../../../pages/_app";
import TransactionsToAvoid from "../../landing/product/GetSetup/MiniScreenCard/TransactionsToAvoidMiniScreen";
import ProgressCircles from "./ProgressCircles";

export function TransactionsContent(props: { confirmAction: () => void }) {
  const stylesBg = useSpring({
    to: [{ background: COLORS.primary }],
    from: { background: COLORS.primary },
    config: { duration: 300 },
  });
  const opacityStyles = useSpring({
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
    config: { duration: 600 },
  });

  const [currentDot, setCurrentDot] = useState(1);
  useEffect(() => {
    setCurrentDot(1);
  }, []);
  return (
    <animated.div style={stylesBg}>
      <Modal.Body
        className="welcome-modal-content p-4 p-sm-5 justify-content-end"
        style={{ color: "white", height: "670px" }}
      >
        <animated.div className="mb-4" style={opacityStyles}>
          <TransactionsToAvoid hideGambling className="w-100 mb-5" />
          {/* <img style={{ width: "min(350px, 100%)", objectFit: "contain", height: "auto" }} src={"/mailSent.png"} /> */}

          <div className="fs-3 mb-3 text-center fw-bold">
            Set spending limits
          </div>
          <div className="fs-6 fw-lighter spx-3">
            Limits reset on a weekly or monthly basis. StopSpend only sends text
            alerts <b>the first time</b> you break a limit.
          </div>
        </animated.div>
        <div className="d-flex flex-column">
          <ProgressCircles
            className="mb-5 mt-2"
            style={{ width: "7.5em" }}
            numSteps={3}
            current={currentDot}
          />
          <Button
            variant="outline-white"
            size="lg"
            onClick={props.confirmAction}
          >
            Next
          </Button>
        </div>
      </Modal.Body>
    </animated.div>
  );
}
