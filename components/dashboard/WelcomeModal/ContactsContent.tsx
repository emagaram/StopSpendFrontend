import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { animated, useSpring } from "react-spring";
import { COLORS } from "../../../pages/_app";
import FriendsAndFamilyMiniScreen from "../../landing/product/GetSetup/MiniScreenCard/FriendsAndFamilyMiniScreen";
import ProgressCircles from "./ProgressCircles";

export default function ContactsContent(props: { confirmAction: () => void }) {
  const [currentDot, setCurrentDot] = useState(2);

  useEffect(() => {
    setCurrentDot(3);
  }, []);

  const styles = useSpring({
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <Modal.Body
      style={{ color: "white", background: COLORS.primary, height: "670px" }}
      className="p-4 p-sm-5 fade-in welcome-modal-content justify-content-end"
    >
      <animated.div style={styles}>
        <FriendsAndFamilyMiniScreen
          style={{ color: "black" }}
          className="w-100 mb-5"
        />
        <div className="fs-3 mb-3 text-center fw-bold">
          List up to 3 Supporters
        </div>
        <div className="fs-6 mb-4 fw-lighter spx-3">
          The friends and family who will be texted whenever you break your
          limits or make progress on your goals.
        </div>
      </animated.div>
      <div className="d-flex flex-column">
        <ProgressCircles
          className="mb-5"
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
