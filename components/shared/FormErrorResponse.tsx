export default function FormErrorResponse(props: {
  message: string;
  display: boolean;
}) {
  return (
    <>
      {props.display && (
        <div
          className="fs-6 my-2 p-4"
          style={{
            color: "white",
            borderRadius: "5px",
            fontWeight: "400",
            background: "#a42e18",
          }}
        >
          {props.message}
        </div>
      )}
    </>
  );
}
