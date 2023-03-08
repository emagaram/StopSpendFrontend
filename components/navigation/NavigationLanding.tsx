import classnames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import LandingLinks from "./LandingLinks";

interface NavigationLandingProps {
  isLoggedIn: boolean;
}

export default function NavigationLanding(props: NavigationLandingProps) {
  const router = useRouter();
  useEffect(() => {
    setExpanded(false);
  }, [router.pathname]);
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={classnames("m-0 p-0")}>
      <Navbar
        fixed="top"
        expanded={expanded}
        sticky="top"
        style={{ borderBottom: "1px solid white" }}
        id="navigation"
        expand="lg"
        variant="dark"
      >
        <Container className="px-lg-5" fluid>
          <LandingLinks
            setExpanded={setExpanded}
            isLoggedIn={props.isLoggedIn}
          />
        </Container>
      </Navbar>
    </div>
  );
}
