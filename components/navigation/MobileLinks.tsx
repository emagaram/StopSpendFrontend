import Link from "next/link";
import { useRouter } from "next/router";
import { Nav } from "react-bootstrap";
import {
  BsCreditCard,
  BsCreditCardFill,
  BsPerson,
  BsPersonFill,
  BsPhoneVibrate,
  BsPhoneVibrateFill,
} from "react-icons/bs";
export default function MobileLinks() {
  const router = useRouter();
  return (
    <>
      <Nav activeKey="" className="flex-row justify-content-around w-100">
        <Link href="/recent-activity" passHref>
          <Nav.Link>
            <MobileLink
              SelectIcon={() => <BsCreditCardFill color="white" size={25} />}
              Icon={() => <BsCreditCard color="white" size={25} />}
              selected={router.pathname === "/recent-activity"}
              text={"Activity"}
            />
          </Nav.Link>
        </Link>
        <Link href="/my-setup" passHref>
          <Nav.Link>
            <MobileLink
              SelectIcon={() => <BsPhoneVibrateFill color="white" size={25} />}
              Icon={() => <BsPhoneVibrate color="white" size={25} />}
              selected={router.pathname === "/my-setup"}
              text={"My Setup"}
            />
          </Nav.Link>
        </Link>
        {/* <Link href="/my-account">
                <Nav.Link><MobileLink Icon={() => <AiOutlineUnlock color="white" size={25} />} SelectIcon={() => <AiFillUnlock color="white" size={25} />} text={"Mode"} selected={location.pathname == "/my-s"} /></Nav.Link>
            </Link>                 */}
        <Link href="/my-account" passHref>
          <Nav.Link>
            <MobileLink
              Icon={() => <BsPerson color="white" size={25} />}
              SelectIcon={() => <BsPersonFill color="white" size={25} />}
              text={"Account"}
              selected={router.pathname === "/my-account"}
            />
          </Nav.Link>
        </Link>
      </Nav>
    </>
  );
}

function MobileLink(props: {
  Icon: React.FC;
  selected: boolean;
  SelectIcon: React.FC;
  text: string;
}) {
  const Icon = props.Icon;
  const SelectIcon = props.SelectIcon;
  return (
    <div
      style={{ width: "25vw" }}
      className="h-100 text-center d-flex flex-column align-items-center"
    >
      {props.selected ? <SelectIcon /> : <Icon />}
      <small style={{ fontSize: "0.813em", color: "white" }}>
        {props.text}
      </small>
    </div>
  );
}
