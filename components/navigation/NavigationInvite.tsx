import classnames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavBrandLink from "./NavBrandLink";

export default function NavigationInvite() {
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
          <NavBrandLink href="/" />
        </Container>
      </Navbar>
    </div>
  );
}
