import classnames from "classnames";
import { useRouter } from "next/router";
import { Button, Nav, Navbar, Stack } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import NavBrandLink from "./NavBrandLink";
import NavLink from "./NavLink";
const AppLinks = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const onVerifyPage = router.pathname === "/verify-email";
  return (
    <>
      <NavBrandLink href="/my-setup" />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {!onVerifyPage && (
          // <Nav className="me-auto">
          <Stack gap={3} direction="horizontal" className="me-auto">
            <NavLink href="/my-setup" passHref>
              <Nav.Link active={router.pathname.includes("/my-setup")}>
                My Setup
              </Nav.Link>
            </NavLink>
            <NavLink href="/recent-activity" passHref>
              <Nav.Link active={router.pathname.includes("/recent-activity")}>
                Recent Activity
              </Nav.Link>
            </NavLink>
            <NavLink className={"me-auto"} href="/my-account" passHref>
              <Nav.Link active={router.pathname.includes("/my-account")}>
                My Account
              </Nav.Link>
            </NavLink>
          </Stack>
          // </Nav>
        )}
        <div className={classnames({ "ms-auto": onVerifyPage })}>
          <NavLink href="/" passHref>
            <Nav.Link className="py-0 my-2">
              <Button
                onClick={async () => {
                  await logout();
                }}
                style={{ paddingTop: "0.625em", paddingBottom: "0.625em" }}
                variant="outline-white"
              >
                Logout
              </Button>
            </Nav.Link>
          </NavLink>
        </div>
      </Navbar.Collapse>
    </>
  );
};

export default AppLinks;
