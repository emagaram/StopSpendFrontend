import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BsCheck, BsX } from "react-icons/bs";
import LoadingButton from "../shared/LoadingButton";

export default function ConfirmButtons(props: {
  canSubmit: boolean;
  confirmAction: () => void;
  cancelAction: () => void;
  deletable: boolean;
  loadingConfirm?: boolean;
  loadingDelete?: boolean;
  deleteAction?: () => void;
  lockedMode?: boolean;
}) {
  return (
    <Row className="g-2">
      <Col xs={12} sm={"auto"}>
        <LoadingButton
          loading={props.loadingConfirm}
          className="w-100"
          disabled={!props.canSubmit}
          onClick={props.confirmAction}
        >
          Confirm
          <BsCheck />
        </LoadingButton>
      </Col>
      <Col xs={props.deletable && !props.lockedMode ? 6 : 12} sm={"auto"}>
        <Button
          className="w-100"
          variant="outline-primary"
          onClick={props.cancelAction}
        >
          Cancel
          <BsX />
        </Button>
      </Col>

      {props.deletable && !props.lockedMode && (
        <Col xs={6} sm={"auto"} className="ms-sm-auto">
          <LoadingButton
            loading={props.loadingDelete}
            className="w-100"
            variant="outline-danger"
            onClick={props.deleteAction}
          >
            Delete
          </LoadingButton>
        </Col>
      )}
    </Row>
  );
}
