import React, { useEffect } from "react";

import { NextPage } from "next";
import { AppProps } from "next/app";

import "../styles/globals.css";
import { store } from "../stores/store";

const App: NextPage<AppProps> = (props) => {
  const { Component, pageProps } = props;

  useEffect(() => {
    store.locale.browser = navigator.language;
  }, []);

  return <Component {...pageProps} />;
};

export default App;
