import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import classnames from "classnames";
import { SetupInfoSection } from "../../../../types";
export default function SetupRow(props: SetupInfoSection) {
  const TextColumn = () => {
    return (
      <Col
        className={classnames("d-flex flex-column", {
          // "pe-0": props.mediaStart && !props.topLine,
          //  "ps-0": !props.mediaStart && !props.topLine,
          // "pe-lg-0": props.mediaStart
        })}
      >
        <div style={{ textDecoration: "underline" }}>{props.topLine}</div>
        <div
          className="d-table"
          // A bit hacky
          style={{
            height: props.headline != "Enable Locked Mode" ? "4.5rem" : "0",
          }}
        >
          <h2 className="fs-2 d-table-cell align-middle">{props.headline}</h2>
        </div>
        <br />
        <p
          className={classnames("shifted-text-setup", {
            "m-lg-0 w-lg-100": props.number,
            "m-0 w-100": !props.number,
          })}
        >
          {<props.Description />}
        </p>
        <br />
      </Col>
    );
  };

  const MediaColumn = () => {
    return (
      <Col
        xs={12}
        md={6}
        className={classnames("order-last mx-lg-3", {
          "order-md-first": props.mediaStart,
        })}
      >
        {props.Media}
      </Col>
    );
  };
  const NumberColumn = () => {
    return (
      <Col
        className={classnames("px-1", { "order-md-last": props.mediaStart })}
        xs={"auto"}
      >
        <div
          style={{ width: "2.5em", height: "2.5em", border: "3px solid black" }}
          className={classnames(
            "fs-3 mt-1 rounded-circle d-flex justify-content-center align-items-center"
          )}
        >
          {props.number}
        </div>
      </Col>
    );
  };
  return (
    <Row className="py-5 px-2 mx-auto setup-media justify-content-center">
      {props.number && <NumberColumn />}
      <MediaColumn />
      <TextColumn />
    </Row>
  );
}
