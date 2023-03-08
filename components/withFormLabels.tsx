import Form from "react-bootstrap/Form";

export default function ComponentWithLabels(props: {
  name: string;
  error: string;
  children?: JSX.Element;
}) {
  return (
    <>
      <div className="d-flex">
        <Form.Text className="me-auto">{props.name}</Form.Text>
        <Form.Text className="danger"> {props.error}</Form.Text>
      </div>
      {props.children}
    </>
  );
}
