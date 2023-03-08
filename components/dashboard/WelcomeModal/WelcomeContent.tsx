import Image from "next/image";
import { Button, Modal } from "react-bootstrap";
import welcomeSavingsImage from "../../../public/welcomeSavings.png";
export function WelcomeContent(props: { confirmAction: () => void }) {
  return (
    <Modal.Body
      style={{ background: "white", height: "620px" }}
      className="welcome-modal-content justify-content-end"
    >
      <Image
        priority
        width={550}
        height={550}
        src={welcomeSavingsImage}
        alt="Welcome"
      />
      <div className="fs-3 fw-bold text-center">Welcome to StopSpend</div>
      <div className="fs-6 text-muted mb-4 text-center">
        Let’s create financial accountability
      </div>
      <Button size="lg" onClick={props.confirmAction}>
        Get Started
      </Button>
    </Modal.Body>
  );
}
