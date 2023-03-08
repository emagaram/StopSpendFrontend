import classnames from "classnames";
import { HTMLAttributes, useEffect } from "react";
import { BsCheck, BsX } from "react-icons/bs";

export default function PasswordRequirements(
  props: {
    password: string;
    expanded: boolean;
    wasClickedOut: boolean;
    setIsPasswordValid: (b: boolean) => void;
  } & HTMLAttributes<HTMLDivElement>
) {
  const atLeast8 = props.password.length >= 8;

  useEffect(() => {
    props.setIsPasswordValid(atLeast8);
  }, [atLeast8, props, props.password]);
  return (
    <div
      style={{ ...props.style }}
      className={classnames("expand-container", props.className)}
    >
      <div
        className={classnames("expand-contract", {
          "expanded mt-3": props.expanded,
        })}
      >
        <Requirement
          text="8 or more characters"
          met={atLeast8}
          wasClickedOut={props.wasClickedOut}
        ></Requirement>
      </div>
    </div>
  );
}

function Requirement(props: {
  text: string;
  met: boolean;
  wasClickedOut: boolean;
}) {
  return (
    <small
      style={{
        color: props.met ? "green" : props.wasClickedOut ? "red" : "gray",
      }}
    >
      {props.met ? <BsCheck /> : <BsX />} {props.text}
    </small>
  );
}
