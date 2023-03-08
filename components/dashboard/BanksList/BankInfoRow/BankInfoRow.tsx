import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { BankItem } from "shared";
import BankInfoButton from "./BankInfoButton/BankInfoButton";

export default function BankInfoRow(props: {
  selectRow: () => void;
  lockedMode: boolean;
  bank: BankItem;
}) {
  if (props.lockedMode) {
    return (
      <Row style={{ cursor: "default" }} className="py-2 align-items-center">
        <Col xs="auto">
          <BankInfoButton lockedMode={props.lockedMode} bank={props.bank} />
        </Col>
      </Row>
    );
  }
  return (
    <Row onClick={props.selectRow} className="py-2 hover-bg align-items-center">
      <Col>
        <BankInfoButton lockedMode={props.lockedMode} bank={props.bank} />
      </Col>
    </Row>
  );
}
