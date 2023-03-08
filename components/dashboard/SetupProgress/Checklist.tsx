import classNames from "classnames";
import { HTMLAttributes } from "react";
import { Stack } from "react-bootstrap";
import { IconContext, IconType } from "react-icons";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

export default function Checklist(props: {
  transactionsToAvoidAdded: boolean;
  banksAdded: boolean;
  contactsAdded: boolean;
}) {
  const allAdded =
    props.transactionsToAvoidAdded && props.banksAdded && props.contactsAdded;
  return (
    <Stack
      className={classNames("flex-column flex-grow-0", {
        "justify-content-center": allAdded,
      })}
    >
      {!allAdded && (
        <>
          <Checkline
            text="Problem Spending"
            completed={props.transactionsToAvoidAdded}
            CompleteIcon={BsCheckCircleFill}
            IncompleteIcon={BsXCircleFill}
          />
          <Checkline
            text="Banks"
            completed={props.banksAdded}
            CompleteIcon={BsCheckCircleFill}
            IncompleteIcon={BsXCircleFill}
          />
          <Checkline
            text="Friends & Family"
            completed={props.contactsAdded}
            CompleteIcon={BsCheckCircleFill}
            IncompleteIcon={BsXCircleFill}
          />
        </>
      )}
      {allAdded && (
        <div className="fw-bold color-primary">
          You're all set! StopSpend is listening for transactions and will
          notify your Supporters if any limits are broken.
        </div>
      )}
    </Stack>
  );
}

function Checkline(props: {
  text: string;
  completed: boolean;
  CompleteIcon: IconType;
  IncompleteIcon: IconType;
}) {
  const ChecklineBuilder = (
    props: {
      text: string;
      Icon: IconType;
      color: string;
    } & HTMLAttributes<HTMLDivElement>
  ) => {
    return (
      <h6 style={{ ...props.style, fontSize: "1.12rem" }} className="mx-0">
        <IconContext.Provider value={{ size: "1.5em" }}>
          <props.Icon color={props.color} />
        </IconContext.Provider>
        <span className="align-middle ms-2">{props.text}</span>
      </h6>
    );
  };

  if (props.completed)
    return (
      <ChecklineBuilder
        text={"Added " + props.text}
        Icon={props.CompleteIcon}
        color="#68a762"
      />
    );
  return (
    <ChecklineBuilder
      text={props.text}
      Icon={props.IncompleteIcon}
      color={"#797979"}
    />
  );
}
