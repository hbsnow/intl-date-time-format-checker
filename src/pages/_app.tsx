import React from "react";

import { NextPage } from "next";
import { AppProps } from "next/app";

import "../styles/globals.css";

const App: NextPage<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

export default App;
