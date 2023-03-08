import MyAccountForm from "./MyAccountForm";

export default function MyAccountCard(props: {
  firstName: string;
  timezone: string;
  phone: string;
  setFirstName: (s: string) => void;
  contactOnSpending: boolean;
  receiveEmailMarketing: boolean;
}) {
  return (
    <div style={{ zIndex: "5" }}>
      <div style={{ zIndex: "5" }} className="ss-card-label ps-3 ps-lg-0">
        My Account
      </div>
      <div className="ss-card">
        <MyAccountForm {...props} />
      </div>
    </div>
  );
}
