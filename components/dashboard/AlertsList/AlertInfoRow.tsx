import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Alert, AmountSpent } from "shared";
import useDeviceDetect from "../../../utils/useDeviceDetect";
import AlertInfoButton from "./AlertInfoButton";
export default function AlertInfoRow(props: {
  row: Alert;
  alertAmountSpent: AmountSpent;
  disabled: boolean;
  editAlert: () => void;
  removeAlert: () => void;
  className?: string;
}) {
  const { isMobile } = useDeviceDetect();

  return (
    <>
      <Row
        onClick={!isMobile ? props.editAlert : () => {}}
        className={"align-items-center hover-bg" + props.className}
      >
        <Col>
          <AlertInfoButton
            alert={props.row}
            alertAmountSpent={props.alertAmountSpent}
            disabled={props.disabled}
            editAction={props.editAlert}
          />
        </Col>
        {/* <Col style={{}} xs="auto">
          <EditButtons
            canClick={props.editStatus !== EditStatus.cantEdit}
            editAction={props.editAlert}
            garbageAction={props.removeAlert}
          />
          {props.row.spendingLimit > 0 &&
            `$${props.row.amountSpent}/${props.row.spendingLimit} limit`}
        </Col> */}
      </Row>
      {/* <Row className={"d-none d-md-flex align-items-center " + props.className}>
        <Col>
          <AlertInfo
            alert={props.row}
            disabled={props.editStatus === EditStatus.cantEdit}
          />
        </Col>
        <Col style={{}} xs="auto">
          <EditButtons
            canClick={props.editStatus !== EditStatus.cantEdit}
            editAction={props.editAlert}
            garbageAction={props.removeAlert}
          />
        </Col>
      </Row> */}
    </>
  );
}
