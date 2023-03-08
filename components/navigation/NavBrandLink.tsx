import Image from "next/image";
import { Navbar } from "react-bootstrap";
import logoImg from "../../public/logo4.png";
import NavLink, { NavLinkProps } from "./NavLink";
export default function NavBrandLink(props: NavLinkProps) {
  return (
    <NavLink {...props} passHref>
      <Navbar.Brand className="d-flex align-items-center gap-1">
        <Image priority height={44} width={44} src={logoImg} alt="logo" />
        <span className="mb-1">StopSpend</span>
      </Navbar.Brand>
    </NavLink>
  );
}
