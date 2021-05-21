import React from "react";

import { NextPage } from "next";
import dynamic from "next/dynamic";

import { IntlForm } from "../components/IntlForm";
import { Props as IntlListProps } from "../components/IntlList";
import { IntlTitle } from "../components/IntlTitle/IntlTitle";

const IntlList = dynamic<IntlListProps>(
  () => import("../components/IntlList/IntlList").then((mod) => mod.IntlList),
  { ssr: false }
);

const Page: NextPage = () => {
  return (
    <div className="grid grid-flow-row auto-rows-max">
      <header className="container mx-auto p-4">
        <IntlTitle />
      </header>

      <main className="grid grid-flow-row auto-rows-max">
        <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-500">
          <div className="container mx-auto p-4 bg-white rounded-lg">
            <IntlForm />
          </div>
        </div>
        <div className="p-4">
          <div className="container mx-auto">
            <IntlList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
