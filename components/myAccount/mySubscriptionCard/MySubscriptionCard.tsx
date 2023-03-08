import Link from "next/link";

export default function MySubscriptionCard() {
  return (
    <>
      <div className="ss-card-label ps-3 ps-lg-0">My Subscription</div>
      <div className="ss-card">
        <div>
          <div className="fs-5">Free Trial</div>
          <Link href="/pricing">
            <span className="add-button text-decoration-underline">
              View Pricing
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
