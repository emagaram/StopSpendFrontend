import Image from "next/image";
import { Spinner } from "react-bootstrap";
import { IconContext } from "react-icons";
import logo2 from "../../public/logo2.png";
export default function Loading() {
  return (
    <div className="position-relative" style={{ height: "calc(100vh - 85px)" }}>
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: "calc(50% + 85px)",
          msTransform: " translateY(-50%)",
          transform: "translateY(-50%)",
          width: "100%",
          color: "green",
          flexDirection: "column",
        }}
      >
        <span className="d-flex align-items-center justify-content-center">
          <Image
            priority={true}
            className="pe-1"
            src={logo2}
            alt="Add phone"
            width={60}
            height={60}
            objectFit="contain"
          ></Image>
          <span className="fs-1">StopSpend </span>
        </span>
        <div
          style={{ width: "6rem" }}
          className="d-flex fs-5 text-muted loading"
        >
          Loading
        </div>
      </div>
    </div>
  );
}
