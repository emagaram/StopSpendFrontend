import classnames from "classnames";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import AppLinks from "./AppLinks";
import MobileLinks from "./MobileLinks";

export default function NavigationApp() {
  const router = useRouter();
  const isKeyboardOpen = useDetectKeyboardOpen();
  const onVerifyPage = router.pathname === "/verify-email";
  return (
    <div className={classnames("m-0 p-0")}>
      <Navbar
        fixed="top"
        className={classnames({ "d-none d-lg-flex": !onVerifyPage })}
        sticky="top"
        style={{ borderBottom: "1px solid white" }}
        id="navigation"
        expand={onVerifyPage ? "sm" : "lg"}
        variant="dark"
      >
        <Container className="px-lg-5" fluid>
          <AppLinks />
        </Container>
      </Navbar>

      {!isKeyboardOpen && !onVerifyPage && (
        <>
          <Navbar
            fixed="bottom"
            className={classnames("py-2 d-lg-none")}
            style={{ borderBottom: "1px solid white", marginBottom: "-1px" }}
            id="navigation-mobile"
            expand="lg"
            variant="dark"
          >
            <Container className="p-0" fluid>
              <MobileLinks />
            </Container>
          </Navbar>
        </>
      )}
    </div>
  );
}
