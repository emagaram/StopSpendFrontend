import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Col, Container, Row } from "react-bootstrap";
import laptopWorkingImg from "../../../../public/laptopWorking.png";
import BanksMiniScreen from "./MiniScreenCard/BanksMiniScreen";
import FriendsAndFamilyMiniScreen from "./MiniScreenCard/FriendsAndFamilyMiniScreen";
import LockedModeMiniScreen from "./MiniScreenCard/LockedModeMiniScreen";
import TransactionsToAvoid from "./MiniScreenCard/TransactionsToAvoidMiniScreen";
import SetupRow from "./SetupRow";
export default function GetSetupContainer() {
  const router = useRouter();
  return (
    <>
      <Container fluid className="px-0 below-navbar-landing">
        <Row className="mt-lg-2 mb-4 mx-0">
          <Col>
            <h1
              style={{ fontWeight: "600", lineHeight: "1.6em" }}
              className="fs-1 text-center"
            >
              Get StopSpend setup <br />
              in{" "}
              <mark className="primary bgc-primary-lighten">
                3 simple steps
              </mark>
            </h1>
          </Col>
        </Row>
        <div
          style={{ marginBottom: "-2.5em" }}
          className="d-flex justify-content-center"
        >
          <Image
            priority
            src={laptopWorkingImg}
            alt="Working at desk"
            objectFit="contain"
            width={500}
            height={500}
          />
        </div>
        <Container
          fluid
          className="px-2 px-md-3 px-lg-4 insert-caps"
          style={{
            backgroundColor: "#dbeada",
          }}
        >
          <SetupRow
            Description={() => (
              <>
                Set weekly or monthly limits for specific categories of
                transactions.
              </>
            )}
            Media={<TransactionsToAvoid />}
            headline="List transaction category limits"
            id="Start1"
            mediaStart={true}
            number={1}
          />
          <hr className="setup-media mx-auto" />
          <SetupRow
            Description={() => (
              <span>
                To view and analyze your transactions, StopSpend uses{" "}
                <b>
                  <a
                    target="_blank"
                    style={{ whiteSpace: "nowrap" }}
                    href="https://plaid.com"
                    rel="noreferrer"
                  >
                    Plaid
                  </a>
                </b>{" "}
                to connect your bank account.{" "}
                {/* <b>
                  <a
                    target="_blank"
                    href="https://identitytheft.org/faqs/is-plaid-safe/"
                    style={{ whiteSpace: "nowrap" }}
                    rel="noreferrer"
                  >
                    Is Plaid safe?
                  </a>
                </b> */}
              </span>
            )}
            Media={<BanksMiniScreen />}
            headline="Connect banks to track spending"
            id="Start1"
            mediaStart={false}
            number={2}
          />
          <hr className="setup-media mx-auto" />
          <SetupRow
            Description={() => (
              <>
                The friends and family who will be texted whenever you break
                your limits or make progress on your goals.
              </>
            )}
            Media={<FriendsAndFamilyMiniScreen />}
            headline="List up to 3 Supporters"
            id="Start3"
            mediaStart={true}
            number={3}
          />
          <hr className="setup-media mx-auto" />
          <SetupRow
            Description={() => (
              <>
                Avoid the temptation of removing your limits and lock your
                settings for however long you choose.
              </>
            )}
            Media={<LockedModeMiniScreen />}
            headline="Enable Locked Mode"
            id="StartOptional"
            mediaStart={false}
            topLine="Optional"
          />
        </Container>
      </Container>
      <Row
        className="mx-auto px-5"
        style={{ marginTop: "6.25em", marginBottom: "7.5em" }}
      >
        <Col className="d-flex justify-content-center">
          <Button
            className="d-block mt-3 px-4 fs-3"
            style={{ paddingTop: "0.625em", paddingBottom: "0.625em" }}
            onClick={() => router.push("/signup")}
          >
            Try the Beta Test
          </Button>
        </Col>
      </Row>
    </>
  );
}
