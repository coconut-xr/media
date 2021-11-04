import React, { Suspense } from "react"
import Head from "next/head"
import { Header } from "../components/header"
import MD from "../content/index.md"
import { Footer } from "../components/footer"
import icon from "../public/icon.svg"
import { MediaDevices } from "../components/media-devices"

const isServer = typeof window === "undefined"

export default function Index() {
    return (
        <div className="d-flex flex-column fullscreen">
            <Head>
                <title>co-media</title>
                <meta name="description" content="react library for media usage"></meta>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/svg+xml" href={icon} />
                <link rel="mask-icon" href={icon} color="#fff" />
            </Head>
            <Header />
            {!isServer && (
                <Suspense fallback={<span>Loading ...</span>}>
                    <MediaDevices />
                </Suspense>
            )}
            <Footer />
        </div>
    )
}
