import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Container } from "react-bootstrap";
import NavigationInvite from "../components/navigation/NavigationInvite";
import highFiveImg from "../public/highFive.png";
export interface InviteConfirmedRouterProps {
  mode: "Add" | "Remove";
  userName: string;
}
export default function InviteConfirmed() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>StopSpend - Update Successful</title>
      </Head>
      <NavigationInvite />
      <Container
        style={{ maxWidth: "37.5em", marginTop: "-3em" }}
        className="container-center-below-navbar px-5 justify-content-center d-flex align-items-center flex-column"
      >
        {
          <>
            <Image
              priority
              objectFit="contain"
              width={300}
              height={300}
              src={highFiveImg}
              alt="Friends high five"
            />
            <h2 className="text-center">Thanks for your support!</h2>
            <div className="text-muted text-center">
              We've updated {router.query.userName}'s contact list.
            </div>
            <Link href="/home">
              <Button className="rounded-button mt-3">Return Home</Button>
            </Link>
          </>
        }
      </Container>
    </>
  );
}
