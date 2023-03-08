import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "react-bootstrap/Button";
import robotImg from "../public/404bot.png";
export default function PageNotFoundPage() {
  return (
    <main
      style={{ marginTop: "18.75em" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Head>
        <title>StopSpend - 404 Error</title>
      </Head>
      <Image
        src={robotImg}
        priority
        objectFit="contain"
        width={450}
        height={450}
        alt="404 robot"
      />
      <Link href="/">
        <Button size="lg" href="/" className="mx-auto rounded-button">
          Return home
        </Button>
      </Link>
    </main>
  );
}
