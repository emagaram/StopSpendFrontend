import classnames from "classnames";
import Link from "next/link";
import { HTMLAttributes, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { TextMessage } from "shared";
import { useAuth } from "../../contexts/AuthContext";
import { getActivityItems } from "../recentActivity/RecentActivityAPI";
import RecentActivityList from "../recentActivity/RecentActivityList";
export default function RecentMessagesCard(
  props: {
    messages: TextMessage[];
    setMessages: (arr: TextMessage[]) => void;
  } & HTMLAttributes<HTMLDivElement>
) {
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useAuth();
  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      try {
        if (!currentUser) throw Error("User inauthenticated");
        const res = await getActivityItems({
          uid: currentUser.uid,
          limit: 5,
          itemType: "texts",
        });
        if (isSubscribed) {
          props.setMessages(res.items as TextMessage[]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{ ...props.style }}
      className={classnames(
        "pb-lg-0 d-none d-lg-block ss-card",
        props.className
      )}
    >
      <div className="ss-subcard-title">Recent Text Messages</div>
      <div
        style={{ minHeight: props.messages.length === 0 ? "20em" : "0" }}
        className={classnames({
          "d-flex align-items-center pb-5 justify-content-center":
            isLoading || props.messages.length === 0,
        })}
      >
        {isLoading ? (
          <Spinner
            style={{ width: "3.125em", height: "3.125em" }}
            animation="border"
            variant="primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : props.messages.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <RecentActivityList items={props.messages} />
            <div
              style={{
                fontWeight: "600",
                border: "1px solid #dee2e6",
                borderRightWidth: "0",
                borderLeftWidth: "0",
                borderBottomWidth: "0",
              }}
            >
              <Link href="/recent-activity">
                <div className="hover-bg-highlight py-4 primary hover-bg">
                  <span>View All</span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return <div className="text-muted">No Text Messages Sent</div>;
}
