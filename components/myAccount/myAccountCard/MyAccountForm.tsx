import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../../contexts/AuthContext";
import useDeviceDetect from "../../../utils/useDeviceDetect";
import LoadingButton from "../../shared/LoadingButton";
import {
  updateContactOnSpending,
  updateReceiveEmailMarketing,
  updateTimezone,
} from "../MyAccountAPI";
import ChangeEmailModal from "./changeEmail/ChangeEmailModal";
import ChangeLabelButton from "./ChangeLabelButton";
import ChangePasswordModal from "./changePassword/ChangePasswordModal";
import Name from "./name/Name";
import Phone from "./phone/Phone";
import TimezoneSelect from "./TimezoneSelect";
export default function MyAccountForm(props: {
  firstName: string;
  timezone: string;
  phone: string;
  setFirstName: (s: string) => void;
  contactOnSpending: boolean;
  receiveEmailMarketing: boolean;
}) {
  const { currentUser, logout, unlinkProvider, linkWithGoogle } = useAuth();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  if (!currentUser) throw new Error("User not authenticated");
  const providerIds = ["google.com", "apple.com"];
  const userProviderIds = currentUser.providerData.map((a) => a.providerId);
  const { isMobile } = useDeviceDetect();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label className="mb-0">
          Name
          {/* <span  className="text-muted">
            ...used in texts to friends and family
          </span>{" "} */}
        </Form.Label>
        <div>
          <Name setFirstName={props.setFirstName} firstName={props.firstName} />
        </div>
      </Form.Group>
      <Form.Group className="mb-2" controlId="formBasicPhone">
        <Form.Label className="mb-0 ">
          Phone Number
          {/* <span className="text-muted">
            <span>... if you want to be notified when we text friends and family.</span>
          </span> */}
        </Form.Label>
        <div>
          <Phone phone={props.phone} />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTextMeCheckbox">
        <Form.Check
          disabled={props.phone === ""}
          checked={props.contactOnSpending}
          className="ms-1 mt-2 user-select-none"
          type="checkbox"
          label="Text me whenever StopSpend alerts friends and family. "
          onChange={async (e) =>
            await updateContactOnSpending(
              !props.contactOnSpending,
              currentUser.uid
            )
          }
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="mb-0">Timezone</Form.Label>
        <TimezoneSelect
          tz={props.timezone}
          setTz={async (tz) => {
            await updateTimezone((tz.valueOf() as any).value, currentUser.uid);
          }}
        />
      </Form.Group>
      <hr />
      <Form.Group className="mb-2" controlId="emailBasicCheckbox">
        <Form.Label className="mb-0">Email</Form.Label>
        <ChangeLabelButton
          changeLabel="Change Email"
          label={currentUser.email || ""}
          onClick={() => setShowEmailModal(true)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formMarketingCheckbox">
        <Form.Check
          disabled={false}
          checked={props.receiveEmailMarketing}
          className="ms-1 mt-1 user-select-none"
          type="checkbox"
          label="I am happy to receive marketing communications via e-mail."
          onChange={async (e) =>
            await updateReceiveEmailMarketing(
              !props.receiveEmailMarketing,
              currentUser.uid
            )
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="mb-0">Password</Form.Label>
        <ChangeLabelButton
          changeLabel="Change Password"
          label="************"
          onClick={() => setShowPasswordModal(true)}
        />
      </Form.Group>
      <Button onClick={logout} className="w-100 d-lg-none rounded-button">
        Logout
      </Button>
      <hr />
      <Form.Group className="mb-4" controlId="socialSignIn">
        <Form.Label className="mb-0">Connected Accounts</Form.Label>
        <small className="d-block text-muted mb-2">
          Login to StopSpend with your Google Account
        </small>
        {currentUser.providerData
          .filter((provider) => providerIds.includes(provider.providerId))
          .map((provider) => {
            return (
              <div key={provider.providerId} className="mb-2">
                <span className="d-flex align-items-center">
                  <b>{provider.email}</b>
                </span>
              </div>
            );
          })}
        <LoadingButton
          loading={isGoogleLoading}
          onClick={async () => {
            try {
              if (userProviderIds.includes("google.com")) {
                setIsGoogleLoading(true);
                await unlinkProvider(currentUser, "google.com");
              } else {
                await linkWithGoogle(isMobile);
              }
            } catch (e) {
              console.error(e);
            } finally {
              setIsGoogleLoading(false);
            }
          }}
          className="w-100"
          variant="light-gray"
        >
          <span className="d-inline-flex align-items-center justify-content-center">
            <FcGoogle />
            <span className="ms-1">
              {userProviderIds.includes("google.com")
                ? "Disconnect Google"
                : "Log in with Google"}
            </span>
          </span>
        </LoadingButton>
      </Form.Group>
      {/* <span
        style={{ color: "darkred" }}
        className="clickable hover-bg-highlight hover-bg"
      >
        Delete Account
      </span> */}
      <ChangeEmailModal
        show={showEmailModal}
        onClose={() => setShowEmailModal(false)}
      />
      <ChangePasswordModal
        show={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}
