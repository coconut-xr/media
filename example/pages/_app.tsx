import "../styles/index.scss";
import type { AppProps /*, AppContext */ } from "next/app";
import React, { PropsWithChildren } from "react";

export default function App({
  Component,
  pageProps,
}: AppProps<PropsWithChildren<{}>>) {
  return <Component {...pageProps} />;
}
