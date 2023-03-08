import MiniScreenCard from "./MiniScreenCard";

import { FaLock } from "react-icons/fa";
export default function LockedModeMiniScreen() {
  return (
    <MiniScreenCard
      Contents={
        <FaLock className="d-block ms-auto me-auto" color="#969696" size={90} />
      }
      header="Locked Mode"
      headerStyle={{ background: "#969696" }}
    />
  );
}
