import { useRouter } from "next/router";
import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import NavLink from "../navigation/NavLink";
import NavBrandLink from "./NavBrandLink";

const LandingLinks = (props: {
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
}) => {
  const router = useRouter();
  return (
    <>
      <NavBrandLink href={props.isLoggedIn ? "/home" : "/"} />
      <Navbar.Toggle
        onClick={() => props.setExpanded((value) => !value)}
        aria-controls="responsive-navbar-nav"
      />
      <Navbar.Collapse color="green" id="responsive-navbar-nav">
        <Nav>
          <NavLink href="/product" passHref>
            {/*Pathname includes in case of edge function private rewrite*/}
            <Nav.Link active={router.pathname.includes("/product")}>
              Product
            </Nav.Link>
          </NavLink>
          <NavLink href="/pricing" passHref>
            <Nav.Link active={router.pathname.includes("/pricing")}>
              Pricing
            </Nav.Link>
          </NavLink>
        </Nav>
        <div className="ms-lg-auto d-lg-flex">
          {props.isLoggedIn ? (
            <NavLink href="/my-setup" passHref>
              <Nav.Link>
                <Button
                  className="my-1 my-lg-0"
                  style={{ paddingTop: "0.625em", paddingBottom: "0.625em" }}
                  variant="outline-white"
                >
                  Open StopSpend
                </Button>
              </Nav.Link>
            </NavLink>
          ) : (
            <>
              <NavLink href="/login" passHref>
                <Nav.Link className="me-lg-3 d-none d-lg-block">
                  <Button
                    style={{ paddingTop: "0.625em", paddingBottom: "0.625em" }}
                    variant="outline-white"
                  >
                    Login
                  </Button>
                </Nav.Link>
              </NavLink>
              <NavLink href="/login" passHref>
                <Nav.Link
                  active={router.pathname.includes("/login")}
                  style={{ color: "white" }}
                  className="my-2 p-0 me-lg-3 d-lg-none"
                >
                  Login
                </Nav.Link>
              </NavLink>
              <NavLink href="/signup" passHref>
                <Nav.Link>
                  <Button
                    className="my-2 my-lg-0"
                    style={{ paddingTop: "0.625em", paddingBottom: "0.625em" }}
                    variant="white"
                  >
                    Try the Beta Test
                  </Button>
                </Nav.Link>
              </NavLink>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </>
  );
};

export default LandingLinks;
