import { BankItem } from "shared";

export default function BankInfoButtonUnlocked(props: { bank: BankItem }) {
  return (
    <div className="clickable hover-bg-hover">
      <div className="hover-bg-highlight">{props.bank.name}</div>
      <small style={{ color: "gray" }}>
        {props.bank.accountNames.map(
          (name, i) =>
            name + (i !== props.bank.accountNames.length - 1 ? ", " : "")
        )}
      </small>
    </div>
  );
}
