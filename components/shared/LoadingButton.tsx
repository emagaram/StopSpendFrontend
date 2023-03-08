import { Button, ButtonProps, Spinner } from "react-bootstrap";

export default function LoadingButton(
  props: { loading?: boolean } & ButtonProps
) {
  const { loading, ...rest } = props;
  return (
    <Button {...rest} disabled={props.disabled || loading}>
      {props.children}{" "}
      {props.loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
    </Button>
  );
}
