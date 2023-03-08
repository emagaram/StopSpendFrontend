import classnames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { useAuth } from "../../contexts/AuthContext";
import { landingPages, landingPagesPublicOnly } from "../../utils/routesInfo";
import AppLinks from "./AppLinks";
import LandingLinks from "./LandingLinks";
import MobileLinks from "./MobileLinks";
interface NavigationProps {
  isLoggedIn: boolean;
}

// This component is currently unused
export default function Navigation(props: NavigationProps) {
  const { isLoggedIn, currentUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    setExpanded(false);
  }, [router.pathname]);

  const firstPath = router.pathname.split("/")[1];
  const shouldUseLandingLinks =
    props.isLoggedIn === false ||
    !firstPath ||
    landingPages.includes(firstPath) ||
    (landingPagesPublicOnly.includes(firstPath) && !isLoggedIn);
  const isKeyboardOpen = useDetectKeyboardOpen();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={classnames("m-0 p-0")}>
      <Navbar
        fixed="top"
        expanded={expanded}
        className={classnames({
          "d-none d-lg-flex": currentUser && !shouldUseLandingLinks,
        })}
        sticky="top"
        style={{ borderBottom: "1px solid white" }}
        id="navigation"
        expand="lg"
        variant="dark"
      >
        <Container className="px-lg-5" fluid>
          {shouldUseLandingLinks ? (
            <LandingLinks
              setExpanded={setExpanded}
              isLoggedIn={isLoggedIn || props.isLoggedIn}
            />
          ) : (
            <AppLinks />
          )}
        </Container>
      </Navbar>

      {currentUser && !shouldUseLandingLinks && !isKeyboardOpen && (
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
