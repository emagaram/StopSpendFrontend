import { DefaultSeoProps } from "next-seo";
import hhi from "../public/holdingHands.png";

const desc160 =
  "StopSpend texts up to 3 supportive friends and family whenever you break your spending goals. Regain financial freedom. Restore trust. Focus on what matters.";

export const NextSeoDefault: DefaultSeoProps = {
  titleTemplate: "StopSpend - %s",
  title: "Make Better Financial Decisions",
  description: desc160,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.stopspend.com/",
    site_name: "StopSpend",
    title: "StopSpend - Make Better Financial Decisions",
    description: desc160,
    images: [
      {
        url: hhi.src,
        width: 500,
        height: 500,
      },
    ],
  },
};

export default NextSeoDefault;
