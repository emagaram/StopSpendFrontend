import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import dogOutletImg from "../../public/dogOutlet.png";
export default function InvalidInvite() {
  return (
    <div className="position-relative" style={{ height: "calc(100vh - 85px)" }}>
      <div
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          top: "calc(50% + 85px)",
          msTransform: " translateY(-50%)",
          transform: "translateY(-50%)",
          width: "100%",
          color: "gray",
          padding: "3.125em",
        }}
      >
        <Image
          src={dogOutletImg}
          width={450}
          height={450}
          objectFit="contain"
          alt={"Invalid invite link"}
        />
        <div>
          This invite link is invalid or expired, please ask your friend for a
          new one.
        </div>
        <Link href="/home">
          <Button className="rounded-button mt-3">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
