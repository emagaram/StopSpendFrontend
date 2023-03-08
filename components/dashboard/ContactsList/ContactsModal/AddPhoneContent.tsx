import Image from "next/image";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import standingNextToPhoneImg from "../../../../public/standingNextToPhone.png";
import LoadingButton from "../../../shared/LoadingButton";
import PhoneFormInput from "../ContactsFormRow/PhoneInput/PhoneFormInputUnlocked";
export default function AddPhoneContent(props: {
  userName: string;
  onSubmit: (s: string) => Promise<void>;
  onSkip: () => Promise<void>;
  onBack: () => void;
}) {
  const [phone, setPhone] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const isValidPhone = phone !== undefined && isPossiblePhoneNumber(phone);

  const onSubmit = () => {
    if (isValidPhone) {
      props.onSubmit(phone);
    }
  };
  return (
    <Modal.Body className="px-3 px-sm-5 py-5 d-flex flex-column">
      <Image
        src={standingNextToPhoneImg}
        alt="Add phone"
        width={300}
        height={400}
        objectFit="contain"
      ></Image>
      <div>
        <b>(Recommended)</b> Add your phone number below to be notified whenever
        we alert your Supporters. We'll also inform you when you're hitting your
        goals!
      </div>
      <Form.Group className="mt-3">
        <Form.Label className="mb-1">
          <b>Phone Number</b> <span className="text-muted">Optional</span>
        </Form.Label>
        <PhoneFormInput phone={phone} submit={onSubmit} setPhone={setPhone} />
      </Form.Group>
      <div className="d-flex mt-4 align-items-center justify-content-end">
        <span
          className="me-2 hover-bg hover-bg-highlight add-button"
          onClick={props.onSkip}
        >
          Skip for now
        </span>
        <LoadingButton
          loading={loading}
          disabled={!isValidPhone}
          onClick={async () => {
            setLoading(true);
            props.onSubmit(phone!);
          }}
          variant="primary"
          className=""
        >
          Add phone
        </LoadingButton>
      </div>
    </Modal.Body>
  );
}
