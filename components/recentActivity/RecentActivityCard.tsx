import { Button, Card, Spinner } from "react-bootstrap";
import RecentActivityList from "./RecentActivityList";
import classnames from "classnames";
import { ActivityItem } from "../../types";
export default function RecentActivityCard(
  props: {
    items: ActivityItem[];
    loadMoreItems: () => void;
    allLoaded: boolean;
    loading: boolean;
    emptyText?: string;
  } & React.HTMLAttributes<HTMLElement>
) {
  function EmptyState() {
    return (
      <div className="text-muted fs-4">
        {" "}
        {props.emptyText ? props.emptyText : "No items"}{" "}
      </div>
    );
  }

  return (
    <>
      <Card className={props.className} style={{ ...props.style }}>
        <Card.Body
          className={classnames("py-0", {
            "d-flex align-items-center justify-content-center py-4":
              props.loading || props.items.length === 0,
          })}
        >
          {props.loading && (
            <Spinner
              style={{ width: "3.125em", height: "3.125em" }}
              animation="border"
              variant="primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}

          {!props.loading && props.items.length > 0 && (
            <RecentActivityList items={props.items} />
          )}
          {props.items.length === 0 && !props.loading && <EmptyState />}
        </Card.Body>
      </Card>
      {!props.allLoaded && props.items.length > 0 && (
        <Button
          variant="outline-primary"
          className="w-50 ms-auto mt-3 mb-4"
          style={{ whiteSpace: "nowrap" }}
          onClick={props.loadMoreItems}
        >
          Load more
        </Button>
      )}
    </>
  );
}
