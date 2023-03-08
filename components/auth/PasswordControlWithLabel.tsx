import { useState } from "react";
import Form from "react-bootstrap/Form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function PasswordControlWithLabel(props: {
  password: string;
  setPassword: (s: string) => void;
  label?: string;
  placeholder?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form.Group>
      <Form.Label>{props.label ? props.label : "Password"}</Form.Label>
      <Form.Label
        onClick={(e) => {
          setShowPassword(!showPassword);
          e.preventDefault();
        }}
        className="add-button float-end fw-bold"
      >
        {showPassword ? (
          <span>
            <BsEyeSlashFill /> Hide
          </span>
        ) : (
          <span>
            <BsEyeFill /> Show
          </span>
        )}{" "}
      </Form.Label>
      <Form.Control
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
        size="lg"
        type={showPassword ? "text" : "password"}
        placeholder={props.placeholder ? props.placeholder : "Password"}
      />
    </Form.Group>
  );
}
