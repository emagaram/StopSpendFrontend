import Image from "next/image";
import { Modal } from "react-bootstrap";
import passwordChangeImg from "../../../../public/passwordChange.png";
export default function SuccessContent() {
  return (
    <>
      <Modal.Header closeButton className="px-4">
        <Modal.Title className="ms-auto" id="contained-modal-title-vcenter">
          Password Updated
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4">
        <div className="d-flex flex-column">
          <Image
            style={{
              alignSelf: "center",
            }}
            width={250}
            height={250}
            objectFit="contain"
            src={passwordChangeImg}
            alt="Change password"
          />
          <div className="text-center">
            Your password has successfully been updated!
          </div>
        </div>
      </Modal.Body>
    </>
  );
}
