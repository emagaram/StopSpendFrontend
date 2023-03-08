import { CSSProperties, ReactNode } from "react";

export default function MiniScreenCard(props: {
  Contents: ReactNode;
  header: string;
  style?: CSSProperties;
  className?: string;
  headerStyle?: CSSProperties;
}) {
  return (
    <div
      style={{
        borderRadius: "25px",
        boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, .2)",
        background: "white",
        ...props.style,
      }}
      className={props.className}
    >
      <div
        style={{
          background: "#9cbd9a",
          borderRadius: "25px 25px 0 0",
          color: "white",
          ...props.headerStyle,
        }}
        className="text-center px-3 py-2 fs-4"
      >
        {props.header}
      </div>
      <div className="p-4">{props.Contents}</div>
    </div>
  );
}
