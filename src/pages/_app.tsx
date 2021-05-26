import React, { useEffect } from "react";

import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";

import { store } from "../stores/store";

const App: NextPage<AppProps> = (props) => {
  const { Component, pageProps } = props;

  useEffect(() => {
    store.locale.browser = navigator.language;
  }, []);

  return (
    <>
      <Head>
        <title>Intl.DateTimeFormat</title>
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
        <meta name="description" content="Intl.DateTimeFormat Checker" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
