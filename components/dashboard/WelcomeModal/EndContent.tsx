import { Button, Modal } from "react-bootstrap";
import { IconContext } from "react-icons";
import { MdFeedback } from "react-icons/md";
import { animated, useSpring } from "react-spring";
import { COLORS } from "../../../pages/_app";
import FeedbackButton from "../../feedback/FeedbackButton";

export default function EndContent(props: { confirmAction: () => void }) {
  const styles = useSpring({
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <Modal.Body
      style={{ color: "white", background: COLORS.primaryWelcomeModal }}
      className="p-4 p-sm-5 fade-in welcome-modal-content"
    >
      <animated.div style={styles}>
        <div className="fs-3 mb-3 text-center fw-bold">That's It!</div>
        <div className="fs-6 mb-4 fw-lighter spx-3 position-relative">
          If you have any feedback on this beta test,{" "}
          <span className="fw-bold text-nowrap">
            click the
            <IconContext.Provider
              value={{ size: "24px", style: { margin: "4px" } }}
            >
              <MdFeedback />
            </IconContext.Provider>{" "}
          </span>
          in the bottom right corner. It is greatly appreciated!
          <br />
          <br />
          Or email us at{" "}
          <a
            style={{ color: "white", fontWeight: "600" }}
            href="mailto:support@stopspend.com"
          >
            support@stopspend.com.
          </a>
        </div>
      </animated.div>
      <div className="d-flex flex-column">
        <Button variant="white" size="lg" onClick={props.confirmAction}>
          Next
        </Button>
      </div>
    </Modal.Body>
  );
}
