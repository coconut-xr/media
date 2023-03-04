import React, { Suspense } from "react";
import Head from "next/head";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import icon from "../public/icon.svg";
import { MediaDevices } from "../components/media-devices";
import dynamic from "next/dynamic";

const NoSSRMediaDevices = dynamic(() => Promise.resolve(MediaDevices), { ssr: false });

export default function Index() {
  return (
    <div className="d-flex flex-column fullscreen">
      <Head>
        <title>@coconut-xr/media</title>
        <meta
          name="description"
          content="React library for accessing browser media like camera, microphone, screen capture, etc."
        ></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/svg+xml" href={icon} />
        <link rel="mask-icon" href={icon} color="#fff" />
      </Head>
      <Header />
      <Suspense fallback={<span className="flex-grow-1">Loading ...</span>}>
        <NoSSRMediaDevices />
      </Suspense>
      <Footer />
    </div>
  );
}
