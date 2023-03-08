import classnames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { MdFeedback } from "react-icons/md";
import onClientNext from "../../utils/onClientNext";
import { landingPages, landingPagesPublicOnly } from "../../utils/routesInfo";
import FeedbackModal from "./FeedbackModal";
export default function FeedbackButton(props: { className?: string }) {
  const [showModal, setShowModal] = useState(false);
  const { asPath } = useRouter();
  const [firstPath, setFirstPath] = useState("home");
  useEffect(() => {
    setFirstPath(asPath.split("/")[1]);
  }, [asPath]);
  const maybeRaiseButton = !landingPages
    .concat(landingPagesPublicOnly)
    .concat("verify-email")
    .includes(firstPath);
  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        style={{
          bottom: "15px",
          right: "15px",
          width: "65px",
          height: "65px",
          color: "white",
          zIndex: 1000,
        }}
        className={classnames(
          {
            "raise-feedback": maybeRaiseButton,
          },
          "flex-column shadow cursor-pointer text-center position-fixed rounded-circle bgc-primary d-flex align-items-center justify-content-center",
          props.className
        )}
      >
        <IconContext.Provider value={{ size: "28px" }}>
          <MdFeedback />
        </IconContext.Provider>
      </div>
      <FeedbackModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
