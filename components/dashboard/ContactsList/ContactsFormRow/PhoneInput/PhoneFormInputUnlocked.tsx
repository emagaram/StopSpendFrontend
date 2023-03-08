import cx from "classnames";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "../../../../../styles/PhoneFormInput.module.css";
type PhoneFormInputProps = {
  phone: string | undefined;
  setPhone?: (s: string) => void | undefined;
  onBlur?: () => void | undefined;
  submit: () => void;
};

export default function PhoneFormInput(props: PhoneFormInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <span
      className={"form-control " + (focused ? styles.PhoneInputFocused : "")}
    >
      <PhoneInput
        placeholder={"(123)-456-7890"}
        onBlur={() => {
          setFocused(false);
          if (props.onBlur) {
            props.onBlur();
          }
        }}
        onFocus={() => setFocused(true)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            props.submit();
          }
        }}
        defaultCountry={"US"}
        className={cx(styles.PhoneInput)}
        value={props.phone}
        onChange={(e: string) => {
          if (props.setPhone) {
            props.setPhone(e);
          }
        }}
        autoComplete="zyx"
      />
    </span>
  );
}
