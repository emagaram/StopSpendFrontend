import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useAuth } from "../../../contexts/AuthContext";

export default function ChangeLabelButton(props: {
  label: string;
  changeLabel: string;
  onClick: () => void;
}) {
  return (
    <Container fluid className="p-0">
      <Row>
        <Col xs="auto">
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            className="text-muted"
          >
            {props.label}
          </div>
        </Col>
        <Col xs="auto">
          <div
            onClick={props.onClick}
            className="fw-bold clickable hover-bg hover-bg-highlight"
          >
            {props.changeLabel}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
