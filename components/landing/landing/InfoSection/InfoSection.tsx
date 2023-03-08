import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import classnames from "classnames";
import { HTMLAttributes } from "react";
import { InfoSection as InfoSectionType } from "../../../../types";
export default function InfoSection(
  props: InfoSectionType & HTMLAttributes<HTMLDivElement>
) {
  //Might run into issues with inner components
  const TextCol = () => {
    return (
      <Col
        className={classnames(props.textColClassName, "my-auto")}
        style={{ ...props.textColStyle }}
        xs={12}
        md={6}
      >
        <div
          className="fs-6"
          style={{
            color: !props.first ? "green" : "darkgreen",
            fontWeight: "600",
          }}
        >
          {props.topLine?.toLocaleUpperCase()}
        </div>
        <h2
          style={{ fontWeight: "600" }}
          // className={classnames({ "fs-1": props.first, "fs-2": !props.first })}
        >
          {props.headline}
        </h2>
        <br />
        {<props.Description />}
      </Col>
    );
  };

  const MediaCol = () => {
    return (
      <Col
        className={classnames(
          props.mediaColClassName,
          "d-flex justify-content-center justify-content-md-start"
        )}
        style={{ ...props.mediaColStyle, zIndex: 3 }}
        xs={12}
        md={6}
      >
        {props.Media}
      </Col>
    );
  };
  return (
    <Row
      className={classnames(
        "justify-content-center text-center text-md-start px-2 px-md-3",
        {
          "py-5": !props.style?.paddingTop && !props.style?.paddingBottom, //SUPER HACKY, for first item
        },
        props.className
      )}
      style={{ ...props.style }}
    >
      <MediaCol />
      <TextCol />
    </Row>
  );
}
