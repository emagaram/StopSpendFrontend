import Image from "next/image";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import holdingHands from "../../../../public/holdingHands.png";
import womanThinking2Img from "../../../../public/standingThinking.png";
import togetherImg from "../../../../public/together.png";
import vices from "../../../../public/vices.png";
import { InfoSection } from "../../../../types";
export const homeObj1: InfoSection = {
  Description: () => {
    const router = useRouter();
    return (
      <>
        <Button
          size="lg"
          className="px-4 d-block mx-auto mx-md-0 mt-md-4 mt-xl-3"
          style={{ padding: "0.75em 0" }}
          variant="white"
          onClick={() => router.push("/signup")}
        >
          Try the Beta Test
        </Button>
        <br />
      </>
    );
  },
  topLine: "",
  headline:
    "Make better spending decisions with support from friends and family.",
  id: "Hero",
  Media: (
    <div className="landing-img">
      <Image
        priority
        style={{
          zIndex: 10,
        }}
        width={550}
        height={550}
        objectFit="contain"
        src={togetherImg}
        alt="Friends"
      />
    </div>
  ),
  first: true,
  textColClassName: "order-first",
  textColStyle: { maxWidth: "37.5em" },
  mediaColStyle: { maxWidth: "37.5em" },
};

export const homeObj2: InfoSection = {
  Description: () => {
    const router = useRouter();
    return (
      <p className="fs-5">
        Stop the pain of regretful spending and losing money.
        <br />
        <br />
        <Button
          size="lg"
          className="px-4 d-md-block"
          style={{ padding: "0.75em 0" }}
          onClick={() => router.push("/product")}
        >
          Learn more
        </Button>
      </p>
    );
  },
  topLine: "Shopping, nicotine, gambling, you name it.",
  headline:
    "If you’ve struggled with making healthy spending decisions, it might be time for a change.",
  id: "If-struggle",
  Media: (
    <Image
      className="px-3 pe-lg-5 pb-2"
      width={500}
      height={380}
      objectFit="contain"
      src={vices}
      alt="Financial trouble."
    />
  ),
  textColClassName: "orders-first order-md-last",
  mediaColClassName: "align-self-center",
  textColStyle: { maxWidth: "37.5em" },
  mediaColStyle: { maxWidth: "37.5em" },
};

export const homeObj3: InfoSection = {
  Description: () => {
    const router = useRouter();
    return (
      <p className="fs-5">
        - Would you be <b>less tempted</b> to spend?
        <br />- Would there be <b>more trust </b>around money with loved ones?
        <br />- Would you receive <b>more support</b> and in quicker time?
        <br />
        <br />
        <Button
          size="lg"
          className="d-md-block px-4"
          style={{ padding: "0.75em 0" }}
          onClick={() => router.push("/pricing")}
        >
          Our pricing
        </Button>
      </p>
    );
  },
  topLine: "It's okay to ask for help",
  headline:
    "What if family and friends were alerted whenever you made a bad purchase?",
  id: "what-if-family",
  Media: (
    <Image
      width={500}
      height={500}
      objectFit="contain"
      src={womanThinking2Img}
      alt="Thinking"
    />
  ),
  textColClassName: "order-md-first",
  textColStyle: { maxWidth: "37.5em" },
  mediaColStyle: { maxWidth: "37.5em" },
};

export const homeObj4: InfoSection = {
  Description: () => {
    const router = useRouter();
    return (
      <p className="fs-5">
        Regain financial freedom.
        <br />
        Restore trust with loved ones and yourself.
        <br />
        Block distractions.
        <br />
        Focus on what matters.
        <br />
        <br />
        <Button
          size="lg"
          className="px-4"
          style={{ paddingTop: "0.625em", paddingBottom: "0.625em" }}
          onClick={() => router.push("/signup")}
        >
          Try the Beta Test
        </Button>
      </p>
    );
  },
  topLine: "Introducing StopSpend",
  headline:
    "StopSpend texts up to 3 highly supportive friends and family whenever you break your spending goals.",
  id: "what-if-family",
  Media: (
    <Image
      style={{
        marginTop: "-2.5em",
      }}
      width={500}
      height={500}
      objectFit="contain"
      src={holdingHands}
      alt="Friends"
    />
  ),
  textColStyle: { maxWidth: "37.5em" },
  mediaColStyle: { maxWidth: "37.5em" },
};
