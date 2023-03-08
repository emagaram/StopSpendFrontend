import { updateDoc } from "@firebase/firestore";
import classnames from "classnames";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";

import NavigationApp from "../components/navigation/NavigationApp";
import WithPrivateRoute from "../components/navigation/WithPrivateRoute";
import ListOptions from "../components/recentActivity/ListOptions";
import { getActivityItems } from "../components/recentActivity/RecentActivityAPI";
import RecentActivityCard from "../components/recentActivity/RecentActivityCard";
import { useAuth } from "../contexts/AuthContext";
import { useGlobal } from "../contexts/GlobalContext";
import { ActivityItem, GetActivityItemsRequest } from "../types";
type useActivityItemsType = {
  items: ActivityItem[];
  loading: boolean;
  allItemsLoaded: boolean;
  startAfterPath: string | undefined;
  setItems: (items: ActivityItem[]) => void;
  setLoading: (b: boolean) => void;
  setAllItemsLoaded: (b: boolean) => void;
  setStartAfterPath: (s: string) => void;
};

function useActivityItems(): useActivityItemsType {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);
  const [startAfterPath, setStartAfterPath] = useState<string>();
  return {
    items,
    loading,
    allItemsLoaded,
    startAfterPath,
    setItems,
    setLoading,
    setAllItemsLoaded,
    setStartAfterPath,
  };
}

export default function RecentActivityPage() {
  const texts = useActivityItems();
  const problematicTransactions = useActivityItems();
  const allTransactions = useActivityItems();
  const hooks = useGlobal();

  const [showUnflaggedSpending, setShowUnflaggedSpending] =
    useState<boolean>(false);

  const [showTransactions, setShowTransactions] = useState(false);

  const { currentUser } = useAuth();

  const currentTransactions: useActivityItemsType = showUnflaggedSpending
    ? allTransactions
    : problematicTransactions;

  const transactionLimit = 25;
  const textsLimit = 5;

  const loadMoreItems = async (
    hook: useActivityItemsType,
    limit: number,
    request: GetActivityItemsRequest
  ) => {
    let newData: ActivityItem[] = [];
    try {
      const data = await getActivityItems(request);
      if (data.lastDocPath === "" || data.items.length < limit) {
        hook.setAllItemsLoaded(true);
      }
      newData = Array.prototype.concat(hook.items, data.items);
      hook.setItems(newData);
      hook.setStartAfterPath(data.lastDocPath);
      const promises: Promise<any>[] = [];
      for (const item of data.incorrectItems) {
        promises.push(
          updateDoc(item.ref, {
            isProblematicOrEssential: false,
          })
        );
      }
      await Promise.allSettled(promises);
    } catch (errors) {
      console.error(errors);
    } finally {
      hook.setLoading(false);
      return newData;
    }
  };

  const loadMoreTexts = async () =>
    loadMoreItems(texts, textsLimit, {
      itemType: "texts",
      limit: textsLimit,
      uid: currentUser!.uid,
      startAfterPath: texts.startAfterPath,
    });

  const loadMoreTransactions = () => {
    if (!currentUser) throw new Error("User not authenticated");
    return loadMoreItems(currentTransactions, transactionLimit, {
      startAfterPath: currentTransactions.startAfterPath,
      uid: currentUser.uid,
      itemType: "transactions",
      limit: transactionLimit,
      includeNonProblemSpending: showUnflaggedSpending,
      userCategories: hooks.alerts.map((a) => a.category),
    });
  };

  useEffect(() => {
    let isSubscribed = true;
    if (
      currentTransactions.loading &&
      isSubscribed &&
      currentUser &&
      !hooks.isLoading
    )
      loadMoreTransactions().then((results) =>
        results.length === 0 && !showUnflaggedSpending
          ? setShowUnflaggedSpending(true)
          : null
      );
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showUnflaggedSpending, currentUser, hooks.isLoading]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && currentUser && !hooks.isLoading) {
      let promises: Promise<ActivityItem[]>[] = [
        loadMoreTransactions(),
        loadMoreTexts(),
      ];
      Promise.allSettled(promises).catch((e) => console.log(e));
    }
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, hooks.isLoading]);

  return (
    <WithPrivateRoute>
      <Head>
        <title>StopSpend - Recent Activity</title>
      </Head>
      <NavigationApp />
      <Container
        style={{ marginBottom: "7.5em" }}
        className="below-navbar-app px-4"
      >
        <Row>
          <Col>
            <div className="ss-card-label mb-3">Recent Activity</div>
            <Row className="d-lg-none">
              <Col>
                <Nav className="flex-row nav-pills-recent-activity gap-1">
                  <Nav.Item style={{ flex: 1 }}>
                    <Nav.Link
                      active={!showTransactions}
                      onClick={() => setShowTransactions(false)}
                      eventKey="first"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Text Messages
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item style={{ flex: 1 }}>
                    <Nav.Link
                      active={showTransactions}
                      onClick={() => setShowTransactions(true)}
                      eventKey="second"
                    >
                      Transactions
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col
                className={classnames("d-lg-block", {
                  "d-none": !showTransactions,
                })}
                xs={12}
                lg={8}
              >
                <Row>
                  <Col>
                    <ListOptions
                      setShowUnflaggedSpending={setShowUnflaggedSpending}
                      showUnflaggedSpending={showUnflaggedSpending}
                      showCheck={
                        !currentTransactions.loading &&
                        (allTransactions.items.length > 0 ||
                          problematicTransactions.items.length > 0)
                      }
                    />
                  </Col>
                </Row>
                <RecentActivityCard
                  style={{
                    minHeight:
                      currentTransactions.loading ||
                      currentTransactions.items.length === 0
                        ? "31.25em"
                        : "0",
                  }}
                  loadMoreItems={async () => await loadMoreTransactions()}
                  items={currentTransactions.items}
                  allLoaded={currentTransactions.allItemsLoaded}
                  loading={currentTransactions.loading}
                  emptyText="No Transactions"
                />
              </Col>
              <Col
                className={classnames("d-lg-block", {
                  "d-none": showTransactions,
                })}
                lg={4}
              >
                <h4
                  className="d-none d-lg-block"
                  style={{ color: "gray", fontWeight: "200" }}
                >
                  Text Messages
                </h4>
                <RecentActivityCard
                  style={{
                    minHeight:
                      texts.loading || texts.items.length === 0
                        ? "15.625em"
                        : "0",
                  }}
                  loadMoreItems={async () => await loadMoreTexts()}
                  items={texts.items}
                  allLoaded={texts.allItemsLoaded}
                  loading={texts.loading}
                  emptyText="No Text Messages"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </WithPrivateRoute>
  );
}
